import { Order, OrderInput } from "@/types/order";
import { OrderStatus } from "@/types/orderStatus";
import { SQLiteDatabase } from "expo-sqlite";

const safeStr = (val: unknown): string => String(val ?? "").trim();

const safeNullableStr = (val: unknown): string | null => {
  const str = safeStr(val);
  return str.length > 0 ? str : null;
};

const safeNum = (val: unknown, fallback: number = 0): number => {
  const num = Number(val);
  return isNaN(num) ? fallback : num;
};

export const orderRepository = {
  // Create an Order + associated Order Status in a single transaction
  async createOrder(db: SQLiteDatabase, input: OrderInput): Promise<number> {
    const createdAt = new Date().toISOString();
    const customerId = safeNum(input.customer_id);
    const clothType = safeStr(input.cloth_type);
    const deliveryDate = safeStr(input.delivery_date);
    const totalPrice = safeNum(input.total_price);
    const advancePayment = safeNum(input.advance_payment, 0);
    const specialRequest = safeNullableStr(input.special_request);
    const initialStatus: OrderStatus = input.status || "Pending";

    let orderId = 0;

    await db.withExclusiveTransactionAsync(async (txn) => {
      // 1. Insert Order
      const result = await txn.runAsync(
        `INSERT INTO orders (customer_id, cloth_type, delivery_date, total_price, advance_payment, special_request, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          customerId,
          clothType,
          deliveryDate,
          totalPrice,
          advancePayment,
          specialRequest,
          createdAt,
        ],
      );

      orderId = result.lastInsertRowId;

      // 2. Insert Order Status
      await txn.runAsync(
        `INSERT INTO order_status (order_id, status, updated_at) VALUES (?, ?, ?)`,
        [orderId, initialStatus, createdAt],
      );
    });

    return orderId;
  },

  // Update Status of an Order
  async updateOrderStatus(
    db: SQLiteDatabase,
    orderId: number,
    status: OrderStatus,
  ): Promise<void> {
    const updatedAt = new Date().toISOString();
    await db.runAsync(
      `UPDATE order_status SET status = ?, updated_at = ? WHERE order_id = ?`,
      [status, updatedAt, orderId],
    );
  },

  // Fetch paginated order records joining customer and status information
  async getPaginatedOrders(
    db: SQLiteDatabase,
    limit: number = 10,
    offset: number = 0,
    searchQuery: unknown = "",
    statusFilter?: OrderStatus | "All",
  ): Promise<Order[]> {
    const safeLimit = Math.max(1, Math.floor(Number(limit) || 10));
    const safeOffset = Math.max(0, Math.floor(Number(offset) || 0));
    const cleanSearch = safeStr(searchQuery);

    let baseQuery = `
      SELECT 
        o.id,
        o.customer_id,
        c.name AS customer_name,
        c.phone AS customer_phone,
        o.cloth_type,
        o.delivery_date,
        o.total_price,
        o.advance_payment,
        o.special_request,
        o.created_at,
        os.status,
        os.updated_at AS status_updated_at
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN order_status os ON o.id = os.order_id
      WHERE 1=1
    `;

    const params: (string | number)[] = [];

    if (cleanSearch) {
      baseQuery += ` AND (c.name LIKE ? OR c.phone LIKE ? OR o.cloth_type LIKE ?)`;
      const param = `%${cleanSearch}%`;
      params.push(param, param, param);
    }

    if (statusFilter && statusFilter !== "All") {
      baseQuery += ` AND os.status = ?`;
      params.push(statusFilter);
    }

    baseQuery += ` ORDER BY o.id DESC LIMIT ? OFFSET ?`;
    params.push(safeLimit, safeOffset);

    return await db.getAllAsync<Order>(baseQuery, params);
  },

  // Get single order detail with customer info
  async getOrderById(
    db: SQLiteDatabase,
    orderId: number,
  ): Promise<Order | null> {
    const id = Number(orderId);
    if (!id || Number.isNaN(id)) return null;

    return await db.getFirstAsync<Order>(
      `SELECT 
        o.id,
        o.customer_id,
        c.name AS customer_name,
        c.phone AS customer_phone,
        o.cloth_type,
        o.delivery_date,
        o.total_price,
        o.advance_payment,
        o.special_request,
        o.created_at,
        os.status,
        os.updated_at AS status_updated_at
       FROM orders o
       JOIN customers c ON o.customer_id = c.id
       JOIN order_status os ON o.id = os.order_id
       WHERE o.id = ?`,
      [id],
    );
  },

  // Fetch all orders for a specific customer with joined status info
  async getOrdersByCustomerId(
    db: SQLiteDatabase,
    customerId: number,
  ): Promise<Order[]> {
    const cid = Number(customerId);
    if (!cid || Number.isNaN(cid)) return [];

    return await db.getAllAsync<Order>(
      `SELECT 
        o.id,
        o.customer_id,
        c.name AS customer_name,
        c.phone AS customer_phone,
        o.cloth_type,
        o.delivery_date,
        o.total_price,
        o.advance_payment,
        o.special_request,
        o.created_at,
        os.status,
        os.updated_at AS status_updated_at
       FROM orders o
       JOIN customers c ON o.customer_id = c.id
       JOIN order_status os ON o.id = os.order_id
       WHERE o.customer_id = ?
       ORDER BY o.id DESC`,
      [cid],
    );
  },
};

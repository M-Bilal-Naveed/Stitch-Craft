// hooks/useOrders.ts
import { orderRepository } from "@/repositories/orderRepository";
import { Order, OrderErrors, OrderInput } from "@/types/order";
import { OrderStatus } from "@/types/orderStatus";
import { validateOrderInput } from "@/validation/orderValidation";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useRef, useState } from "react";

const PAGE_SIZE = 10;

export function useOrders() {
  const db = useSQLiteContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState<OrderErrors>({});

  const isFetchingRef = useRef(false);

  // Fetch initial list or pull-to-refresh
  const fetchOrders = useCallback(
    async (
      searchQuery: unknown = "",
      statusFilter: OrderStatus | "All" = "All",
    ) => {
      const queryStr = typeof searchQuery === "string" ? searchQuery : "";
      setLoading(true);
      isFetchingRef.current = true;

      try {
        const data = await orderRepository.getPaginatedOrders(
          db,
          PAGE_SIZE,
          0,
          queryStr,
          statusFilter,
        );
        const safeData = data ?? [];

        setOrders(safeData);
        setPage(1);
        setHasMore(safeData.length === PAGE_SIZE);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [db],
  );

  // Load next page on scroll end
  const loadMoreOrders = useCallback(
    async (
      searchQuery: unknown = "",
      statusFilter: OrderStatus | "All" = "All",
    ) => {
      const queryStr = typeof searchQuery === "string" ? searchQuery : "";
      if (isFetchingRef.current || !hasMore) return;

      isFetchingRef.current = true;
      setLoadingMore(true);

      try {
        const offset = Math.max(0, page) * PAGE_SIZE;
        const newBatch = await orderRepository.getPaginatedOrders(
          db,
          PAGE_SIZE,
          offset,
          queryStr,
          statusFilter,
        );
        const safeBatch = newBatch ?? [];

        if (safeBatch.length < PAGE_SIZE) {
          setHasMore(false);
        }

        if (safeBatch.length > 0) {
          setOrders((prev) => [...prev, ...safeBatch]);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Failed to load more orders:", error);
      } finally {
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    [db, page, hasMore],
  );

  // Create new order
  const addOrder = useCallback(
    async (input: OrderInput): Promise<boolean> => {
      const validationErrors = validateOrderInput(input);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }

      setLoading(true);
      try {
        await orderRepository.createOrder(db, input);
        setErrors({});
        return true;
      } catch (error) {
        console.error("Failed to create order:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [db],
  );

  // Quick update order status
  const changeOrderStatus = useCallback(
    async (orderId: number, newStatus: OrderStatus): Promise<boolean> => {
      try {
        await orderRepository.updateOrderStatus(db, orderId, newStatus);
        setOrders((prev) =>
          prev.map((ord) =>
            ord.id === orderId ? { ...ord, status: newStatus } : ord,
          ),
        );
        return true;
      } catch (error) {
        console.error("Failed to update status:", error);
        return false;
      }
    },
    [db],
  );

  const clearFieldError = useCallback((field: keyof OrderErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  return {
    orders,
    loading,
    loadingMore,
    hasMore,
    errors,
    fetchOrders,
    loadMoreOrders,
    addOrder,
    changeOrderStatus,
    clearFieldError,
  };
}

import { Customer, CustomerInput, Measurements } from "@/types/customer";
import { SQLiteDatabase } from "expo-sqlite";

// Helper to strictly ensure NO 'undefined' reaches SQLite native driver
const safeStr = (val: unknown): string => {
  if (val === null || val === undefined) return "";
  return String(val).trim();
};

const safeNullableStr = (val: unknown): string | null => {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  return str.length > 0 ? str : null;
};

export const customerRepository = {
  // Create customer profile safely
  async createCustomer(
    db: SQLiteDatabase,
    input: CustomerInput,
  ): Promise<number> {
    const createdAt = new Date().toISOString();

    const name = safeStr(input?.name);
    const phone = safeStr(input?.phone);
    const address = safeNullableStr(input?.address);
    const notes = safeNullableStr(input?.notes);

    let customerId = 0;

    await db.withExclusiveTransactionAsync(async (txn) => {
      const result = await txn.runAsync(
        `INSERT INTO customers (name, phone, address, notes, created_at) VALUES (?, ?, ?, ?, ?)`,
        [name, phone, address, notes, createdAt],
      );

      customerId = result.lastInsertRowId;

      if (input?.measurements && Object.keys(input.measurements).length > 0) {
        await this.saveMeasurementsTxn(txn, customerId, input.measurements);
      }
    });

    return customerId;
  },

  // Internal helper for measurements within transaction
  async saveMeasurementsTxn(
    txn: any,
    customerId: number,
    m: Partial<Measurements>,
  ): Promise<void> {
    const safeCustomerId = Number(customerId) || 0;
    const updatedAt = new Date().toISOString();

    const safeNum = (val: unknown): number | null => {
      if (val === undefined || val === null || val === "") return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    };

    await txn.runAsync(
      `INSERT INTO measurements (
        customer_id, kameez_length, chest, waist, shoulder, sleeve_length,
        trouser_length, collar, bicep, armhole, cuff, hip, pancha, notes, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(customer_id) DO UPDATE SET
        kameez_length=excluded.kameez_length,
        chest=excluded.chest,
        waist=excluded.waist,
        shoulder=excluded.shoulder,
        sleeve_length=excluded.sleeve_length,
        trouser_length=excluded.trouser_length,
        collar=excluded.collar,
        bicep=excluded.bicep,
        armhole=excluded.armhole,
        cuff=excluded.cuff,
        hip=excluded.hip,
        pancha=excluded.pancha,
        notes=excluded.notes,
        updated_at=excluded.updated_at`,
      [
        safeCustomerId,
        safeNum(m.kameez_length),
        safeNum(m.chest),
        safeNum(m.waist),
        safeNum(m.shoulder),
        safeNum(m.sleeve_length),
        safeNum(m.trouser_length),
        safeNum(m.collar),
        safeNum(m.bicep),
        safeNum(m.armhole),
        safeNum(m.cuff),
        safeNum(m.hip),
        safeNum(m.pancha),
        safeNullableStr(m.notes),
        updatedAt,
      ],
    );
  },

  // Safely fetch paginated customers (guaranteed zero undefined values)
  async getPaginatedCustomers(
    db: SQLiteDatabase,
    limit: number = 10,
    offset: number = 0,
    searchQuery: unknown = "",
  ): Promise<Customer[]> {
    const safeLimit = Math.max(1, Math.floor(Number(limit) || 10));
    const safeOffset = Math.max(0, Math.floor(Number(offset) || 0));
    const cleanSearch = safeStr(searchQuery);

    if (cleanSearch.length > 0) {
      const queryParam = `%${cleanSearch}%`;
      return await db.getAllAsync<Customer>(
        `SELECT * FROM customers 
         WHERE name LIKE ? OR phone LIKE ? 
         ORDER BY id DESC LIMIT ? OFFSET ?`,
        [queryParam, queryParam, safeLimit, safeOffset],
      );
    }

    return await db.getAllAsync<Customer>(
      `SELECT * FROM customers ORDER BY id DESC LIMIT ? OFFSET ?`,
      [safeLimit, safeOffset],
    );
  },
};

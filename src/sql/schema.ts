import { SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(db: SQLiteDatabase) {
  // 1. Run PRAGMAs as single, isolated calls
  await db.execAsync("PRAGMA foreign_keys = ON;");
  await db.execAsync("PRAGMA journal_mode = WAL;");

  // 2. Create Schema & Indexes
  await db.execAsync(`
    -- Auth Table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      shop_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    -- 1. Customers Table
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      notes TEXT,
      created_at TEXT NOT NULL
    );

    -- 2. Measurements Table
    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL UNIQUE,
      kameez_length REAL,
      chest REAL,
      waist REAL,
      shoulder REAL,
      sleeve_length REAL,
      trouser_length REAL,
      collar REAL,
      bicep REAL,
      armhole REAL,
      cuff REAL,
      hip REAL,
      pancha REAL,
      notes TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    );

    -- 3. Orders Table
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      cloth_type TEXT NOT NULL,
      delivery_date TEXT NOT NULL,
      total_price REAL NOT NULL,
      advance_payment REAL DEFAULT 0,
      special_request TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    );

    -- 4. Order Status Table
    CREATE TABLE IF NOT EXISTS order_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL UNIQUE,
      status TEXT CHECK(status IN ('Pending', 'Stitching', 'Ready', 'Delivered', 'Cutting')) DEFAULT 'Pending',
      updated_at TEXT NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

    -- Indexes for search and foreign key join speed
    CREATE INDEX IF NOT EXISTS idx_customers_search ON customers(name, phone);
    CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
  `);
}

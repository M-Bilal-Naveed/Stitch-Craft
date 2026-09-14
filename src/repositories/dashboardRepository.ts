import { DashboardStats } from "@/types/dashboardStatus";
import { SQLiteDatabase } from "expo-sqlite";

export const dashboardRepository = {
  /**
   * Fetches aggregated metrics for customers and order statuses in a single query.
   */
  async getDashboardStats(db: SQLiteDatabase): Promise<DashboardStats> {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM customers) AS totalCustomers,
        COUNT(CASE WHEN os.status IN ('Pending', 'Cutting', 'Stitching', 'Ready') THEN 1 END) AS activeOrders,
        COUNT(CASE WHEN os.status = 'Pending' THEN 1 END) AS pendingOrders,
        COUNT(CASE WHEN os.status = 'Ready' THEN 1 END) AS readyOrders
      FROM orders o
      LEFT JOIN order_status os ON o.id = os.order_id;
    `;

    const result = await db.getFirstAsync<DashboardStats>(query);

    return {
      totalCustomers: result?.totalCustomers ?? 0,
      activeOrders: result?.activeOrders ?? 0,
      pendingOrders: result?.pendingOrders ?? 0,
      readyOrders: result?.readyOrders ?? 0,
    };
  },
};

import { dashboardRepository } from "@/repositories/dashboardRepository";
import { DashboardStats } from "@/types/dashboardStatus";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

export function useDashboard() {
  const db = useSQLiteContext();

  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    activeOrders: 0,
    pendingOrders: 0,
    readyOrders: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardRepository.getDashboardStats(db);
      setStats(data);
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  }, [db]);

  // Refetch every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [fetchStats]),
  );

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats,
  };
}

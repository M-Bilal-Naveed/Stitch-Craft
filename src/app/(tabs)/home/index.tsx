import ActionCard from "@/components/home/ActionCard";
import DashboardHeader from "@/components/home/DashboardHeader";
import MetricCard from "@/components/home/MetricCard";
import WelcomeCard from "@/components/home/WelcomeCard";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useDashboard } from "@/hooks/useDashboard";
import { useAppTheme } from "@/theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { theme } = useAppTheme();
  const { stats, loading } = useDashboard();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DashboardHeader />

      <WelcomeCard />

      {/* Metrics Grid */}
      <View style={styles.grid}>
        <MetricCard
          title="Total Customers"
          quantity={loading ? "..." : stats.totalCustomers}
          icon={<Feather name="users" size={18} color={theme.colors.cGreen} />}
        />

        <MetricCard
          title="Active Orders"
          quantity={loading ? "..." : stats.activeOrders}
          icon={
            <Feather name="calendar" size={18} color={theme.colors.cGreen} />
          }
        />

        <MetricCard
          title="Pending"
          quantity={loading ? "..." : stats.pendingOrders}
          icon={<Feather name="clock" size={18} color={theme.colors.cGreen} />}
        />

        <MetricCard
          title="Ready to delivery"
          quantity={loading ? "..." : stats.readyOrders}
          icon={
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={20}
              color={theme.colors.cGreen}
            />
          }
        />
      </View>

      {/* Quick Actions */}
      <Typography
        variant="body2"
        style={styles.sectionTitle}
        color={theme.colors.textPrimary}
      >
        Quick Actions
      </Typography>
      <View style={styles.actionGrid}>
        <ActionCard
          title="Search"
          icon={<Feather name="search" size={28} color={theme.colors.cGreen} />}
          onPress={() => router.push("/(tabs)/customers")}
        />

        <ActionCard
          title="New Customer"
          icon={
            <Feather name="user-plus" size={28} color={theme.colors.cGreen} />
          }
          onPress={() => router.replace("/(tabs)/customers/addCustomer")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Metrics.gap.md,
    marginBottom: Metrics.margin.xl,
    marginHorizontal: Metrics.margin.md,
  },
  sectionTitle: {
    marginBottom: Metrics.margin.md,
    marginLeft: Metrics.margin.md,
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Metrics.gap.md,
    marginHorizontal: Metrics.margin.md,
  },
});

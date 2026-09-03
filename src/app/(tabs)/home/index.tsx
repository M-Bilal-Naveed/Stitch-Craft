import ActionCard from "@/components/home/ActionCard";
import DashboardHeader from "@/components/home/DashboardHeader";
import MetricCard from "@/components/home/MetricCard";
import WelcomeCard from "@/components/home/WelcomeCard";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { theme } = useAppTheme();
  const instance = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.secondary}
      />
      <DashboardHeader />

      <WelcomeCard />

      {/* Metrics Grid */}
      <View style={styles.grid}>
        <MetricCard
          title="Total Customers"
          quantity={8}
          icon={<Feather name="users" size={18} color={theme.colors.cGreen} />}
        />

        <MetricCard
          title="Active Orders"
          quantity={18}
          icon={
            <Feather name="calendar" size={18} color={theme.colors.cGreen} />
          }
        />

        <MetricCard
          title="Pending"
          quantity={12}
          icon={<Feather name="clock" size={18} color={theme.colors.cGreen} />}
        />

        <MetricCard
          title="Ready to delivery"
          quantity={3}
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
        />

        <ActionCard
          title="New Customer"
          icon={
            <Feather name="user-plus" size={28} color={theme.colors.cGreen} />
          }
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

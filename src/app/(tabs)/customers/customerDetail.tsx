import { CustomerInfoCard } from "@/components/customer/CustomerInfoCard";
import {
  CustomerOrderHistoryItem,
  CustomerOrderItem,
} from "@/components/customer/CustomerOrderHistoryItem";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Customer order history mock data with strict OrderStatus types
const CUSTOMER_ORDERS: CustomerOrderItem[] = [
  {
    id: "1",
    orderNumber: "105",
    clothingType: "Shalwar Kameez",
    price: 2500,
    status: "Stitching",
  },
  {
    id: "2",
    orderNumber: "098",
    clothingType: "Suit",
    price: 8000,
    status: "Delivered",
  },
];

export default function CustomerDetailScreen() {
  const { theme } = useAppTheme();

  const handleOrderPress = (order: CustomerOrderItem) => {
    console.log(`Navigating to Order Details #${order.orderNumber}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FeedHeader title="Ahmed Khan" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Customer Detail Card (No Phone Number) */}
        <CustomerInfoCard
          name="Ahmed Khan"
          customerNumber="0307-9087534"
          address="Gujranwala"
        />

        {/* Orders Section Header */}
        <Typography
          variant="h4"
          color={theme.colors.textPrimary}
          style={styles.sectionTitle}
        >
          Order & History
        </Typography>

        {/* Order History Items with Dynamic Status Colors */}
        {CUSTOMER_ORDERS.map((order) => (
          <CustomerOrderHistoryItem
            key={order.id}
            order={order}
            onPress={handleOrderPress}
          />
        ))}
      </ScrollView>

      {/* Side Measurements Button */}
      <TouchableOpacity
        style={[
          styles.verticalButton,
          { backgroundColor: theme.colors.secondary },
        ]}
        onPress={() => router.navigate("/(tabs)/customers/measurements")}
        activeOpacity={0.8}
      >
        <Typography variant="button" color={theme.colors.text}>
          Measurements
        </Typography>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Metrics.padding.xl,
    paddingBottom: Metrics.padding.xxxl,
  },
  sectionTitle: {
    fontWeight: "700",
    marginTop: Metrics.margin.md,
    marginBottom: Metrics.margin.sm,
  },
  verticalButton: {
    position: "absolute",
    right: 0,
    top: "30%",
    paddingVertical: Metrics.padding.sm,
    paddingHorizontal: Metrics.padding.md,
    borderTopLeftRadius: Metrics.radius.md,
    borderBottomLeftRadius: Metrics.radius.md,
  },
});

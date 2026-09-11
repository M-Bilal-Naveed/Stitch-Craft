import { CustomerInfoCard } from "@/components/customer/CustomerInfoCard";
import {
  CustomerOrderHistoryItem,
  CustomerOrderItem,
} from "@/components/customer/CustomerOrderHistoryItem";
import { OrderStage } from "@/components/orders/OrderPipline";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { customerRepository } from "@/repositories/customerRepository";
import { orderRepository } from "@/repositories/orderRepository";
import { useAppTheme } from "@/theme";
import { Customer } from "@/types/customer";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomerDetailScreen() {
  const { theme } = useAppTheme();
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<CustomerOrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load Customer info and related Orders from SQLite
  const loadCustomerData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const customerId = Number(id);

      // Fetch Customer Details
      const fetchedCustomer = await customerRepository.getCustomerById(
        db,
        customerId,
      );
      if (!fetchedCustomer) {
        Alert.alert("Error", "Customer not found.");
        return;
      }
      setCustomer(fetchedCustomer);

      // Fetch Orders associated with Customer
      const customerOrders = await orderRepository.getOrdersByCustomerId(
        db,
        customerId,
      );

      const mappedOrders: CustomerOrderItem[] = customerOrders.map((o) => ({
        id: String(o.id),
        orderNumber: String(o.id),
        clothingType: o.cloth_type,
        price: o.total_price,
        status: o.status as OrderStage,
      }));

      setOrders(mappedOrders);
    } catch (error) {
      console.error("Failed to fetch customer details:", error);
    } finally {
      setLoading(false);
    }
  }, [db, id]);

  useEffect(() => {
    loadCustomerData();
  }, [loadCustomerData]);

  const handleOrderPress = (orderItem: CustomerOrderItem) => {
    router.push({
      pathname: "/(tabs)/orders/orderDetail",
      params: { id: orderItem.id },
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <FeedHeader title="Customer Details" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!customer) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <FeedHeader title="Customer Details" />
        <View style={styles.centerContainer}>
          <Typography variant="h4" color={theme.colors.textPrimary}>
            Customer not found.
          </Typography>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FeedHeader title={customer.name} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Customer Detail Card connected to SQLite fields */}
        <CustomerInfoCard
          name={customer.name}
          customerNumber={customer.phone}
          address={customer.address || "No address provided"}
        />

        {/* Orders Section Header */}
        <Typography
          variant="h4"
          color={theme.colors.textPrimary}
          style={styles.sectionTitle}
        >
          Order & History
        </Typography>

        {/* Dynamic SQLite Orders */}
        {orders.length > 0 ? (
          orders.map((order) => (
            <CustomerOrderHistoryItem
              key={order.id}
              order={order}
              // onPress={handleOrderPress}
            />
          ))
        ) : (
          <Typography variant="body2" color={theme.colors.textMuted}>
            No past order history for this customer.
          </Typography>
        )}
      </ScrollView>

      {/* Dynamic Measurements Button passing Customer ID */}
      <TouchableOpacity
        style={[
          styles.verticalButton,
          { backgroundColor: theme.colors.secondary },
        ]}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/customers/measurements",
            params: { customerId: customer.id },
          })
        }
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

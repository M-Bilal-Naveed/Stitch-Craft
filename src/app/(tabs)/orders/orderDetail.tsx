import { OrderDetailCard } from "@/components/orders/OrderDetailCard";
import { OrderPipeline, OrderStage } from "@/components/orders/OrderPipline";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { orderRepository } from "@/repositories/orderRepository";
import { useAppTheme } from "@/theme";
import { Order } from "@/types/order";
import { OrderStatus } from "@/types/orderStatus";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// Pipeline stage mapping (DB Schema status CHECK values)
const PIPELINE_STAGES: OrderStage[] = [
  "Pending",
  "Cutting",
  "Stitching",
  "Ready",
  "Delivered",
];

export default function OrderDetailScreen() {
  const { theme } = useAppTheme();
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  // Load Order details from SQLite
  const loadOrderDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const orderId = Number(id);
      const data = await orderRepository.getOrderById(db, orderId);

      if (data) {
        setOrder(data);
        const stageIdx = PIPELINE_STAGES.indexOf(data.status as OrderStage);
        setCurrentStageIndex(stageIdx !== -1 ? stageIdx : 0);
      } else {
        Alert.alert("Error", "Order not found.");
      }
    } catch (error) {
      console.error("Failed to load order detail:", error);
    } finally {
      setLoading(false);
    }
  }, [db, id]);

  useEffect(() => {
    loadOrderDetail();
  }, [loadOrderDetail]);

  // Handle stage selection & SQLite update
  const handleStageUpdate = async (index: number, stage: OrderStage) => {
    if (!order) return;

    const dbStatus = stage as OrderStatus;

    try {
      await orderRepository.updateOrderStatus(db, order.id, dbStatus);
      setCurrentStageIndex(index);
      setOrder((prev) => (prev ? { ...prev, status: dbStatus } : prev));
    } catch (error) {
      console.error("Failed to update status:", error);
      Alert.alert("Error", "Failed to update order status.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <FeedHeader title="Order Detail" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <FeedHeader title="Order Detail" />
        <View style={styles.centerContainer}>
          <Typography variant="h4">Order not found.</Typography>
        </View>
      </SafeAreaView>
    );
  }

  const totalPrice = order.total_price || 0;
  const advancePaid = order.advance_payment || 0;
  const remainingBalance = Math.max(0, totalPrice - advancePaid);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FeedHeader title={`Order #${order.id}`} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Component 1: Order Details Summary Card */}
        <OrderDetailCard
          customerName={order.customer_name || "Unknown"}
          clothingType={order.cloth_type}
          orderDate={order.created_at ? order.created_at.split("T")[0] : ""}
          deliveryDate={order.delivery_date}
          currentStatus={PIPELINE_STAGES[currentStageIndex]}
        />

        {/* Component 2: Interactive 5-Stage Pipeline */}
        <OrderPipeline
          stages={PIPELINE_STAGES}
          currentStageIndex={currentStageIndex}
          onSelectStage={handleStageUpdate}
        />

        {/* Special Requests / Notes Section */}
        {order.special_request ? (
          <View style={styles.notesSection}>
            <Typography
              variant="caption"
              color={theme.colors.textMuted}
              style={styles.paymentTitle}
            >
              SPECIAL INSTRUCTIONS
            </Typography>
            <Typography variant="body2" color={theme.colors.textPrimary}>
              {order.special_request}
            </Typography>
          </View>
        ) : null}

        {/* Payment Summary Section */}
        <View style={styles.paymentSection}>
          <Typography
            variant="caption"
            color={theme.colors.textMuted}
            style={styles.paymentTitle}
          >
            PAYMENT SUMMARY
          </Typography>

          <View style={styles.paymentRow}>
            <Typography variant="body1" color={theme.colors.textPrimary}>
              Total Price:
            </Typography>
            <Typography variant="body1" color={theme.colors.textPrimary}>
              Rs. {totalPrice.toLocaleString()}
            </Typography>
          </View>

          <View style={styles.paymentRow}>
            <Typography variant="body2" color={theme.colors.textMuted}>
              Advance Paid:
            </Typography>
            <Typography variant="body2" color={theme.colors.textMuted}>
              - Rs. {advancePaid.toLocaleString()}
            </Typography>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: theme.colors.halfWhite },
            ]}
          />

          <View style={styles.paymentRow}>
            <Typography variant="body1" color={theme.colors.accent.Cutting}>
              Remaining Balance:
            </Typography>
            <Typography variant="body1" color={theme.colors.accent.Cutting}>
              Rs. {remainingBalance.toLocaleString()}
            </Typography>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Metrics.padding.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notesSection: {
    marginVertical: Metrics.margin.md,
  },
  paymentSection: {
    marginTop: Metrics.margin.md,
  },
  paymentTitle: {
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: Metrics.margin.md,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Metrics.margin.xs,
  },
  divider: {
    height: 1,
    marginVertical: Metrics.margin.sm,
  },
});

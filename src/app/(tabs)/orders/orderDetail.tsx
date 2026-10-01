import { OrderDetailCard } from "@/components/orders/OrderDetailCard";
import { OrderPipeline, OrderStage } from "@/components/orders/OrderPipline";
import { PaymentSummaryCard } from "@/components/orders/PaymentSummaryCard";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { orderRepository } from "@/repositories/orderRepository";
import { useAppTheme } from "@/theme";
import { Order } from "@/types/order";
import { OrderStatus } from "@/types/orderStatus";
import { Entypo } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
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

  const handleStageUpdate = (targetIndex: number, targetStage: OrderStage) => {
    if (!order) return;

    // Rule 1: Disallow moving backward to a previous stage
    if (targetIndex < currentStageIndex) {
      return;
    }

    // If clicking the currently active stage, do nothing
    if (targetIndex === currentStageIndex) return;

    // Confirmation Alert before applying the change
    Alert.alert(
      "Update Status",
      `Are you sure you want to update the order status to "${targetStage}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "default",
          onPress: async () => {
            const dbStatus = targetStage as OrderStatus;
            try {
              await orderRepository.updateOrderStatus(db, order.id, dbStatus);
              setCurrentStageIndex(targetIndex);
              setOrder((prev) => (prev ? { ...prev, status: dbStatus } : prev));
            } catch (error) {
              console.error("Failed to update status:", error);
              Alert.alert("Error", "Failed to update order status.");
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  // Handle Order Deletion
  const handleDeleteOrder = () => {
    if (!order) return;

    Alert.alert(
      "Delete Order",
      `Are you sure you want to delete Order #${order.id}? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await orderRepository.deleteOrder(db, order.id);
              Alert.alert("Success", "Order deleted successfully.", [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ]);
            } catch (error) {
              console.error("Failed to delete order:", error);
              Alert.alert("Error", "Failed to delete order.");
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
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

        {/* Component 3: Payment Summary Card */}
        <PaymentSummaryCard
          totalPrice={order.total_price || 0}
          advancePaid={order.advance_payment || 0}
          isDelivered={order.status === "Delivered"}
        />
      </ScrollView>

      {/* Component 4: Delete Order Button */}
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
        onPress={handleDeleteOrder}
        disabled={isDeleting}
        activeOpacity={0.8}
      >
        <Entypo name="trash" size={24} color={theme.colors.text} />
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
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notesSection: {
    marginVertical: Metrics.margin.md,
  },
  paymentTitle: {
    letterSpacing: 0.8,
    marginBottom: Metrics.margin.md,
  },
  deleteButton: {
    width: Metrics.width.lg,
    height: Metrics.height.xl,
    position: "absolute",
    bottom: "10%",
    right: Metrics.margin.xxl,
    borderRadius: Metrics.radius.circle,
    alignItems: "center",
    justifyContent: "center",
  },
});

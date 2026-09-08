import { OrderDetailCard } from "@/components/orders/OrderDetailCard";
import { OrderPipeline, OrderStage } from "@/components/orders/OrderPipline";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const PIPELINE_STAGES: OrderStage[] = [
  "Pending",
  "Cut",
  "Stitch",
  "Ready",
  "Delivered",
];

export default function OrderDetailScreen() {
  const { theme } = useAppTheme();

  // Active Stage State (Defaults to index 2: "Stitch")
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(2);

  // Payment Breakdown Values
  const totalPrice = 2500;
  const advancePaid = 1000;
  const remainingBalance = totalPrice - advancePaid;

  const handleStageUpdate = (index: number, stage: OrderStage) => {
    setCurrentStageIndex(index);
    console.log(`Order status updated to: ${stage}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Feed Navigation Header */}
      <FeedHeader title="Order #105" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Component 1: Order Details Summary Card */}
        <OrderDetailCard
          customerName="Ahmed Khan"
          clothingType="Shalwar Kameez"
          orderDate="20 Aug"
          deliveryDate="28 Aug"
          currentStatus={PIPELINE_STAGES[currentStageIndex]}
        />

        {/* Component 2: Interactive 5-Stage Pipeline */}
        <OrderPipeline
          stages={PIPELINE_STAGES}
          currentStageIndex={currentStageIndex}
          onSelectStage={handleStageUpdate}
        />

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

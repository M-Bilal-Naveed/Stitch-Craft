import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface PaymentSummaryCardProps {
  totalPrice: number;
  advancePaid: number;
  isDelivered: boolean;
}

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  totalPrice,
  advancePaid,
  isDelivered,
}) => {
  const { theme } = useAppTheme();

  const calculatedBalance = Math.max(0, totalPrice - advancePaid);
  const remainingBalance = isDelivered ? 0 : calculatedBalance;
  const remainingPaid = isDelivered ? calculatedBalance : 0;

  return (
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

      {/* Remain Pay: Appears when the order is marked as Delivered */}
      {isDelivered && (
        <View style={styles.paymentRow}>
          <Typography variant="body2" color={theme.colors.cGreen}>
            Remain Pay (Delivered):
          </Typography>
          <Typography variant="body2" color={theme.colors.cGreen}>
            - Rs. {remainingPaid.toLocaleString()}
          </Typography>
        </View>
      )}

      <View
        style={[styles.divider, { backgroundColor: theme.colors.halfWhite }]}
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
  );
};

const styles = StyleSheet.create({
  paymentSection: {
    marginTop: Metrics.margin.md,
  },
  paymentTitle: {
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

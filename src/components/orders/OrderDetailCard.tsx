import Typography from "@/components/text/typography";
import { Fonts } from "@/constants/fonts";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface OrderDetailCardProps {
  customerName: string;
  clothingType: string;
  orderDate: string;
  deliveryDate: string;
  currentStatus: string;
}

export const OrderDetailCard: React.FC<OrderDetailCardProps> = ({
  customerName,
  clothingType,
  orderDate,
  deliveryDate,
  currentStatus,
}) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.settingCard,
          borderColor: theme.colors.settingBoarder,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.infoColumn}>
          <Typography variant="h4" color={theme.colors.textPrimary}>
            {customerName}
          </Typography>
          <Typography
            variant="body2"
            color={theme.colors.textMuted}
            style={styles.clothingText}
          >
            {clothingType}
          </Typography>
        </View>

        {/* Current Status Badge */}
        <View
          style={[styles.badge, { backgroundColor: theme.colors.secondary }]}
        >
          <Typography
            variant="body2"
            color={theme.colors.text}
            style={styles.badgeText}
          >
            {currentStatus.toUpperCase()}
          </Typography>
        </View>
      </View>

      <Typography variant="caption" color={theme.colors.textMuted}>
        Order Date: {orderDate} • Delivery: {deliveryDate}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Metrics.padding.lg,
    borderRadius: Metrics.radius.lg,
    borderWidth: 1,
    marginBottom: Metrics.margin.xl,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Metrics.margin.sm,
  },
  infoColumn: {
    flex: 1,
  },
  clothingText: {
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: Metrics.padding.md,
    paddingVertical: Metrics.padding.xs,
    borderRadius: Metrics.radius.circle || 20,
  },
  badgeText: {
    fontFamily: Fonts.bold,
  },
});

import Typography from "@/components/text/typography";
import { Fonts } from "@/constants/fonts";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { OrderStatus } from "@/types/orderStatus";
import { getStatusColors } from "@/utils/orderStatusColors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export interface CustomerOrderItem {
  id: string;
  orderNumber: string;
  clothingType: string;
  price: number;
  status: OrderStatus;
}

interface CustomerOrderHistoryItemProps {
  order: CustomerOrderItem;
  onPress?: (order: CustomerOrderItem) => void;
}

export const CustomerOrderHistoryItem: React.FC<
  CustomerOrderHistoryItemProps
> = ({ order, onPress }) => {
  const { theme } = useAppTheme();
  const statusColors = getStatusColors(order.status, theme);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.halfWhite,
          borderColor: theme.colors.cGreen,
        },
      ]}
      onPress={() => onPress && onPress(order)}
    >
      <View style={styles.infoContainer}>
        <Typography variant="caption" color={theme.colors.cGreen}>
          Order #{order.orderNumber}
        </Typography>
        <Typography variant="body2" color={theme.colors.textMuted}>
          {order.clothingType} • Rs. {order.price.toLocaleString()}
        </Typography>
      </View>

      {/* Dynamic Status Badge using getStatusColors */}
      <View style={[styles.badge, { backgroundColor: statusColors.bg }]}>
        <Typography style={[styles.badgeText, { color: statusColors.text }]}>
          {order.status.toUpperCase()}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Metrics.padding.lg,
    paddingHorizontal: Metrics.padding.md,
    borderWidth: 1,
    marginBottom: Metrics.margin.lg,
    borderRadius: Metrics.radius.xl,
  },
  infoContainer: {
    gap: 4,
  },
  badge: {
    paddingHorizontal: Metrics.padding.md,
    paddingVertical: Metrics.padding.xs,
    borderRadius: Metrics.radius.circle || 16,
  },
  badgeText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
});

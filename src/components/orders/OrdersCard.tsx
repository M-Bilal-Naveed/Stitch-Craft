import { Fonts } from "@/constants/fonts";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { OrderStatus } from "@/types/orderStatus";
import { getStatusColors } from "@/utils/orderStatusColors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface } from "react-native-paper";
import Typography from "../text/typography";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  clothingType: string;
  deliveryDate: string;
  status: OrderStatus;
}

interface OrderCardProps {
  order: Order;
  onPress?: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const { theme } = useAppTheme();
  const statusColors = getStatusColors(order.status, theme);

  return (
    <Surface
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.halfWhite,
          borderColor: theme.colors.cGreen,
        },
      ]}
      elevation={0}
    >
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => onPress && onPress(order)}
        activeOpacity={0.7}
      >
        {/* Left Curved Accent Indicator Bar */}
        <View
          style={[styles.accentBar, { backgroundColor: statusColors.accent }]}
        />

        <View style={styles.infoContainer}>
          {/* Order Header: ID & Status Badge */}
          <View style={styles.headerRow}>
            <Typography variant="caption" color={theme.colors.secondary}>
              Order #{order.orderNumber}
            </Typography>

            <View
              style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}
            >
              <Typography
                style={[styles.statusText, { color: statusColors.text }]}
              >
                {order.status.toUpperCase()}
              </Typography>
            </View>
          </View>

          {/* Customer Name */}
          <Typography
            variant="body1"
            color={theme.colors.primary}
            style={styles.customerName}
          >
            {order.customerName}
          </Typography>

          {/* Details Line */}
          <Typography variant="body2" color={theme.colors.secondary}>
            {order.clothingType} • Delivery: {order.deliveryDate}
          </Typography>
        </View>
      </TouchableOpacity>
    </Surface>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: Metrics.radius.xl,
    marginBottom: Metrics.margin.sm,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrics.padding.sm,
    paddingHorizontal: Metrics.padding.sm,
  },
  accentBar: {
    width: 4,
    height: "80%",
    borderRadius: Metrics.radius.xs,
    marginRight: Metrics.margin.md,
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Metrics.margin.xs,
  },
  statusBadge: {
    paddingHorizontal: Metrics.padding.sm,
    paddingVertical: 2,
    borderRadius: Metrics.radius.sm,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  customerName: {
    marginBottom: Metrics.margin.xs,
  },
});

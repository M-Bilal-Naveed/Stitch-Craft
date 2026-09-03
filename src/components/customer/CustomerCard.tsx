import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface } from "react-native-paper";
import Typography from "../text/typography";

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface CustomerCardProps {
  customer: Customer;
  onPress?: (customer: Customer) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onPress,
}) => {
  const { theme } = useAppTheme();

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
        onPress={() => onPress && onPress(customer)}
        activeOpacity={0.7}
      >
        <View
          style={[styles.accentBar, { backgroundColor: theme.colors.primary }]}
        />

        <View style={styles.infoContainer}>
          <Typography variant="body1" color={theme.colors.primary}>
            {customer.name}
          </Typography>

          {/* Customer Phone */}
          <View style={styles.phoneRow}>
            <Feather
              name="phone"
              size={14}
              color={theme.colors.cGreen}
              style={styles.phoneIcon}
            />
            <Typography variant="caption" color={theme.colors.cGreen}>
              {customer.phone}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Metrics.radius.lg,
    marginBottom: Metrics.margin.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrics.padding.lg,
    paddingHorizontal: Metrics.padding.md,
  },
  accentBar: {
    width: 4,
    height: "100%",
    minHeight: 36,
    borderRadius: 2,
    marginRight: Metrics.margin.md,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneIcon: {
    marginRight: Metrics.margin.sm,
  },
});

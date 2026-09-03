import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../text/typography";

type MetricCardProps = {
  title: string;
  quantity: number | string;
  icon: React.ReactNode;
};

const MetricCard = ({ title, quantity, icon }: MetricCardProps) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[styles.metricCard, { backgroundColor: theme.colors.halfWhite }]}
    >
      <View style={styles.metricHeader}>
        <Typography variant="h4" color={theme.colors.cGreen}>
          {quantity}
        </Typography>
        {icon}
      </View>

      <Typography variant="caption" color={theme.colors.textMuted}>
        {title}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    width: "48%",
    borderRadius: Metrics.radius.lg,
    padding: Metrics.padding.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
});

export default MetricCard;

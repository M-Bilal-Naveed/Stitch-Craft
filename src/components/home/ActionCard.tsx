import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../text/typography";

type ActionCardProps = {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

const ActionCard = ({ title, icon, onPress }: ActionCardProps) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[styles.actionCard, { backgroundColor: theme.colors.halfWhite }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}

      <Typography
        variant="button"
        style={styles.actionLabel}
        color={theme.colors.cGreen}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionCard: {
    flex: 1,
    borderRadius: Metrics.radius.lg,
    paddingVertical: Metrics.padding.lg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  actionLabel: {
    marginTop: Metrics.margin.sm,
  },
});

export default ActionCard;

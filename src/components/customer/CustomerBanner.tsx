import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface CustomerBannerProps {
  name: string;
}

export const CustomerBanner: React.FC<CustomerBannerProps> = ({ name }) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.banner, { backgroundColor: theme.colors.secondary }]}>
      <Typography variant="caption" color={theme.colors.text}>
        Customer:{" "}
        <Typography variant="body1" color={theme.colors.text}>
          {name}
        </Typography>
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Metrics.padding.lg,
    borderRadius: Metrics.radius.xl,
    marginBottom: Metrics.margin.xl,
  },
});

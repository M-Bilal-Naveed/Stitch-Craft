import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../text/typography";

interface AuthFooterProps {
  title: string;
  buttonTitle: string;
  onPress: () => void;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({
  title,
  buttonTitle,
  onPress,
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <Typography variant="body1" color={theme.colors.textPrimary}>
        {title}{" "}
      </Typography>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Typography variant="h4" color={theme.colors.primary}>
          {buttonTitle}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Metrics.padding.lg,
  },
  buttonText: {
    color: "#133020",
  },
});

import { Fonts } from "@/constants/fonts";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof Feather.glyphMap;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  iconName,
  buttonStyle,
  labelStyle,
  loading = false,
  disabled = false,
}) => {
  const { theme } = useAppTheme();

  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      icon={
        iconName
          ? ({ size, color }) => (
              <Feather name={iconName} size={size || 18} color={color} />
            )
          : undefined
      }
      style={[
        styles.button,
        buttonStyle,
        { backgroundColor: theme.colors.secondary },
      ]}
      contentStyle={styles.content}
      labelStyle={[styles.label, labelStyle, { color: theme.colors.text }]}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Metrics.radius.lg,
    elevation: 0,
  },
  content: {
    paddingVertical: 6,
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});

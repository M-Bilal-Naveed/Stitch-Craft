import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import Typography from "../text/typography";

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  keyboardType?: "default" | "phone-pad" | "numeric" | "email-address";
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  keyboardType = "default",
}) => {
  const { theme } = useAppTheme();
  return (
    <View style={styles.container}>
      {/* Label with optional required asterisk */}
      <Typography
        variant="caption"
        style={styles.label}
        color={theme.colors.textPrimary}
      >
        {label}{" "}
        {required && (
          <Typography color={theme.colors.textPrimary}>*</Typography>
        )}
      </Typography>

      {/* Styled React Native Paper TextInput */}
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType={keyboardType}
        outlineColor={theme.colors.secondary}
        activeOutlineColor={theme.colors.primary}
        style={[styles.input, { backgroundColor: theme.colors.settingCard }]}
        theme={{ roundness: 12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.lg,
  },
  label: {
    marginBottom: Metrics.margin.xs,
  },
  input: {
    fontSize: 14,
    height: Metrics.height.lg,
  },
});

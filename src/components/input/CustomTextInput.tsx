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
  error?: string;
  keyboardType?: "default" | "phone-pad" | "numeric" | "email-address";
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  error,
  keyboardType = "default",
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
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

      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType={keyboardType}
        outlineColor={error ? theme.colors.error : theme.colors.secondary}
        activeOutlineColor={error ? theme.colors.error : theme.colors.primary}
        style={[styles.input, { backgroundColor: theme.colors.settingCard }]}
        theme={{ roundness: 12 }}
        error={!!error}
      />

      {error && (
        <Typography
          variant="caption"
          color={theme.colors.error}
          style={styles.error}
        >
          {error}
        </Typography>
      )}
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
  error: {
    marginTop: Metrics.margin.xs,
  },
});

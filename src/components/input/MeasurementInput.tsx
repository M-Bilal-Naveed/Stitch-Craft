import Typography from "@/components/text/typography";
import { Fonts } from "@/constants/fonts";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface MeasurementInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  unit?: string;
}

export const MeasurementInput: React.FC<MeasurementInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "0",
  unit = "in",
}) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.settingCard,
          borderColor: theme.colors.settingBoarder,
        },
      ]}
    >
      <Typography
        variant="caption"
        color={theme.colors.textMuted}
        style={styles.label}
      >
        {label}
      </Typography>

      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="numeric"
          style={[styles.input, { color: theme.colors.textPrimary }]}
        />
        <Typography
          variant="body2"
          color={theme.colors.textPrimary}
          style={styles.unitText}
        >
          {unit}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: Metrics.padding.lg,
    borderRadius: Metrics.radius.lg,
    borderWidth: 1,
    marginBottom: Metrics.margin.md,
  },
  label: {
    marginBottom: Metrics.margin.xs,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    padding: 0,
    minWidth: 40,
  },
  unitText: {
    fontFamily: Fonts.bold,
    marginLeft: Metrics.margin.xs,
  },
});

import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import Typography from "../text/typography";

interface CustomTextAreaProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
}

export const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* Field Label */}
      <Typography
        variant="caption"
        style={styles.label}
        color={theme.colors.textPrimary}
      >
        {label}
      </Typography>

      {/* Multi-line Styled Paper TextInput */}
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        multiline
        numberOfLines={numberOfLines}
        outlineColor={theme.colors.secondary}
        activeOutlineColor={theme.colors.primary}
        style={[styles.textArea, { backgroundColor: theme.colors.settingCard }]}
        theme={{ roundness: 12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.xl,
  },
  label: {
    marginBottom: Metrics.margin.xs,
  },
  textArea: {
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: "top",
    paddingVertical: Metrics.padding.md,
  },
});

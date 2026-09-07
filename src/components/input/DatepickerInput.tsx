import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../text/typography";

interface DatePickerInputProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  required?: boolean;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onChange,
  required = false,
}) => {
  const [show, setShow] = useState(false);
  const { theme } = useAppTheme();

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    // Hide picker on Android after selection
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  // Format Date object to MM/DD/YYYY
  const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Input Label */}
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

      {/* Trigger Button */}
      <TouchableOpacity
        style={[
          styles.inputBox,
          {
            backgroundColor: theme.colors.settingCard,
            borderColor: theme.colors.secondary,
          },
        ]}
        onPress={() => setShow(true)}
        activeOpacity={0.8}
      >
        <Typography
          variant="body2"
          style={styles.valueText}
          color={theme.colors.textPrimary}
        >
          {formatDate(value)}
        </Typography>
        <Feather name="calendar" size={18} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      {/* Native Date Picker Modal */}
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.lg,
  },
  label: {
    marginBottom: Metrics.margin.sm,
  },
  inputBox: {
    height: Metrics.height.lg,
    borderWidth: 1,
    borderRadius: Metrics.radius.lg,
    paddingHorizontal: Metrics.padding.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  valueText: {
    fontSize: 14,
  },
});

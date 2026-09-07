import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Surface } from "react-native-paper";
import Typography from "../text/typography";

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (item: string) => void;
  required?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);
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

      <TouchableOpacity
        style={[
          styles.dropdownBox,
          {
            backgroundColor: theme.colors.settingCard,
            borderColor: theme.colors.secondary,
          },
        ]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Typography
          variant="caption"
          style={styles.valueText}
          color={theme.colors.textPrimary}
        >
          {value || "Select option"}
        </Typography>
        <Feather
          name="chevron-down"
          size={20}
          color={theme.colors.textPrimary}
        />
      </TouchableOpacity>

      {/* Options Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <Surface
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background },
            ]}
            elevation={3}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    { borderBottomColor: theme.colors.textPrimary },
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Typography
                    variant="caption"
                    color={theme.colors.textPrimary}
                  >
                    {item}
                  </Typography>
                </TouchableOpacity>
              )}
            />
          </Surface>
        </TouchableOpacity>
      </Modal>
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
  dropdownBox: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: Metrics.padding.xxl,
  },
  modalContent: {
    borderRadius: Metrics.radius.lg,
    maxHeight: 250,
    overflow: "hidden",
  },
  optionItem: {
    paddingVertical: Metrics.padding.lg,
    paddingHorizontal: Metrics.padding.lg,
    borderBottomWidth: 1,
  },
});

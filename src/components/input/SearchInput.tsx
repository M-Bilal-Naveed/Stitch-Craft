import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = "Search name",
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text ?? "")}
        value={value ?? ""}
        style={[
          styles.searchbar,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.cGreen,
          },
        ]}
        inputStyle={[styles.inputStyle, { color: theme.colors.textPrimary }]}
        placeholderTextColor={theme.colors.textMuted}
        iconColor={theme.colors.cGreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.lg,
  },
  searchbar: {
    borderRadius: Metrics.radius.xxxl,
    borderWidth: 1.5,
    elevation: 0,
    height: Metrics.height.lg,
  },
  inputStyle: {
    fontSize: 15,
    alignSelf: "center",
  },
});

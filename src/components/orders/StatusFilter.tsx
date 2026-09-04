import { Fonts } from "@/constants/fonts";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { FilterCategory } from "@/types/categories.types";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../text/typography";

interface StatusFilterProps {
  selectedStatus: FilterCategory;
  onSelectStatus: (status: FilterCategory) => void;
}

const CATEGORIES: FilterCategory[] = [
  "All",
  "Cutting",
  "Stitching",
  "Ready",
  "Pending",
  "Delivered",
];

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onSelectStatus,
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedStatus === category;

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.pill,
                isSelected
                  ? { backgroundColor: theme.colors.secondary }
                  : {
                      backgroundColor: theme.colors.surfaceVariant,
                    },
              ]}
              onPress={() => onSelectStatus(category)}
              activeOpacity={0.8}
            >
              <Typography
                style={[
                  styles.pillText,
                  {
                    color: isSelected
                      ? theme.colors.text
                      : theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                {category}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default StatusFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.md,
  },
  scrollContent: {
    flexDirection: "row",
    gap: Metrics.margin.sm,
  },
  pill: {
    paddingHorizontal: Metrics.padding.md,
    paddingVertical: Metrics.padding.xs,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
});

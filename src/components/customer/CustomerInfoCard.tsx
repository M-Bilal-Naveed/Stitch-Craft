import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface CustomerInfoCardProps {
  name: string;
  customerNumber: string;
  address: string;
}

export const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({
  name,
  customerNumber,
  address,
}) => {
  const { theme } = useAppTheme();

  // Get initials for the avatar (e.g., "Ahmed Khan" -> "AK")
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

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
      {/* Avatar Circle */}
      <View
        style={[
          styles.avatar,
          { backgroundColor: theme.colors.cGreen || "#133020" },
        ]}
      >
        <Typography variant="h4" color="#FFFFFF" style={styles.avatarText}>
          {initials}
        </Typography>
      </View>

      {/* Info Column (No phone number) */}
      <View style={styles.infoContainer}>
        <Typography variant="h4" color={theme.colors.textPrimary}>
          {name}
        </Typography>

        <View style={styles.phoneRow}>
          <Feather
            name="phone"
            size={14}
            color={theme.colors.cGreen}
            style={styles.phoneIcon}
          />
          <Typography variant="caption" color={theme.colors.cGreen}>
            {customerNumber}
          </Typography>
        </View>

        <View style={styles.phoneRow}>
          <EvilIcons name="location" size={14} color={theme.colors.textMuted} />
          <Typography
            variant="caption"
            color={theme.colors.textMuted}
            numberOfLines={1}
          >
            {address}
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: Metrics.padding.lg,
    borderRadius: Metrics.radius.xl,
    borderWidth: 1.5,
    marginBottom: Metrics.margin.xl,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.margin.lg,
  },
  avatarText: {
    fontWeight: "700",
  },
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneIcon: {
    marginRight: Metrics.margin.sm,
  },
});

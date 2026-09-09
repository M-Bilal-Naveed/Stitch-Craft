import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { removeToken } from "@/utils/authStorage";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Typography from "../text/typography";

const LogoutBox = () => {
  const { theme } = useAppTheme();

  const handleLogout = async () => {
    await removeToken();
    router.replace("/(auth)/login");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.settingCard,
          borderColor: theme.colors.settingBoarder,
        },
      ]}
    >
      <Typography variant="h4" color={theme.colors.onSurface}>
        Logout
      </Typography>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutButton,
          {
            backgroundColor: theme.colors.error,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Typography
          variant="button"
          color={theme.colors.text}
          numberOfLines={1}
        >
          Logout
        </Typography>
      </Pressable>
    </View>
  );
};

export default LogoutBox;

const styles = StyleSheet.create({
  container: {
    gap: Metrics.gap.sm,
    borderRadius: Metrics.radius.xl,
    padding: Metrics.padding.lg,
    marginBottom: Metrics.margin.lg,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  logoutButton: {
    minHeight: 48,
    borderRadius: Metrics.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Metrics.padding.lg,
    width: "50%",
  },
});

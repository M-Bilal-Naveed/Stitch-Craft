import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Image, StyleSheet, View } from "react-native";
import Typography from "../text/typography";

const DashboardHeader = () => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.secondary,
        },
      ]}
    >
      <View style={styles.content}>
        <View>
          <Typography
            variant="caption"
            style={styles.headerSubtitle}
            color={theme.colors.textSecondary}
          >
            TAILOR MANAGER
          </Typography>

          <Typography
            variant="h4"
            style={styles.headerTitle}
            color={theme.colors.text}
          >
            Shop Dashboard
          </Typography>
        </View>

        <View style={styles.logoButton}>
          <Image source={Images.logo} style={styles.pic} />
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Metrics.padding.xl,
    paddingVertical: Metrics.padding.xl,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerSubtitle: {
    letterSpacing: 0.5,
  },

  headerTitle: {
    marginTop: 2,
  },

  logoButton: {
    width: Metrics.width.md,
    height: Metrics.height.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  pic: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Image, StyleSheet, View } from "react-native";
import Typography from "../text/typography";

const DashboardHeader = () => {
  const { theme } = useAppTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.colors.secondary }]}>
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
      <Image source={Images.logo} style={styles.pic} />
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Metrics.padding.xl,
    paddingTop: Metrics.padding.lg,
    paddingBottom: Metrics.padding.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerSubtitle: {
    letterSpacing: 0.5,
  },
  headerTitle: {
    marginTop: 2,
  },
  pic: {
    width: Metrics.width.lg,
    height: Metrics.height.xl,
  },
});

import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import Typography from "../text/typography";

const DashboardHeader = () => {
  const { theme } = useAppTheme();

  return (
    <Appbar.Header
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.secondary,
        },
      ]}
    >
      <Appbar.Content
        title={
          <>
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
          </>
        }
      />

      <TouchableOpacity
        style={styles.logoButton}
        activeOpacity={0.7}
        onPress={() => {
          // handle press here
        }}
      >
        <Image source={Images.logo} style={styles.pic} />
      </TouchableOpacity>
    </Appbar.Header>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Metrics.padding.xl,
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

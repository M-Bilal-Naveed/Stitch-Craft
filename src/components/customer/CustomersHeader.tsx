import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import Typography from "../text/typography";

const CustomersHeader = () => {
  const { theme } = useAppTheme();
  return (
    <Appbar.Header
      style={[styles.header, { backgroundColor: theme.colors.secondary }]}
    >
      <Appbar.Content
        title={
          <Typography variant="h3" color={theme.colors.text}>
            Customers List
          </Typography>
        }
      />

      <TouchableOpacity style={styles.addUserButton} activeOpacity={0.7}>
        <Image source={Images.logo} style={styles.addUserImage} />
      </TouchableOpacity>
    </Appbar.Header>
  );
};

export default CustomersHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Metrics.padding.sm,
  },
  addUserButton: {
    marginRight: Metrics.margin.md,
    padding: Metrics.padding.sm,
  },

  addUserImage: {
    width: Metrics.width.md,
    height: Metrics.height.lg,
    resizeMode: "contain",
    marginBottom: Metrics.margin.sm,
  },
});

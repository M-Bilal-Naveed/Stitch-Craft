import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = ({ onPress }: AddButtonProps) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.secondary,
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Feather name="plus" size={28} color={theme.colors.halfWhite} />
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 30,
    bottom: 30,

    width: Metrics.width.iconButtonLarge,
    height: Metrics.height.buttonLarge,
    borderRadius: Metrics.radius.circle,

    alignItems: "center",
    justifyContent: "center",

    elevation: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

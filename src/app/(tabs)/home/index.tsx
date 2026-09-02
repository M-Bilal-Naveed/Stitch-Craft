import { StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View style={styles.main}>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#12692f",
    height: "100%",
  },
});

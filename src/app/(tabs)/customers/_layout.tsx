import { Stack } from "expo-router";

export default function CustomersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="profilepic" options={{}} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="appEntry" options={{}} /> */}
      <Stack.Screen name="login" options={{}} />
      <Stack.Screen name="register" options={{}} />
    </Stack>
  );
}

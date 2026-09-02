import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="profilepic" options={{}} />
    </Stack>
  );
}

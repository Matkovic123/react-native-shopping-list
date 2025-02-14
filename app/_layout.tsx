import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Shopping List" }}
      ></Stack.Screen>
      <Stack.Screen
        name="counter"
        options={{ title: "Counter", presentation: "modal", animation: "fade" }}
      ></Stack.Screen>
      <Stack.Screen
        name="idea"
        options={{
          title: "Idea",
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      ></Stack.Screen>
    </Stack>
  );
}

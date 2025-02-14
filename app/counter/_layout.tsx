import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Stack } from "expo-router";
import { theme } from "../../theme";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => (
            <Pressable hitSlop={20}>
              <Link href="/counter/history" asChild>
                <MaterialCommunityIcons
                  name="history"
                  size={32}
                  color={theme.colorGrey}
                />
              </Link>
            </Pressable>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
}

import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function SettingLayout() {
  const theme = useTheme();
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.primary,
          shadowColor: "transparent",
          elevation: 0,
        } as any,
        headerTintColor: theme.colors.onBackground,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

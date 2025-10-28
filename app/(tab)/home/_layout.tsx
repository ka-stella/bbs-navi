import { getHeaderOptions } from "@/components/home/header/options";
import { Stack, useSegments } from "expo-router";
import { useTheme } from "react-native-paper";

export default function HomeLayout() {
  // const insets = useSafeAreaInsets();
  const theme = useTheme();
  const segments = useSegments();
  const segment = segments.slice(2);
  const location = segment.join("/");

  return (
    <Stack
      screenOptions={({ route, navigation }) => ({
        ...getHeaderOptions(location),
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onBackground,
      })}
    />
  );
}

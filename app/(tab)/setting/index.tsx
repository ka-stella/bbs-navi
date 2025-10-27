import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text
        style={{
          color: theme.colors.onBackground,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        設定
      </Text>

      <Link href="/(tab)/setting/detail" asChild>
        <Pressable style={{ backgroundColor: theme.colors.surface }}>
          <Text
            style={{
              color: theme.colors.onSurface,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            詳細設定へ
          </Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

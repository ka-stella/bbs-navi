import { darkTheme, lightTheme } from "@/constants/theme";
import { useSettingsStore } from "@/stores/use-setting-store";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tab)",
};

export default function RootLayout() {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS === "android") {
      // ナビゲーションバーの背景色を設定
      NavigationBar.setBackgroundColorAsync(theme.colors.surface);
      // ナビゲーションバーのボタン（アイコン）の色を設定
      NavigationBar.setButtonStyleAsync(isDarkMode ? "light" : "dark");
    }
  }, [isDarkMode, theme.colors.surface]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Stack>
          <Stack.Screen name="(tab)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

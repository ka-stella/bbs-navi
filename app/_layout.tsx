import { darkTheme, lightTheme } from "@/constants/theme";
import { useSettingsStore } from "@/stores/use-setting-store";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tab)",
};

export default function RootLayout() {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Slot />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

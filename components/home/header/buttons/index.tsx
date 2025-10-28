import { useRouter } from "expo-router";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export * from "./board-selector-button";

export const SearchButton = ({ onPress }: { onPress?: () => void }) => {
  const theme = useTheme();
  return (
    <IconButton
      icon="magnify"
      iconColor={theme.colors.onBackground}
      containerColor={theme.colors.background}
      onPress={onPress ?? (() => {})}
    />
  );
};

export const BackButton = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <IconButton
      icon="arrow-left"
      iconColor={theme.colors.onBackground}
      containerColor={theme.colors.background}
      onPress={() => router.back()}
    />
  );
};

export const RightButtons = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <View
      style={{ flexDirection: "row", backgroundColor: theme.colors.background }}
    >
      {children}
    </View>
  );
};

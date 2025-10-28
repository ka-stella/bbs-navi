import { BOARDS } from "@/constants/boards";
import { useRouter, useSegments } from "expo-router";
import { useState } from "react";
import { IconButton, Menu, useTheme } from "react-native-paper";

export const BoardSelectorButton = () => {
  const theme = useTheme();
  const router = useRouter();
  const segments = useSegments();
  const currentPath = `/${segments.join("/")}`;
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={{
        backgroundColor: theme.colors.surface,
      }}
      anchor={
        <IconButton
          icon="dots-vertical"
          iconColor={theme.colors.onBackground}
          containerColor={theme.colors.background}
          onPress={() => setVisible(true)}
        />
      }
    >
      {BOARDS.map((b) => {
        const isActive = currentPath.startsWith(b.path.toString());

        return (
          <Menu.Item
            key={b.path.toString()}
            title={b.name}
            onPress={() => {
              router.push(b.path);
              setVisible(false);
            }}
            trailingIcon={isActive ? "check" : undefined}
            titleStyle={{
              fontWeight: isActive ? "bold" : "normal",
              backgroundColor: theme.colors.surface,
              color: isActive ? theme.colors.primary : theme.colors.onSurface,
            }}
          />
        );
      })}
    </Menu>
  );
};

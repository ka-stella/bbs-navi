// 使い方
// import { useTheme } from 'react-native-paper';

// const MyComponent = () => {
//   const theme = useTheme();

//   return (
//     <View style={{ backgroundColor: theme.colors.background }}>
//       <Text style={{ color: theme.colors.text }}>現在のテーマに応じた色</Text>
//     </View>
//   );
// };

import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#ffffff",
    onBackground: "#000000",
    surface: "#ffffff",
    onSurface: "#000000",
    primary: "#6200ee",
    onPrimary: "#ffffff",
    secondary: "#03dac6",
    onSecondary: "#000000",
    error: "#b00020",
    onError: "#ffffff",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#121212",
    onBackground: "#ffffff",
    surface: "#1f1f1f",
    onSurface: "#ffffff",
    primary: "#bb86fc",
    onPrimary: "#000000",
    secondary: "#03dac6",
    onSecondary: "#000000",
    error: "#cf6679",
    onError: "#000000",
  },
};

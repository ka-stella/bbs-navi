import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function BakusaiScreen(): React.JSX.Element {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text
        style={{
          color: theme.colors.onBackground,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        5c
      </Text>
    </View>
  );
}

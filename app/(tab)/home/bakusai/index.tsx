import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function BakusaiAreaScreen(): React.JSX.Element {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View>
        <Text>地域を選択してください</Text>
      </View>
    </View>
  );
}

import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeScreen(): React.JSX.Element {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View>
        <Text>掲示板を選択してください</Text>
      </View>
    </View>
  );
}

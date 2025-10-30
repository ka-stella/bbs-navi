import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function BakusaiCategoryScreen(): React.JSX.Element {
  const theme = useTheme();
  const params = useLocalSearchParams();

  const url = params.url as string;
  const title = params.name as string;

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
        url: {url} , title: {title}
      </Text>
    </View>
  );
}

import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

interface LoadingIndicatorProps {
  size?: "small" | "large";
  color?: string;
}
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "large",
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // padding: 20,
      }}
    >
      <ActivityIndicator size={size} color={theme.colors.onBackground} />
    </View>
  );
};

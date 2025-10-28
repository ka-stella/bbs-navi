import { LoadingIndicator } from "@/components/common/loading-indicator";
import { useArea } from "@/hooks/bakusai/use-area";
import { AreaData } from "@/types/bakusai";
import { router } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function BakusaiAreaScreen(): React.JSX.Element {
  const theme = useTheme();
  const { areas, isLoading } = useArea();

  const handleAreaSelected = (item: AreaData) => {
    router.push({
      pathname: "/(tab)/home/bakusai/category",
      params: {
        url: item.url,
        areaName: item.name,
      },
    });
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <FlatList
      data={areas}
      keyExtractor={(item) => item.id}
      style={{ backgroundColor: theme.colors.surface }}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleAreaSelected(item)}>
          <Text style={{ color: theme.colors.onSurface, fontSize: 18 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

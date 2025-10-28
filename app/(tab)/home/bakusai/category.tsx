import { LoadingIndicator } from "@/components/common/loading-indicator";
import { useCategory } from "@/hooks/bakusai/use-category";
import { Category } from "@/types/bakusai";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function BakusaiCategoryScreen(): React.JSX.Element {
  const theme = useTheme();
  const params = useLocalSearchParams();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // 前の画面から渡されたパラメータを取得
  const url = params.url as string;

  const { categories, isLoading } = useCategory(url);

  const handleCategorySelected = (category: Category) => {
    // router.push({
    //   pathname: "/(tab)/home/bakusai/list",
    //   params: {
    //     areaId,
    //     areaName,
    //     categoryId: category.id,
    //     categoryName: category.name,
    //   },
    // });
  };

  const toggleExpand = (categoryName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName,
    );
  };

  const renderCategory = ({ item }: { item: Category }): React.JSX.Element => (
    <View>
      {/* 大カテゴリ */}
      <TouchableOpacity onPress={() => toggleExpand(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>

      {/* サブカテゴリ（展開表示） */}
      {expandedCategory === item.name && (
        <View>
          {item.subCategories.map((sub, idx) => (
            <Text key={idx}>・{sub.name}</Text>
          ))}
        </View>
      )}
    </View>
  );

  if (isLoading) return <LoadingIndicator />;

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.name}
      renderItem={renderCategory}
      numColumns={1}
    />
  );
}

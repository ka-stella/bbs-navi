import { Category, SubCategory } from "@/types/bakusai";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const theme = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleToggle = (categoryName: string) => {
    setExpandedCategory((prev: string | null) =>
      prev === categoryName ? null : categoryName,
    );
  };

  const handleSubCategoryPress = (sub: SubCategory) => {
    router.push({
      pathname: "/(tab)/home/bakusai/thread-list",
      params: { url: sub.url, name: sub.name },
    });
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      {categories.map((category) => (
        <List.Accordion
          key={category.name}
          title={category.name}
          expanded={expandedCategory === category.name}
          onPress={() => handleToggle(category.name)}
          titleStyle={{
            color: theme.colors.onSurface,
            fontWeight: "600",
          }}
          style={{
            backgroundColor: theme.colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outlineVariant,
          }}
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          {category.subCategories.map((sub) => (
            <List.Item
              key={sub.name}
              title={sub.name}
              onPress={() => handleSubCategoryPress(sub)}
              left={(props) => <List.Icon {...props} icon="chevron-right" />}
              style={{
                backgroundColor: theme.colors.surfaceVariant,
              }}
              titleStyle={{
                color: theme.colors.onSurfaceVariant,
              }}
            />
          ))}
        </List.Accordion>
      ))}
    </ScrollView>
  );
}

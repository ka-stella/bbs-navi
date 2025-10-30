import type { Category } from "@/types/bakusai";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

interface Props {
  categories: Category[];
}

export const CategoryGrid: React.FC<Props> = ({ categories }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleCategoryPress = (name: string) => {
    setExpanded((prev) => (prev === name ? null : name));
  };

  const handleSubCategoryPress = (url: string, name: string) => {
    router.push({
      pathname: "/(tab)/home/bakusai/category",
      params: { url, categoryName: name },
    });
  };

  // ✅ 2列ずつにグループ化する
  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += 2) {
    groupedCategories.push(categories.slice(i, i + 2));
  }

  const renderRow = ({ item: row }: { item: Category[] }) => {
    // 展開中カテゴリがこの行に含まれるか確認
    const expandedCategory = row.find((cat) => cat.name === expanded);

    if (expandedCategory) {
      // 展開行を「サブカテゴリ表示」に差し替え
      const subCategories = expandedCategory.subCategories;
      const groupedSubs = [];
      for (let i = 0; i < subCategories.length; i += 2) {
        groupedSubs.push(subCategories.slice(i, i + 2));
      }

      return (
        <View style={{ marginBottom: 8 }}>
          {/* 1行目はカテゴリ + サブカテゴリ1 */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.category,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
              onPress={() => handleCategoryPress(expandedCategory.name)}
            >
              <Text
                style={{
                  color: theme.colors.onPrimaryContainer,
                  fontWeight: "600",
                }}
              >
                {expandedCategory.name}
              </Text>
            </TouchableOpacity>
            {subCategories[0] && (
              <TouchableOpacity
                style={[
                  styles.subCategory,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
                onPress={() =>
                  handleSubCategoryPress(
                    subCategories[0].url,
                    subCategories[0].name,
                  )
                }
              >
                <Text style={{ color: theme.colors.onSurfaceVariant }}>
                  {subCategories[0].name}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* 残りのサブカテゴリを2列で表示 */}
          {groupedSubs.slice(1).map((pair, idx) => (
            <View key={idx} style={styles.row}>
              {pair.map((sub) => (
                <TouchableOpacity
                  key={sub.name}
                  style={[
                    styles.subCategory,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                  onPress={() => handleSubCategoryPress(sub.url, sub.name)}
                >
                  <Text style={{ color: theme.colors.onSurfaceVariant }}>
                    {sub.name}
                  </Text>
                </TouchableOpacity>
              ))}
              {pair.length === 1 && (
                <View style={[styles.subCategory, { opacity: 0 }]} />
              )}
            </View>
          ))}
        </View>
      );
    }

    // 通常カテゴリ行
    return (
      <View style={styles.row}>
        {row.map((cat) => (
          <TouchableOpacity
            key={cat.name}
            style={[styles.category, { backgroundColor: theme.colors.surface }]}
            onPress={() => handleCategoryPress(cat.name)}
          >
            <Text style={{ color: theme.colors.onSurface, fontWeight: "600" }}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
        {row.length === 1 && <View style={[styles.category, { opacity: 0 }]} />}
      </View>
    );
  };

  return (
    <FlatList
      data={groupedCategories}
      keyExtractor={(row, i) => i.toString()}
      renderItem={renderRow}
      contentContainerStyle={{ padding: 8 }}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  category: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 4,
    alignItems: "center",
  },
  subCategory: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 4,
    alignItems: "center",
  },
});

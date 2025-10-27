import { Board } from "@/types/board";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface BoardContentProps {
  board: Board | null;
}

export default function BoardContent({ board }: BoardContentProps) {
  if (!board) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>掲示板を選択してください</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* ここに掲示板の具体的なコンテンツを表示 */}
      <View style={styles.content}>
        <Text style={styles.contentTitle}>掲示板のメインコンテンツ</Text>
        <Text>ここにスレッド一覧や投稿内容などを表示します</Text>

        {/* サンプルコンテンツ */}
        <View style={styles.threadItem}>
          <Text style={styles.threadTitle}>サンプルスレッド1</Text>
          <Text style={styles.threadInfo}>投稿者: user1 - 2024/01/01</Text>
        </View>

        <View style={styles.threadItem}>
          <Text style={styles.threadTitle}>サンプルスレッド2</Text>
          <Text style={styles.threadInfo}>投稿者: user2 - 2024/01/02</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  placeholderText: {
    fontSize: 18,
    color: "#999",
  },
  header: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  boardName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  boardDescription: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    padding: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  threadItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 8,
  },
  threadTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  threadInfo: {
    fontSize: 12,
    color: "#666",
  },
});

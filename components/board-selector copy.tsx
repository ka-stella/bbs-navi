import { Board } from "@/types/board";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

interface BoardSelectorProps {
  boards: Board[];
  selectedBoard: Board | null;
  onBoardSelect: (board: Board) => void;
}

export default function BoardSelector({
  boards,
  selectedBoard,
  onBoardSelect,
}: BoardSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedBoard ? selectedBoard.name : "掲示板を選択してください"}
        </Text>
        <MaterialCommunityIcons
          name="menu-down"
          size={24}
          color={theme.colors.onSurface}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={boards}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.boardItem,
                    selectedBoard?.id === item.id && styles.selectedBoardItem,
                  ]}
                  onPress={() => {
                    onBoardSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.boardName}>{item.name}</Text>
                  <Text style={styles.boardDescription}>{item.url}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.dark
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.1)",
    },
    selectorButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: theme.roundness,
      borderWidth: 1,
      borderColor: theme.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
      elevation: 2,
      shadowColor: theme.colors.onSurface,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    selectorText: {
      fontSize: 16,
      color: theme.colors.onSurface,
      fontWeight: "500",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness * 2,
      padding: 8,
      maxHeight: "80%",
      width: "90%",
      elevation: 8,
      shadowColor: theme.colors.onSurface,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    boardItem: {
      padding: 16,
      borderRadius: theme.roundness,
      marginHorizontal: 8,
      marginVertical: 2,
    },
    selectedBoardItem: {
      backgroundColor: theme.colors.primary + "20",
    },
    boardName: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    boardDescription: {
      fontSize: 14,
      color: theme.colors.onSurface + "80", // 透明度を追加
    },
  });

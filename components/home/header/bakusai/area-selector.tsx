import { useAreaStore } from "@/stores/bakusai/use-area-store";
import { AreaData } from "@/types/bakusai";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { IconButton, Modal, Portal, Text, useTheme } from "react-native-paper";

export const AreaSelector = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const { areas, isLoading, currentArea, setCurrentArea, fetchAreas } =
    useAreaStore();

  const label = currentArea?.name ?? (isLoading ? "読み込み中…" : "地域を選択");

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  const handleSelect = (area: AreaData) => {
    setCurrentArea?.(area);
    setVisible(false);
    router.push({
      pathname: "/(tab)/home/bakusai/category",
      params: {
        url: area.url,
        areaName: area.name,
      },
    });
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {label} ▼
        </Text>
      </TouchableOpacity>

      <AreaSelectModal
        visible={visible}
        onClose={() => setVisible(false)}
        areas={areas}
        isLoading={isLoading}
        currentArea={currentArea}
        onSelect={handleSelect}
      />
    </>
  );
};

const AreaSelectModal = ({
  visible,
  onClose,
  areas,
  isLoading,
  currentArea,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  areas?: AreaData[] | null;
  isLoading?: boolean;
  currentArea?: AreaData | null;
  onSelect: (area: AreaData) => void;
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        style={{
          backgroundColor: theme.dark
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0.5)",
          padding: 20,
          justifyContent: "center",
        }}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          marginHorizontal: 24,
          padding: 20,
          maxHeight: "70%",
          borderRadius: 12,
        }}
      >
        {isLoading ? (
          <Text>読み込み中...</Text>
        ) : (
          <FlatList
            data={areas ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const active = currentArea?.id === item.id;
              return (
                <TouchableOpacity
                  onPress={() => onSelect(item)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    marginBottom: 4,
                    backgroundColor: active
                      ? theme.colors.primaryContainer
                      : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: active
                        ? theme.colors.onPrimaryContainer
                        : theme.colors.onSurface,
                      fontSize: 16,
                      fontWeight: active ? "600" : "400",
                    }}
                  >
                    {item.name}
                  </Text>
                  <View style={{ width: 32, alignItems: "center" }}>
                    <IconButton
                      icon="check-circle"
                      iconColor={active ? theme.colors.primary : "transparent"}
                      size={22}
                      style={{ margin: 0 }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={true}
          />
        )}
      </Modal>
    </Portal>
  );
};

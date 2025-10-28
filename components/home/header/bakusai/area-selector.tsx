import { LoadingIndicator } from "@/components/common/loading-indicator";
import { useAreaStore } from "@/stores/use-area-store";
import { AreaData } from "@/types/bakusai";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";

export const AreaSelector = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const areas = useAreaStore((s) => s.areas);
  const isLoading = useAreaStore((s) => s.isLoading);
  const currentArea = useAreaStore((s) => s.currentArea);
  const setCurrentArea = useAreaStore((s) => s.setCurrentArea);

  const label = currentArea?.name ?? (isLoading ? "読み込み中…" : "地域を選択");

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

  if (isLoading) return <LoadingIndicator />;

  // return (
  //   <Portal>
  //     <Modal visible={visible}>
  //       <TouchableOpacity
  //         style={{ flex: 1, backgroundColor: "#00000066" }}
  //         activeOpacity={1}
  //         onPress={onClose}
  //       >
  //         <Surface
  //           style={{
  //             marginTop: 120,
  //             marginHorizontal: 20,
  //             borderRadius: 12,
  //             padding: 12,
  //             maxHeight: "70%",
  //             backgroundColor: theme.colors.surface,
  //           }}
  //         >
  //           {isLoading ? (
  //             <Text>読み込み中...</Text>
  //           ) : (
  //             <FlatList
  //               data={areas ?? []}
  //               keyExtractor={(item) => item.id}
  //               ItemSeparatorComponent={() => <Divider />}
  //               renderItem={({ item }) => {
  //                 const active = currentArea?.id === item.id;
  //                 return (
  //                   <TouchableOpacity
  //                     onPress={() => onSelect(item)}
  //                     style={{
  //                       paddingVertical: 12,
  //                       paddingHorizontal: 8,
  //                       flexDirection: "row",
  //                       justifyContent: "space-between",
  //                       alignItems: "center",
  //                       backgroundColor: active
  //                         ? theme.colors.surfaceVariant
  //                         : undefined,
  //                     }}
  //                   >
  //                     <Text style={{ color: theme.colors.onSurface }}>
  //                       {item.name}
  //                     </Text>
  //                     {active ? <Text>✅</Text> : null}
  //                   </TouchableOpacity>
  //                 );
  //               }}
  //             />
  //           )}
  //         </Surface>
  //       </TouchableOpacity>
  //     </Modal>
  //   </Portal>
  // );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        style={{
          backgroundColor: theme.dark
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0.5)",
        }}
        contentContainerStyle={{
          // backgroundColor: theme.colors.surface,
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
  );
};

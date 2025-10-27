import BoardSelector from "@/components/board-selector";
import { BOARDS } from "@/constants/boards";
import { Board } from "@/types/board";
import { Href, Stack, usePathname, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const router = useRouter();
  const pathname = usePathname();

  const getCurrentBoardId = () => {
    const match = pathname.match(/\/home\/([^\/]+)/);
    return match ? match[1] : null;
  };

  const currentBoardId = getCurrentBoardId();

  const selectedBoard =
    (BOARDS.find((board) => board.id === currentBoardId) as Board) || null;

  const handleBoardSelect = (board: Board) => {
    const targetPath = `/(tab)/home/${board.id}`;
    router.push(targetPath as Href);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BoardSelector
        boards={BOARDS}
        selectedBoard={selectedBoard}
        onBoardSelect={handleBoardSelect}
      />

      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        ></Stack>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    content: {
      flex: 1,
    },
  });

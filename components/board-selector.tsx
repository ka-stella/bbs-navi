import { Board } from "@/types/board";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

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
  const theme = useTheme();

  const handleSelect = (selectedName: string | undefined) => {
    if (!selectedName) return;

    const board = boards.find((b) => b.name === selectedName);
    if (board) onBoardSelect(board);
  };

  return (
    <View style={{ margin: 16 }}>
      <Dropdown
        options={boards.map((board) => ({
          label: board.name,
          value: board.name,
        }))}
        value={selectedBoard?.name}
        onSelect={handleSelect}
        hideMenuHeader={true}
        placeholder="掲示板を選択してください"
        mode="outlined"
        menuContentStyle={{
          backgroundColor: theme.colors.surface,
        }}
      />
    </View>
  );
}

import {
  BackButton,
  BoardSelectorButton,
  RightButtons,
  SearchButton,
} from "./buttons";

export const getHeaderOptions = (location: string) => {
  // 例: "bakusai/category" → ["bakusai", "category"]
  const parts = location.split("/");
  // const boardId = parts[0]; // "bakusai" or "5ch"
  const isRoot = parts.length === 1 || parts[1] === "index";

  // const board = BOARDS.find((b) => b.id === boardId);
  // const boardTitle = board?.name ?? "";

  if (isRoot) {
    return {
      headerLeft: () => null,
      headerRight: () => (
        <RightButtons>
          <SearchButton />
          <BoardSelectorButton />
        </RightButtons>
      ),
      title: "",
      // title: boardTitle,
      // headerTitleAlign: "center",
    };
  }

  return {
    headerLeft: () => <BackButton />,
    headerRight: () => (
      <RightButtons>
        <SearchButton />
        <BoardSelectorButton />
      </RightButtons>
    ),
    title: "",
    // title: boardTitle,
    // headerTitleAlign: "center",
  };
};

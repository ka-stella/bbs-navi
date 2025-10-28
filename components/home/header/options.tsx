import { AreaSelector } from "./bakusai/area-selector";
import {
  BackButton,
  BoardSelectorButton,
  RightButtons,
  SearchButton,
} from "./buttons";

export const getHeaderOptions = (location: string) => {
  const parts = location.split("/"); // ["bakusai", "category"]
  const boardId = parts[0]; // "bakusai" or "5ch"
  const isRoot = parts.length === 1 || parts[1] === "index";
  const showAreaSelector = boardId === "bakusai";

  const headerTitle = showAreaSelector ? () => <AreaSelector /> : "";

  return {
    headerLeft: () => (isRoot ? null : <BackButton />),
    headerRight: () => (
      <RightButtons>
        {isRoot ? null : <SearchButton />}
        <BoardSelectorButton />
      </RightButtons>
    ),
    headerTitle,
    headerTitleAlign: "center" as const,
  };
};

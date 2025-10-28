import { Board } from "@/types/board";

export const BOARDS: Board[] = [
  {
    id: "5ch",
    name: "5ch",
    url: "https://www2.5ch.net/5ch.html",
    path: "/(tab)/home/5ch",
  },
  {
    id: "bakusai",
    name: "bakusai.com",
    url: "https://bakusai.com",
    path: "/(tab)/home/bakusai",
  },
  // {
  //   id: "3",
  //   name: "掲示板３",
  //   url: "https://example.com",
  // },
  // {
  //   id: "4",
  //   name: "掲示板４",
  //   url: "https://example.com",
  // },
  // {
  //   id: "5",
  //   name: "掲示板４",
  //   url: "https://example.com",
  // },
  // {
  //   id: "6",
  //   name: "掲示板４",
  //   url: "https://example.com",
  // },
  // {
  //   id: "7",
  //   name: "掲示板４",
  //   url: "https://example.com",
  // },
  // {
  //   id: "8",
  //   name: "掲示板４",
  //   url: "https://example.com",
  // },
];

const BOARD_MAP = new Map(BOARDS.map((board) => [board.id, board]));

export const getBoardUrl = (
  id: string,
  defaultUrl: string = "https://bakusai.com",
): string => {
  return BOARD_MAP.get(id)?.url ?? defaultUrl;
};

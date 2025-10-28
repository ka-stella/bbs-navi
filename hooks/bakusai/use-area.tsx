import { BOARDS } from "@/constants/boards";
import { extractAreaDataFromHTML } from "@/features/bakusai/paser";
import { loadHTMLFromAssets } from "@/lib/load-asset";
import { AreaData } from "@/types/bakusai";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const bakusaiBoard = BOARDS.find((board) => board.id === "bakusai");
const BASE_URL = bakusaiBoard ? bakusaiBoard.url : "https://bakusai.com";

export const useArea = () => {
  const [areas, setAreas] = useState<AreaData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAndParseHTML = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        let htmlContent = "";
        // TODO: 消す予定
        if (Platform.OS === "web") {
          htmlContent = await loadHTMLFromAssets("area.html");
        } else {
          const res = await fetch(BASE_URL);
          htmlContent = await res.text();
        }

        // HTMLを解析
        const parsedAreas = extractAreaDataFromHTML(htmlContent);
        setAreas(parsedAreas);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "不明なエラー";
        setError(errorMessage);
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    void loadAndParseHTML();
  }, []);

  return { areas, isLoading, error };
};

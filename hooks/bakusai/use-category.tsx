import { BOARDS } from "@/constants/boards";
import { extractCategoryFromHTML } from "@/features/bakusai/paser";
import { loadHTMLFromAssets } from "@/lib/load-asset";
import { Category } from "@/types/bakusai";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const bakusaiBoard = BOARDS.find((board) => board.id === "bakusai");
const BASE_URL = bakusaiBoard ? bakusaiBoard.url : "https://bakusai.com";

export const useCategory = (url: string) => {
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAndParseHTML = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        if (!url) throw new Error("URLが指定されていません");

        let htmlContent = "";
        // TODO: 消す予定
        if (Platform.OS === "web") {
          htmlContent = await loadHTMLFromAssets("category.html");
        } else {
          const fullUrl = new URL(url, BASE_URL).toString();
          const res = await fetch(fullUrl);
          htmlContent = await res.text();
        }

        // HTMLを解析
        const parsedCategories = extractCategoryFromHTML(htmlContent);
        setCategories(parsedCategories);
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
  }, [url]);

  return { categories, isLoading, error };
};

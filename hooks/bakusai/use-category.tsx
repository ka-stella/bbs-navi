import { getBoardUrl } from "@/constants/boards";
import { loadCategoryHtml } from "@/features/bakusai/load-category-html";
import { extractCategoryFromHTML } from "@/features/bakusai/paser";
import { Category } from "@/types/bakusai";
import { useEffect, useState } from "react";

const BASE_URL = getBoardUrl("bakusai");

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

        const fullUrl = new URL(url, BASE_URL).toString();
        const html = await loadCategoryHtml(fullUrl);
        console.log(fullUrl);
        const parsedCategories = extractCategoryFromHTML(html);
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

import { loadHTMLFromAssets } from "@/lib/load-asset";
import { Platform } from "react-native";

export const loadCategoryHtml = async (url: string): Promise<string> => {
  if (Platform.OS === "web") {
    return await loadHTMLFromAssets("category.html");
  }

  const res = await fetch(url);
  return await res.text();
};

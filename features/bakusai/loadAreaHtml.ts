import { loadHTMLFromAssets } from "@/lib/load-asset";
import { Platform } from "react-native";

export const loadAreaHtml = async (url: string): Promise<string> => {
  if (Platform.OS === "web") {
    return await loadHTMLFromAssets("area.html");
  }

  const res = await fetch(url);
  return await res.text();
};

import { getBoardUrl } from "@/constants/boards";
import { loadAreaHtml } from "@/features/bakusai/loadAreaHtml";
import { extractAreaDataFromHTML } from "@/features/bakusai/paser";
import { AreaData } from "@/types/bakusai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const CACHE_KEY = "bakusai_area_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1h

const url = getBoardUrl("bakusai");

interface AreaState {
  areas: AreaData[] | null;
  currentArea: AreaData | null;
  isLoading: boolean;
  lastFetched: number | null;
  fetchAreas: () => Promise<void>;
  setCurrentArea: (area: AreaData) => void;
}

export const useAreaStore = create<AreaState>((set, get) => ({
  areas: null,
  currentArea: null,
  isLoading: false,
  lastFetched: null,
  setCurrentArea: (area) => set({ currentArea: area }),
  fetchAreas: async () => {
    const { lastFetched } = get();
    const now = Date.now();

    // キャッシュが有効ならfetchスキップ
    if (lastFetched && now - lastFetched < CACHE_TTL) return;

    set({ isLoading: true });

    try {
      // 永続キャッシュから読み込み
      const cacheStr = await AsyncStorage.getItem(CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        set({ areas: cache.areas, lastFetched: cache.lastFetched });
      }

      // 最新の取得
      const html = await loadAreaHtml(url);
      const areas = extractAreaDataFromHTML(html);

      // 保存
      const dataToSave = { areas, lastFetched: now };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(dataToSave));
      set(dataToSave);
    } catch (e) {
      console.error("Area fetch failed:", e);
    } finally {
      set({ isLoading: false });
    }
  },
}));

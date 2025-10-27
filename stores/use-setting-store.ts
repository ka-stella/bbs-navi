import { create } from "zustand";

interface TypographySettings {
  bodyFontSize: number;
  bodyLineHeight: number;
  bodyIndent: number;
  anchorFontSize: number;
  authorFontSize: number;
  metaFontSize: number;
}

interface SettingsState {
  isDarkMode: boolean;
  typography: TypographySettings;

  // setters
  setDarkMode: (value: boolean) => void;
  setTypography: (value: Partial<TypographySettings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  isDarkMode: false,
  typography: {
    bodyFontSize: 16,
    bodyLineHeight: 24,
    bodyIndent: 10,
    anchorFontSize: 15,
    authorFontSize: 14,
    metaFontSize: 13,
  },

  setDarkMode: (value) => set({ isDarkMode: value }),
  setTypography: (value) =>
    set((state) => ({
      typography: { ...state.typography, ...value },
    })),
}));

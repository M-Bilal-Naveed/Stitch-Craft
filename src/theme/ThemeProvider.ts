import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";
import type { AppTheme } from "./theme.types";

export type ThemeMode = "system" | "light" | "dark";

type ThemeContextType = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@app_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get the phone's current theme
  const systemColorScheme = useColorScheme();

  // User's selected preference
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");

  // Load saved theme when app starts
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

      if (
        savedTheme === "system" ||
        savedTheme === "light" ||
        savedTheme === "dark"
      ) {
        setThemeModeState(savedTheme);
      }
    } catch (error) {
      console.log("Failed to load theme:", error);
    }
  };

  // Save user's theme preference
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);

      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.log("Failed to save theme:", error);
    }
  };

  // Determine actual theme
  const isDark =
    themeMode === "dark" ||
    (themeMode === "system" && systemColorScheme === "dark");

  // Select actual Paper theme
  const theme: AppTheme = isDark ? darkTheme : lightTheme;

  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      isDark,
      theme,
    }),
    [themeMode, isDark, theme],
  );

  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children,
  );
}

// Custom hook
export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return context;
}

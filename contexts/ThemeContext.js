import React from "react";
import { useContext, createContext, useState } from "react";
import { DarkTheme, LightTheme } from "../const";
import { ActivityIndicator } from "react-native";
import { themeKey } from "../const";
import useAsyncStorage from "../hooks/useAsyncStorage";

const ThemeContext = createContext({});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // const [theme, setTheme] = useState(DarkTheme);
  const [theme, setTheme, hasRetrievedvalue] = useAsyncStorage(
    themeKey,
    DarkTheme
  );

  function toggleTheme() {
    setTheme(
      JSON.stringify(theme) === JSON.stringify(DarkTheme)
        ? LightTheme
        : DarkTheme
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {hasRetrievedvalue ? (
        children
      ) : (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}
        />
      )}
    </ThemeContext.Provider>
  );
}

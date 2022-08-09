import { useContext, createContext, useState } from "react";
import { DarkTheme } from "../const";

const ThemeContext = createContext({});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DarkTheme);
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

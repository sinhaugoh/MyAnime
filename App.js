import React from "react";
import { StatusBar } from "react-native";
import BottomTabBar from "./src/navigation/BottomTabBar";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { FavouriteAnimesProvider } from "./src/contexts/FavouriteAnimesContext";
import { SettingsProvider } from "./src/contexts/SettingsContext";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  // allow only portrait up mode
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  return (
    <ThemeProvider>
      <FavouriteAnimesProvider>
        <SettingsProvider>
          <BottomTabBar />
          <StatusBar />
        </SettingsProvider>
      </FavouriteAnimesProvider>
    </ThemeProvider>
  );
}

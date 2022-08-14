import { StatusBar } from "react-native";
import BottomTabBar from "./components/shared/BottomTabBar";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavouriteAnimesProvider } from "./contexts/FavouriteAnimesContext";
import { SettingsProvider } from "./contexts/SettingsContext";
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

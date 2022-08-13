import { StatusBar } from "react-native";
import BottomTabBar from "./components/shared/BottomTabBar";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavouriteAnimesProvider } from "./contexts/FavouriteAnimesContext";
import { SettingsProvider } from "./contexts/SettingsContext";

export default function App() {
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

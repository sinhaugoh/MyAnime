import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import BottomTabBar from "./components/shared/BottomTabBar";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavouriteAnimesProvider } from "./contexts/FavouriteAnimesContext";
export default function App() {
  return (
    <ThemeProvider>
      <FavouriteAnimesProvider>
        <BottomTabBar />
        <StatusBar />
      </FavouriteAnimesProvider>
    </ThemeProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

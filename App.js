import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import BottomTabBar from "./components/shared/BottomTabBar";
import { ThemeProvider } from "./contexts/ThemeContext";
export default function App() {
  return (
    <ThemeProvider>
      <BottomTabBar />
      <StatusBar />
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

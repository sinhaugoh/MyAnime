import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/Discover/DiscoverScreen";
import AnimeDetailScreen from "../screens/Discover/AnimeDetailScreen";
import { useTheme } from "../contexts/ThemeContext";

const Stack = createStackNavigator();

export default function DiscoverNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primaryBackgroundColor,
          shadowColor: theme.primaryBackgroundColor,
        },
        headerTitleStyle: {
          color: theme.primaryTextColor,
        },
      }}
    >
      <Stack.Screen
        name="Discover screen"
        component={DiscoverScreen}
        options={{ title: "Discover" }}
      />
      <Stack.Screen
        name="Anime detail"
        component={AnimeDetailScreen}
        options={{ title: "Detail" }}
      />
    </Stack.Navigator>
  );
}

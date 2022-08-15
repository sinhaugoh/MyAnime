import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/Discover/DiscoverScreen";
import AnimeDetailScreen from "../screens/AnimeDetail/AnimeDetailScreen";
import SearchResultScreen from "../screens/SearchResult/SearchResultScreen";
import { useTheme } from "../contexts/ThemeContext";
import { StyleSheet } from "react-native";
import { useState } from "react";

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
        headerTintColor: theme.primaryTextColor,
        headerBackTitleVisible: false,
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
        options={{
          title: "Detail",
        }}
      />
      <Stack.Screen
        name="Search result"
        component={SearchResultScreen}
        options={({ route }) => ({
          title: `Result of "${route.params.searchTerm}"`,
        })}
      />
    </Stack.Navigator>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import DiscoverNavigator from "../../navigation/DiscoverNavigator";
import RandomScreen from "../../screens/Random/RandomScreen";
import BookRackScreen from "../../screens/BookRack/BookRackScreen";
import SettingsScreen from "../../screens/Settings/SettingsScreen";
import { useTheme } from "../../contexts/ThemeContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabBar() {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopColor: theme.bottomTabBarColor,
            backgroundColor: theme.bottomTabBarColor,
          },
          tabBarActiveTintColor: theme.primaryTextColor,
          headerStyle: {
            backgroundColor: theme.primaryBackgroundColor,
            shadowOpacity: 0,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      >
        <Tab.Screen
          name="Discover"
          component={DiscoverNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Random"
          component={RandomScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="random" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Book rack"
          component={BookRackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="bookshelf"
                size={size + 3}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import DiscoverScreen from "../../screens/DiscoverScreen";
import RandomScreen from "../../screens/RandomScreen";
import BookRackScreen from "../../screens/BookRackScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import { useTheme } from "../../contexts/ThemeContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
          headerStyle: {
            backgroundColor: theme.primaryBackgroundColor,
            shadowColor: theme.primaryBackgroundColor,
          },
          headerTitleStyle: {
            color: theme.primaryTextColor,
          },
        }}
      >
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Random" component={RandomScreen} />
        <Tab.Screen name="Book rack" component={BookRackScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import DiscoverNavigator from "../../navigation/DiscoverNavigator";
import RandomScreen from "../../screens/Random/RandomScreen";
import BookRackScreen from "../../screens/BookRack/BookRackScreen";
import SettingsScreen from "../../screens/Settings/SettingsScreen";
import { useTheme } from "../../contexts/ThemeContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function BottomTabBar() {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopColor: theme.bottomTabBarColor,
            backgroundColor: theme.bottomTabBarColor,
          },
        }}
      >
        <Tab.Screen name="Discover" component={DiscoverNavigator} />
        <Tab.Screen name="Random" component={RandomScreen} />
        <Tab.Screen name="Book rack" component={BookRackScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

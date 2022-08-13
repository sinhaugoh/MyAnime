import { createStackNavigator } from "@react-navigation/stack";
import GenrePreferenceScreen from "../screens/GenrePreference/GenrePreferenceScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { useTheme } from "../contexts/ThemeContext";

const Stack = createStackNavigator();

export default function SettingsNavigator() {
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
        name="Settings screen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen name="Genre preference" component={GenrePreferenceScreen} />
    </Stack.Navigator>
  );
}

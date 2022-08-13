import { View, Text } from "react-native";
import { useSettings } from "../../contexts/SettingsContext";
import { useEffect } from "react";

export default function SettingsScreen({ navigation }) {
  const { genrePreferences } = useSettings();

  // navigate to genre preference screen if first time launch app
  useEffect(() => {
    if (genrePreferences === undefined || genrePreferences === null) {
      navigation.navigate("Genre preference");
    }
  }, []);

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

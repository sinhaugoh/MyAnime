import { View, Text, Button } from "react-native";
import { useSettings } from "../../contexts/SettingsContext";
import { useEffect } from "react";

export default function SettingsScreen({ navigation }) {
  const { genreExcludesPreferences } = useSettings();

  // navigate to genre preference screen if first time launch app
  useEffect(() => {
    if (
      genreExcludesPreferences === undefined ||
      genreExcludesPreferences === null
    ) {
      navigation.navigate("Genre preference");
    }
  }, []);

  return (
    <View>
      <Text>Settings</Text>
      <Button
        onPress={() => navigation.navigate("Genre preference")}
        title="Genre preference"
      />
    </View>
  );
}

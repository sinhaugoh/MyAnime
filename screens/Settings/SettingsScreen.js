import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import { useSettings } from "../../contexts/SettingsContext";
import { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { TableView, Section, Cell } from "react-native-tableview-simple";

export default function SettingsScreen({ navigation }) {
  const { genreExcludesPreferences } = useSettings();
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  const cellProps = {
    cellStyle: "basic",
    accessory: "DisclosureIndicator",
    backgroundColor: theme.primaryBackgroundColor,
    titleTextColor: theme.primaryTextColor,
  };

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
    <ScrollView style={themedStyles.scrollView}>
      <TableView>
        <Section header="Appearance">
          <Cell {...cellProps} title="Theme" />
        </Section>
        <Section header="Preferences">
          <Cell
            {...cellProps}
            title="Genre blacklist"
            onPress={() => navigation.navigate("Genre preference")}
          />
        </Section>
        <Section header="Others">
          <Cell {...cellProps} title="Clear data" />
        </Section>
      </TableView>
    </ScrollView>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: theme.primaryBackgroundColor,
      height: "100%",
    },
  });
// <View>
//   <Text>Settings</Text>
//   <Button
//     onPress={() => navigation.navigate("Genre preference")}
//     title="Genre preference"
//   />
// </View>

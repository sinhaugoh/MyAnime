import React from "react";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { useSettings } from "../../contexts/SettingsContext";
import { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { TableView, Section, Cell } from "react-native-tableview-simple";
import { DarkTheme } from "../../const";

export default function SettingsScreen({ navigation }) {
  const { genreExcludesPreferences } = useSettings();
  const { theme, toggleTheme } = useTheme();
  const themedStyles = styles(theme);

  const cellProps = {
    cellStyle: "basic",
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
  }, [genreExcludesPreferences, navigation]);

  return (
    <ScrollView style={themedStyles.scrollView}>
      <TableView>
        <Section header="Appearance">
          <Cell
            {...cellProps}
            title="Dark Theme"
            onPress={toggleTheme}
            cellAccessoryView={
              <Switch
                onValueChange={toggleTheme}
                value={JSON.stringify(theme) === JSON.stringify(DarkTheme)}
              />
            }
          />
        </Section>
        <Section header="Preferences">
          <Cell
            {...cellProps}
            title="Genre blacklist"
            onPress={() => navigation.navigate("Genre preference")}
            accessory="DisclosureIndicator"
          />
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

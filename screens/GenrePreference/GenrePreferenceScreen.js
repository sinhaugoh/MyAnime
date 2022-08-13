import ThemedView from "../../components/shared/ThemedView";
import ThemedText from "../../components/shared/ThemedText";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useSettings } from "../../contexts/SettingsContext";

export default function GenrePreferenceScreen() {
  const { theme } = useTheme();
  const { setGenrePreferences } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "test", value: "test" },
    { label: "test2", value: "test2" },
    { label: "test3", value: "test3" },
  ]);
  const [value, setValue] = useState([]);

  const themedStyles = styles(theme);

  console.log(value);
  return (
    <ThemedView style={themedStyles.container}>
      <SafeAreaView>
        <ThemedText style={themedStyles.title}>
          Pick your favourite genres from the list:
        </ThemedText>
        <DropDownPicker
          open={isOpen}
          setOpen={setIsOpen}
          value={value}
          items={items}
          setValue={setValue}
          setItems={setItems}
          multiple={true}
          mode="BADGE"
          searchable={true}
          theme="DARK"
          style={themedStyles.dropdown}
          textStyle={themedStyles.dropdownText}
          labelStyle={themedStyles.dropdownLabel}
          dropDownContainerStyle={themedStyles.dropdownContainer}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: Platform.OS === "android" ? 35 : 10,
    },
    title: {
      fontSize: RFPercentage(2.5),
      marginBottom: 8,
    },
    dropdown: {
      backgroundColor: theme.formInputColor,
      borderWidth: 0,
      borderRadius: 0,
    },
    dropdownContainer: {
      backgroundColor: theme.formInputColor,
      borderWidth: 0,
      borderTopWidth: 1,
      borderRadius: 0,
    },
    dropdownText: {},
    dropdownLabel: {
      backgroundColor: theme.formInputColor,
    },
  });

import ThemedView from "../../components/shared/ThemedView";
import ThemedText from "../../components/shared/ThemedText";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useSettings } from "../../contexts/SettingsContext";
import { JikanApi } from "../../services/JikanApi";

export default function GenrePreferenceScreen() {
  const { theme } = useTheme();
  const { genreExcludesPreferences, setGenreExcludesPreferences } =
    useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState([]);
  const [genres, setGenres] = useState([]);

  const themedStyles = styles(theme);

  useEffect(() => {
    // if (
    //   genreExcludesPreferences === undefined ||
    //   genreExcludesPreferences === null
    // ) {
    //   setGenreExcludesPreferences([]);
    // }
    (async () => {
      try {
        // fetch available genres
        const data = await JikanApi.fetchGenres();
        setGenres(data.data);
        // setGenreExcludesPreferences(data.data);
        setItems(
          data.data.map((genre) => {
            return {
              label: genre.name,
              value: genre.mal_id,
            };
          })
        );
      } catch (e) {
        console.log("GenrePreferenceScreen fetchGenres error", e);
      }
    })();
  }, []);

  useEffect(() => {
    // save the value of the dropdown into async storage
    setGenreExcludesPreferences(value);
  }, value);

  // console.log("value", value);
  // console.log("local data", genreExcludesPreferences);
  return (
    <ThemedView style={themedStyles.container}>
      <SafeAreaView>
        <ThemedText style={themedStyles.title}>
          Pick your favourite genres from the list:
        </ThemedText>
        <DropDownPicker
          placeholder="Select your favourite genre(s)"
          loading={true}
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

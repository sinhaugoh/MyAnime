import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecommendedView from "../../components/Discover/RecommendedView";
import TopRankedView from "../../components/Discover/TopRankedView";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { useSettings } from "../../contexts/SettingsContext";

const Tab = createMaterialTopTabNavigator();

export default function DiscoverScreen({ navigation }) {
  const { theme } = useTheme();
  const { genreExcludesPreferences } = useSettings();
  const themedStyles = styles(theme);
  const [searchInput, setSearchInput] = useState("");

  //navigate to genre settings screen if first time launch
  useEffect(() => {
    if (
      genreExcludesPreferences === undefined ||
      genreExcludesPreferences === null
    ) {
      navigation.navigate("Settings");
    }
  }, [genreExcludesPreferences, navigation]);

  function handleSearch() {
    if (searchInput) {
      navigation.navigate("Search result", {
        searchTerm: searchInput,
      });
    }
  }

  return (
    <>
      <View style={themedStyles.searchContainer}>
        <TextInput
          style={themedStyles.searchInput}
          placeholder="Search..."
          placeholderTextColor={"gray"}
          onChangeText={(newText) => setSearchInput(newText)}
          onSubmitEditing={(event) => handleSearch()}
        />
        <Feather
          name="search"
          size={24}
          color="gray"
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={1}
          style={themedStyles.searchIcon}
          onPress={handleSearch}
        />
      </View>
      <Tab.Navigator
        style={{ backgroundColor: theme.primaryBackgroundColor }}
        screenOptions={{
          tabBarLabelStyle: {
            color: theme.primaryTextColor,
          },
          tabBarStyle: {
            backgroundColor: theme.primaryBackgroundColor,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.primaryTextColor,
          },
          lazy: true,
          lazyPlaceholder: () => <LoadingIndicator />,
        }}
      >
        <Tab.Screen name="Recommended" component={RecommendedView} />
        <Tab.Screen name="Top Ranked" component={TopRankedView} />
      </Tab.Navigator>
    </>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    searchContainer: {
      paddingHorizontal: "5%",
      position: "relative",
      backgroundColor: theme.primaryBackgroundColor,
    },
    searchInput: {
      backgroundColor: theme.formInputColor,
      color: theme.primaryTextColor,
      fontSize: 18,
      marginVertical: 5,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    searchIcon: {
      position: "absolute",
      right: "9%",
      top: 18,
    },
  });

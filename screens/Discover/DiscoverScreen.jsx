import { View, Text, TextInput, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecommendedView from "../../components/Discover/RecommendedView";
import ForYouView from "../../components/Discover/ForYouView";
import TopRankedView from "../../components/Discover/TopRankedView";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

const Tab = createMaterialTopTabNavigator();

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  return (
    <>
      <View style={themedStyles.searchContainer}>
        <TextInput
          style={themedStyles.searchInput}
          placeholder="Search..."
          placeholderTextColor={"gray"}
        />
        <Feather
          name="search"
          size={24}
          color="gray"
          style={themedStyles.searchIcon}
        />
      </View>
      <Tab.Navigator
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
        }}
      >
        <Tab.Screen name="Recommended" component={RecommendedView} />
        <Tab.Screen name="For You" component={ForYouView} />
        <Tab.Screen name="Top Ranked" component={TopRankedView} />
      </Tab.Navigator>
    </>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    searchContainer: {
      backgroundColor: theme.primaryBackgroundColor,
      paddingHorizontal: "5%",
      position: "relative",
    },
    searchInput: {
      backgroundColor: "#34373E",
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

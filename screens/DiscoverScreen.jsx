import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecommendedView from "../components/Discover/RecommendedView";
import ForYouView from "../components/Discover/ForYouView";
import TopRankedView from "../components/Discover/TopRankedView";

const Tab = createMaterialTopTabNavigator();

export default function DiscoverScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recommended" component={RecommendedView} />
      <Tab.Screen name="For You" component={ForYouView} />
      <Tab.Screen name="Top Ranked" component={TopRankedView} />
    </Tab.Navigator>
  );
}

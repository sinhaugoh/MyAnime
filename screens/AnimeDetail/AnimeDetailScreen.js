import { StyleSheet, ScrollView, View } from "react-native";
import TopSection from "../../components/AnimeDetail/TopSection";
import MiddleSection from "../../components/AnimeDetail/MiddleSection";
import ThemedView from "../../components/shared/ThemedView";
import CharactersSection from "../../components/AnimeDetail/CharactersSection";
import RecommendedSection from "../../components/AnimeDetail/RecommendedSection";

export default function AnimeDetailScreen({ route }) {
  const { mal_id } = route.params;
  console.log("anime detail screen rendered");
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TopSection route={route} />
        <MiddleSection route={route} />
        <CharactersSection mal_id={mal_id} />
        <RecommendedSection mal_id={mal_id} />
        <View style={styles.spacer}></View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  spacer: {
    height: 50,
  },
});

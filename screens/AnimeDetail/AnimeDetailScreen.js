import { StyleSheet, ScrollView, View } from "react-native";
import TopSection from "../../components/AnimeDetail/TopSection";
import MiddleSection from "../../components/AnimeDetail/MiddleSection";
import ThemedView from "../../components/shared/ThemedView";
import CharactersSection from "../../components/AnimeDetail/CharactersSection";
import RecommendedSection from "../../components/AnimeDetail/RecommendedSection";

export default function AnimeDetailScreen({ route }) {
  const {
    mal_id,
    title,
    japaneseTitle,
    genres,
    synopsis,
    image_url,
    type,
    episodes,
    year,
    studios,
    ageRating,
    rank,
    rating,
  } = route.params;

  console.log("anime detail screen rendered");
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TopSection
          image_url={image_url}
          type={type}
          episodes={episodes}
          year={year}
          studios={studios}
          ageRating={ageRating}
          rank={rank}
          rating={rating}
        />
        <MiddleSection
          title={title}
          japaneseTitle={japaneseTitle}
          genres={genres}
          synopsis={synopsis}
        />
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

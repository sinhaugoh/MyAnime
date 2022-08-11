import { StyleSheet, ScrollView } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import AnimeDetail from "../../components/shared/AnimeDetail";

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

  return (
    <ThemedView style={styles.container}>
      <AnimeDetail
        mal_id={mal_id}
        title={title}
        japaneseTitle={japaneseTitle}
        genres={genres}
        synopsis={synopsis}
        image_url={image_url}
        type={type}
        episodes={episodes}
        year={year}
        studios={studios}
        ageRating={ageRating}
        rank={rank}
        rating={rating}
      />
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

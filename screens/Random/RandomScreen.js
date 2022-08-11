import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import AnimeDetail from "../../components/shared/AnimeDetail";
import { useState, useEffect } from "react";
import ThemedText from "../../components/shared/ThemedText";
import { JikanApi } from "../../services/JikanApi";

export default function RandomScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [animeData, setAnimeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await fetchRandomAnime();
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function fetchRandomAnime() {
    let shouldFetch = true;
    let data;

    while (shouldFetch) {
      data = await JikanApi.fetchRandomAnime();
      const ageRating = data.data.rating;

      // refetch random anime if it is pg 18+
      if (ageRating !== "R+ - Mild Nudity" && ageRating !== "Rx - Hentai") {
        setAnimeData(data.data);
        shouldFetch = false;
      }
    }
  }

  async function handleRefreshButton() {
    try {
      setIsLoading(true);
      await fetchRandomAnime();
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  if (error) return <ThemedText>{error}</ThemedText>;

  return (
    <ThemedView style={styles.container}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <AnimeDetail
          mal_id={animeData.mal_id}
          title={animeData.title}
          japaneseTitle={animeData.title_japanese}
          genres={animeData.genres.map((genre) => genre.name)}
          synopsis={animeData.synopsis}
          image_url={animeData.images.jpg.image_url}
          type={animeData.type}
          episodes={animeData.episodes}
          year={animeData.year}
          studios={animeData.studios}
          ageRating={animeData.rating}
          rank={animeData.rank}
          rating={animeData.score}
        />
      )}
      <TouchableOpacity onPress={handleRefreshButton} style={styles.button}>
        <Text style={styles.buttonText}>Randomise</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  spacer: {
    height: 80,
  },
  button: {
    borderRadius: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    width: "50%",
    padding: "5%",
    position: "absolute",
    bottom: 10,
  },
  buttonText: {
    textAlign: "center",
  },
});

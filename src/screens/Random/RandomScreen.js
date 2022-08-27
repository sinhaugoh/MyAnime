import React from "react";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThemedView from "../../components/shared/ThemedView";
import AnimeDetail from "../../components/shared/AnimeDetail";
import { useState, useEffect, useLayoutEffect } from "react";
import ThemedText from "../../components/shared/ThemedText";
import { JikanApi } from "../../services/JikanApi";
import { useFavouriteAnimes } from "../../contexts/FavouriteAnimesContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function RandomScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [animeData, setAnimeData] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { favouriteAnimes, toggleFavouriteAnime, isFavouriteAnime } =
    useFavouriteAnimes();

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
      setAnimeData(null);
      setIsLoading(true);
      await fetchRandomAnime();
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  useLayoutEffect(() => {
    // favourite button
    navigation.setOptions(
      {
        headerRight: () =>
          animeData ? (
            isFavouriteAnime(animeData.mal_id) ? (
              <MaterialIcons.Button
                name="favorite"
                size={24}
                color={theme.primaryTextColor}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={1}
                onPress={() =>
                  toggleFavouriteAnime(
                    animeData.mal_id,
                    animeData.title,
                    animeData.images.jpg.image_url
                  )
                }
              />
            ) : (
              <MaterialIcons.Button
                name="favorite-outline"
                size={24}
                color={theme.primaryTextColor}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={1}
                onPress={() =>
                  toggleFavouriteAnime(
                    animeData.mal_id,
                    animeData.title,
                    animeData.images.jpg.image_url
                  )
                }
              />
            )
          ) : (
            <MaterialIcons.Button
              name="favorite-outline"
              size={24}
              color={theme.primaryTextColor}
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={1}
            />
          ),
      },
      [navigation]
    );
  });

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
    borderRadius: 99999,
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

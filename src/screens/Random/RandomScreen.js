import React from "react";
import * as Network from "expo-network";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
  const { toggleFavouriteAnime, isFavouriteAnime } = useFavouriteAnimes();

  useEffect(() => {
    (async () => {
      try {
        await fetchRandomAnime();
      } catch (e) {
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
      // check for network connection
      const networkState = await Network.getNetworkStateAsync();
      if (networkState.isInternetReachable) {
        setIsLoading(true);
        setAnimeData(null);
        await fetchRandomAnime();
      } else {
        Alert.alert(
          "Not connected to Internet",
          "Please check your Internet connection. MyAnime requires Internet connection to serve you better.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }
    } catch (e) {
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

  if (error)
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Error occured. Please try again later.</ThemedText>
      </ThemedView>
    );

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

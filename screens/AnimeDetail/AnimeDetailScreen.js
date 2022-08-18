import React from "react";
import { useLayoutEffect } from "react";
import { StyleSheet, View, Share, Platform } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import AnimeDetail from "../../components/shared/AnimeDetail";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { useFavouriteAnimes } from "../../contexts/FavouriteAnimesContext";

export default function AnimeDetailScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { favouriteAnimes, toggleFavouriteAnime, isFavouriteAnime } =
    useFavouriteAnimes();
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
    animeUrl,
  } = route.params;

  async function onShareAnime() {
    try {
      const result = await Share.share(
        Platform.OS === "ios"
          ? {
              url: animeUrl,
            }
          : { message: animeUrl }
      );
    } catch (e) {
      console.log("AnimeDetailScreen Share.share error", e);
    }
  }

  useLayoutEffect(() => {
    // favourite button
    navigation.setOptions(
      {
        headerRight: () => (
          <View style={styles.row}>
            <MaterialIcons.Button
              name="ios-share"
              size={24}
              color={theme.primaryTextColor}
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={1}
              onPress={onShareAnime}
              style={{ marginRight: -10 }}
            />
            {isFavouriteAnime(mal_id) ? (
              <MaterialIcons.Button
                name="favorite"
                size={24}
                color={theme.primaryTextColor}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={1}
                onPress={() => toggleFavouriteAnime(mal_id, title, image_url)}
              />
            ) : (
              <MaterialIcons.Button
                name="favorite-outline"
                size={24}
                color={theme.primaryTextColor}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={1}
                onPress={() => toggleFavouriteAnime(mal_id, title, image_url)}
              />
            )}
          </View>
        ),
      },
      [navigation]
    );
  });

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
  row: {
    flexDirection: "row",
  },
});

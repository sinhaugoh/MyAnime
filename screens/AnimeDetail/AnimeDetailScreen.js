import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { StyleSheet, ScrollView } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import AnimeDetail from "../../components/shared/AnimeDetail";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import useAsyncStorage from "../../hooks/useAsyncStorage";

export default function AnimeDetailScreen({ route, navigation }) {
  const { theme } = useTheme();
  const [favouriteAnimes, setFavouriteAnimes, hasRetrievedFavouriteAnimes] =
    useAsyncStorage("@favouriteAnimes", useRef([]).current);
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
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => console.log("rendered"));

  function handleFavouriteButtonOnPress() {
    if (isFavourite) {
      // filter out the current anime from favouriteAnimes
      setFavouriteAnimes(
        favouriteAnimes.filter((anime) => anime.mal_id != mal_id)
      );
      setIsFavourite(false);
    } else {
      // append the anime to favouriteAnimes
      setFavouriteAnimes([...favouriteAnimes, { mal_id: mal_id }]);
      setIsFavourite(true);
    }
  }

  useEffect(() => {
    // check whether the anime is the user's favourite when retrieved favouriteAnimes
    if (hasRetrievedFavouriteAnimes) {
      for (const favouriteAnime of favouriteAnimes) {
        if (favouriteAnime.mal_id === mal_id) {
          setIsFavourite(true);
          return;
        }
      }
    }
  }, [hasRetrievedFavouriteAnimes]);

  useLayoutEffect(() => {
    // favourite button
    navigation.setOptions(
      {
        headerRight: () =>
          isFavourite ? (
            <MaterialIcons.Button
              name="favorite"
              size={24}
              color={theme.primaryTextColor}
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={1}
              onPress={handleFavouriteButtonOnPress}
            />
          ) : (
            <MaterialIcons.Button
              name="favorite-outline"
              size={24}
              color={theme.primaryTextColor}
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={1}
              onPress={handleFavouriteButtonOnPress}
            />
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
});

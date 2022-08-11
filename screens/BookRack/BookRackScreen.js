import { View, StyleSheet, ScrollView, SectionList } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import { useFavouriteAnimes } from "../../contexts/FavouriteAnimesContext";
import BookRackTile from "../../components/BookRack/BookRackTile";
import { categories } from "../../const";
import ThemedText from "../../components/shared/ThemedText";
import { useTheme } from "../../contexts/ThemeContext";

import { useRef, useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function BookRackScreen() {
  const { favouriteAnimes } = useFavouriteAnimes();
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  const [categorisedFavouriteAnimes, setCategorisedFavouriteAnimes] =
    useState(null);

  // categories favourite animes
  useEffect(() => {
    // let categorisedFavAnime = {};
    // for (const favouriteAnime of favouriteAnimes) {
    //   if (categorisedFavAnime[favouriteAnime.category]) {
    //     // if category exist
    //     categorisedFavAnime[favouriteAnime.category].push(favouriteAnime);
    //   } else {
    //     // if category does not exist yet
    //     categorisedFavAnime[favouriteAnime.category] = [favouriteAnime];
    //   }
    // }

    let categorisedFavAnime = [];
    for (const favouriteAnime of favouriteAnimes) {
      const categoryIndex = categorisedFavAnime.findIndex(
        (element) => element.category === favouriteAnime.category
      );

      if (categoryIndex >= 0) {
        // found such category, append the current into data
        categorisedFavAnime[categoryIndex] = {
          ...categorisedFavAnime[categoryIndex],
          data: [...categorisedFavAnime[categoryIndex].data, favouriteAnime],
        };
      } else {
        // does not found such category, create new category
        categorisedFavAnime.push({
          category: favouriteAnime.category,
          data: [favouriteAnime],
        });
      }
    }

    setCategorisedFavouriteAnimes(categorisedFavAnime);
  }, [favouriteAnimes]);
  console.log("categorisedFavouriteAnimes", categorisedFavouriteAnimes);

  if (!categorisedFavouriteAnimes)
    return <ThemedText>You have not favourite any anime yet!</ThemedText>;

  return (
    <ThemedView style={themedStyles.container}>
      <SectionList
        sections={categorisedFavouriteAnimes}
        renderItem={({ item }) => (
          <BookRackTile
            key={item.mal_id}
            title={item.title}
            image_url={item.image_url}
            style={themedStyles.tile}
          />
        )}
        renderSectionHeader={({ section: { category } }) => (
          <View style={themedStyles.header}>
            <ThemedText style={themedStyles.headerText}>{category}</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tile: {
      paddingHorizontal: 8,
    },
    header: {
      backgroundColor: theme.secondaryBackgroundColor,
      paddingHorizontal: 8,
      paddingVertical: 12,
      marginBottom: 8,
    },
    headerText: {
      fontSize: RFPercentage(3),
      fontWeight: "500",
    },
  });

import { View, StyleSheet, ScrollView, SectionList } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import { useFavouriteAnimes } from "../../contexts/FavouriteAnimesContext";
import FavouriteListTile from "../../components/Favourites/FavouriteListTile";
import { categories } from "../../const";
import ThemedText from "../../components/shared/ThemedText";
import ProgressFormModal from "../../components/Favourites/ProgressFormModal";
import { useTheme } from "../../contexts/ThemeContext";

import { useRef, useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function FavouritesScreen() {
  const { favouriteAnimes } = useFavouriteAnimes();
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMalId, setModalMalId] = useState(null);

  const [categorisedFavouriteAnimes, setCategorisedFavouriteAnimes] =
    useState(null);

  function editButtonPressedCallback(mal_id) {
    setModalMalId(mal_id);
    setIsModalVisible(true);
  }

  function closeModalCallback() {
    setIsModalVisible(false);
  }

  // categories favourite animes
  useEffect(() => {
    let categorisedFavAnime = [];
    // initialise categories
    for (category of categories) {
      categorisedFavAnime.push({
        category: category,
        data: [],
      });
    }

    for (const favouriteAnime of favouriteAnimes) {
      const categoryIndex = categorisedFavAnime.findIndex(
        (element) => element.category === favouriteAnime.category
      );

      if (categoryIndex >= 0) {
        // append the current anime
        categorisedFavAnime[categoryIndex] = {
          ...categorisedFavAnime[categoryIndex],
          data: [...categorisedFavAnime[categoryIndex].data, favouriteAnime],
        };
      }
    }

    setCategorisedFavouriteAnimes(categorisedFavAnime);
  }, [favouriteAnimes]);

  if (!categorisedFavouriteAnimes)
    return <ThemedText>You have not favourite any anime yet!</ThemedText>;

  return (
    <>
      <ThemedView style={themedStyles.container}>
        <SectionList
          sections={categorisedFavouriteAnimes}
          renderItem={({ item }) => (
            <FavouriteListTile
              key={item.mal_id}
              mal_id={item.mal_id}
              title={item.title}
              image_url={item.image_url}
              episode={item.episode}
              rating={item.rating}
              note={item.note}
              style={themedStyles.tile}
              editButtonPressedCallback={editButtonPressedCallback}
            />
          )}
          renderSectionHeader={({ section: { category } }) => (
            <View style={themedStyles.header}>
              <ThemedText style={themedStyles.headerText}>
                {category}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>
      <ProgressFormModal
        visible={isModalVisible}
        mal_id={modalMalId}
        onRequestClose={() => setIsModalVisible(false)}
        closeModalCallback={closeModalCallback}
      />
    </>
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

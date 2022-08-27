import React from "react";
import { View, StyleSheet, SectionList } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
import { useFavouriteAnimes } from "../../contexts/FavouriteAnimesContext";
import FavouriteListTile from "../../components/Favourites/FavouriteListTile";
import { categoriseFavouriteAnimes } from "../../utils";
import ThemedText from "../../components/shared/ThemedText";
import ProgressFormModal from "../../components/Favourites/ProgressFormModal";
import { useTheme } from "../../contexts/ThemeContext";

import { useState, useEffect } from "react";
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
    setCategorisedFavouriteAnimes(categoriseFavouriteAnimes(favouriteAnimes));
  }, [favouriteAnimes]);

  if (!categorisedFavouriteAnimes)
    return (
      <ThemedView style={themedStyles.container}>
        <ThemedText>You have not favourite any anime yet!</ThemedText>
      </ThemedView>
    );

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

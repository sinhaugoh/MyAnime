import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

export function CardTile({ image_url, title, animeUrl }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Anime web view", { animeUrl: animeUrl })
      }
    >
      <Image style={styles.image} source={{ uri: image_url }} />
      <ThemedText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    width: 150,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 1.5,
    resizeMode: "cover",
    marginBottom: 8,
  },
  title: {
    fontSize: RFPercentage(2),
  },
});

export const MemoizedCardTile = React.memo(CardTile);

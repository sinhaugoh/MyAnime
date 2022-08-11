import { View, Text } from "react-native";
import { useRef, useEffect } from "react";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { useFavouriteAnimes } from "../../contexts/FavouriteAnimesContext";

export default function BookRackScreen() {
  const { favouriteAnimes } = useFavouriteAnimes();
  return (
    <View>
      {favouriteAnimes.map((favouriteAnime) => (
        <Text>{favouriteAnime.mal_id}</Text>
      ))}
    </View>
  );
}

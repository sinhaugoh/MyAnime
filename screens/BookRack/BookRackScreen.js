import { View, Text } from "react-native";
import { useRef, useEffect } from "react";
import useAsyncStorage from "../../hooks/useAsyncStorage";
export default function BookRackScreen() {
  const [favouriteAnimes, setFavouriteAnimes, hasRetrievedFavouriteAnimes] =
    useAsyncStorage("@favouriteAnimes", useRef([]).current);

  useEffect(() => {
    console.log("book rack anime changed");
  }, [favouriteAnimes]);

  return (
    <View>
      {hasRetrievedFavouriteAnimes &&
        favouriteAnimes.map((favouriteAnime) => (
          <Text>{favouriteAnime.mal_id}</Text>
        ))}
    </View>
  );
}

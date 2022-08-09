import ThemedText from "../shared/ThemedText";
import { FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MemoizedCardTile } from "../shared/CardTile";
import { JikanApi } from "../../services/JikanApi";
import { RFPercentage } from "react-native-responsive-fontsize";
import LoadingIndicator from "../shared/LoadingIndicator";

export default function CharactersSection({ mal_id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await JikanApi.fetchAnimeCharacters(mal_id);
        setCharactersData(data.data);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <LoadingIndicator />;

  if (error) return <ThemedText />;

  return (
    <>
      <ThemedText style={styles.title}>Characters</ThemedText>
      <FlatList
        data={charactersData}
        renderItem={({ item }) => (
          <MemoizedCardTile
            image_url={item.character.images.jpg.image_url}
            title={item.character.name}
          />
        )}
        horizontal={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: RFPercentage(2),
    marginBottom: 4,
  },
});

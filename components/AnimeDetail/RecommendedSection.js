import ThemedText from "../shared/ThemedText";
import { FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MemoizedCardTile } from "../shared/CardTile";
import { JikanApi } from "../../services/JikanApi";
import { RFPercentage } from "react-native-responsive-fontsize";
import LoadingIndicator from "../shared/LoadingIndicator";

export default function RecommendedSection({ mal_id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendationsData, setRecommendationsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await JikanApi.fetchRecommendedAnime(mal_id);
        setRecommendationsData(data.data);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <LoadingIndicator />;

  // TODO: implement error page
  if (error) return <ThemedText />;

  return (
    <>
      <ThemedText style={styles.title}>Recommended</ThemedText>
      <FlatList
        data={recommendationsData}
        renderItem={({ item }) => (
          <MemoizedCardTile
            image_url={item.entry.images.jpg.image_url}
            title={item.entry.title}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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

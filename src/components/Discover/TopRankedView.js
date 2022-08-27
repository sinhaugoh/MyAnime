import React from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MemoizedAnimeTile } from "./AnimeTile";
import ThemedText from "../shared/ThemedText";
import LoadingIndicator from "../shared/LoadingIndicator";
import { JikanApi } from "../../services/JikanApi";

export default function TopRankedView() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  function fetchNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    if (hasNextPage) {
      (async function () {
        try {
          const data = await JikanApi.fetchTopRankedAnime(page);
          // append the data into data list
          setData((prevData) => [...prevData, ...data.data]);
          setHasNextPage(data.pagination.has_next_page);
        } catch (e) {
          setError(e);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [page, hasNextPage]);

  if (isLoading) return <LoadingIndicator />;

  if (error)
    return (
      <View style={themedStyles.container}>
        <ThemedText>Error fetching data from the API</ThemedText>
      </View>
    );

  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({ item }) => (
        <MemoizedAnimeTile
          mal_id={item.mal_id}
          title={item.title}
          japaneseTitle={item.title_japanese}
          image_url={item.images.jpg.image_url}
          type={item.type}
          episodes={item.episodes}
          year={item.year}
          studios={item.studios}
          ageRating={item.rating}
          rating={item.score}
          rank={item.rank}
          genres={item.genres.map((genre) => genre.name)}
          synopsis={item.synopsis}
          animeUrl={item.url}
        />
      )}
      style={themedStyles.container}
      ListFooterComponent={
        hasNextPage ? (
          LoadingIndicator
        ) : (
          <Text style={themedStyles.theEndText}>You have reach the end</Text>
        )
      }
      onEndReachedThreshold={0}
      onEndReached={hasNextPage ? fetchNextPage : null}
    />
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackgroundColor,
    },
    theEndText: {
      color: theme.primaryTextColor,
      textAlign: "center",
      marginVertical: 5,
    },
  });

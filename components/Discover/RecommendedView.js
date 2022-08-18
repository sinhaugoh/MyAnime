import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MemoizedAnimeTile } from "./AnimeTile";
import LoadingIndicator from "../shared/LoadingIndicator";
import { JikanApi } from "../../services/JikanApi";
import { useSettings } from "../../contexts/SettingsContext";

export default function RecommendedView() {
  const { theme } = useTheme();
  const { genreExcludesPreferences } = useSettings();
  const themedStyle = styles(theme);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isRefetch = useRef(false);

  function fetchNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  async function onRefresh() {
    setPage(-1);
    setRefreshing(true);
    isRefetch.current = true;
  }

  useEffect(() => {
    if (isRefetch.current) {
      (async function () {
        try {
          const data = await JikanApi.fetchAiringAnime(
            1,
            genreExcludesPreferences
          );
          setData(data.data);
          setPage(1);
          setHasNextPage(data.pagination.has_next_page);
        } catch (e) {
          setError(e);
        } finally {
          setRefreshing(false);
          isRefetch.current = false;
        }
      })();
    } else {
      if (hasNextPage) {
        (async function () {
          try {
            const data = await JikanApi.fetchAiringAnime(
              page,
              genreExcludesPreferences
            );
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
    }
  }, [page]);

  if (isLoading) return <LoadingIndicator />;

  //TODO: implement error screen
  if (error) return <Text>Error fetching data from the API</Text>;

  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
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
      style={themedStyle.container}
      ListFooterComponent={
        hasNextPage ? (
          LoadingIndicator
        ) : (
          <Text style={themedStyle.theEndText}>You have reach the end</Text>
        )
      }
      onEndReachedThreshold={0.2}
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

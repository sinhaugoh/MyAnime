import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import AnimeTile from "./AnimeTile";
import LoadingIndicator from "../shared/LoadingIndicator";

export default function RecommendedView() {
  const { theme } = useTheme();
  const themedStyle = styles(theme);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  async function fetchAiringAnime(page) {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter='airing'&limit=24&page=${page}`
    );
    return await response.json();
  }

  function fetchNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    if (hasNextPage) {
      (async function () {
        try {
          const data = await fetchAiringAnime(page);
          // const formattedData = data.data.map((anime) => {
          //   return {
          //     mal_id: anime.mal_id,
          //     title: anime.title_english,
          //     image_url: anime.images.jpg.image_url,
          //   };
          // });

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

  //TODO: implement error screen
  if (error) return <Text>Error fetching data from the API</Text>;

  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({ item }) => (
        <AnimeTile title={item.title} image_url={item.images.jpg.image_url} />
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
    },
  });

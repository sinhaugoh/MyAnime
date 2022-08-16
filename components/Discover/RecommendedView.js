import { StyleSheet, Text, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import AnimeTile from "./AnimeTile";
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

  function fetchNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
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
  }, [page, hasNextPage]);

  if (isLoading) return <LoadingIndicator />;

  //TODO: implement error screen
  if (error) return <Text>Error fetching data from the API</Text>;

  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({ item }) => (
        <AnimeTile
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

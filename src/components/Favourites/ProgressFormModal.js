import React from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ThemedView from "../shared/ThemedView";
import ThemedText from "../shared/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useEffect, useRef, useState } from "react";
import { JikanApi } from "../../services/JikanApi";
import LoadingIndicator from "../shared/LoadingIndicator";
import RNPickerSelect from "react-native-picker-select";
import { useFavouriteAnimes } from "../../contexts/FavouriteAnimesContext";
import { ratings, categories } from "../../const";

export default function ProgressFormModal(props) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const isFirstRun = useRef(true);
  const [animeData, setAnimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favouriteAnimes, updateFavouriteAnime } = useFavouriteAnimes();

  const [formState, setFormState] = useState({
    episodeValue: "1",
    ratingValue: "0",
    categoryValue: categories[0],
  });
  const [episodeItems, setEpisodeItems] = useState([]);

  function handleModalOnShow() {
    // get progress
    const animeLocalData = favouriteAnimes.find(
      (ele) => ele.mal_id === props.mal_id
    );
    // initialise form state
    setFormState({
      episodeValue: animeLocalData.episode ?? "1",
      ratingValue: animeLocalData.rating ?? "0",
      categoryValue: animeLocalData.category,
      noteValue: animeLocalData.note ?? "",
    });
  }

  function handleOnSave() {
    updateFavouriteAnime(
      props.mal_id,
      formState.episodeValue,
      formState.ratingValue,
      formState.noteValue,
      formState.categoryValue
    );
    props.closeModalCallback();
  }

  useEffect(() => {
    // skip first run of useEffect because mal_id will be null
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      // fetch anime data to retrieve latest episode count
      (async () => {
        try {
          setIsLoading(true);
          const data = await JikanApi.fetchAnimeById(props.mal_id);
          setAnimeData(null);
          setAnimeData(data.data);

          // create dropdown items for episodes
          let tempEpisodeItems = [];
          if (data.data.episodes) {
            for (let i = 1; i < parseInt(data.data.episodes) + 1; i++) {
              tempEpisodeItems.push({
                label: i.toString(),
                value: i.toString(),
              });
            }
          } else {
            // set the episode items to have at least episode 1 if episodes is null
            tempEpisodeItems.push({ label: "1", value: "1" });
          }

          setEpisodeItems(tempEpisodeItems);
        } catch (e) {
          console.error("ProgressFormModal fetchAnimeById error:", e);
          setError(null);
          setError(e);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [props.mal_id]);

  return (
    <Modal
      {...props}
      onShow={handleModalOnShow}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <ThemedView style={themedStyles.container}>
        <View style={themedStyles.header}>
          <TouchableOpacity onPress={props.closeModalCallback}>
            <Text style={themedStyles.headerButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnSave}>
            <Text style={themedStyles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <ThemedText style={themedStyles.title}>
              {animeData.title ?? null}
            </ThemedText>
            <ThemedText style={themedStyles.label}>Episode</ThemedText>
            <RNPickerSelect
              onValueChange={(value) =>
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    episodeValue: value,
                  };
                })
              }
              placeholder={{}}
              items={episodeItems}
              value={formState.episodeValue}
              Icon={() => (
                <AntDesign
                  name="caretdown"
                  size={15}
                  color={theme.primaryTextColor}
                />
              )}
              style={{
                ...pickerStyle(theme),
                iconContainer: {
                  top: 15,
                  right: 10,
                },
              }}
            />
            <ThemedText style={themedStyles.label}>My rating</ThemedText>
            <RNPickerSelect
              onValueChange={(value) =>
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    ratingValue: value,
                  };
                })
              }
              placeholder={{}}
              items={ratings.map((rating) => {
                return {
                  label: rating,
                  value: rating,
                };
              })}
              value={formState.ratingValue}
              Icon={() => (
                <AntDesign
                  name="caretdown"
                  size={15}
                  color={theme.primaryTextColor}
                />
              )}
              style={{
                ...pickerStyle(theme),
                iconContainer: {
                  top: 15,
                  right: 10,
                },
              }}
            />
            <ThemedText style={themedStyles.label}>Category</ThemedText>
            <RNPickerSelect
              onValueChange={(value) =>
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    categoryValue: value,
                  };
                })
              }
              placeholder={{}}
              items={categories.map((category) => {
                return { label: category, value: category };
              })}
              value={formState.categoryValue}
              Icon={() => (
                <AntDesign
                  name="caretdown"
                  size={15}
                  color={theme.primaryTextColor}
                />
              )}
              style={{
                ...pickerStyle(theme),
                iconContainer: {
                  top: 15,
                  right: 10,
                },
              }}
            />
            <ThemedText style={themedStyles.label}>Note</ThemedText>
            <TextInput
              onChangeText={(value) =>
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    noteValue: value,
                  };
                })
              }
              value={formState.noteValue}
              style={themedStyles.textInput}
            />
          </>
        )}
      </ThemedView>
    </Modal>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerButtonText: {
      color: theme.linkColor,
      fontSize: RFPercentage(2),
    },
    title: {
      textAlign: "center",
      fontSize: RFPercentage(2),
    },
    label: {
      marginBottom: 4,
    },
    textInput: {
      color: theme.primaryTextColor,
      borderColor: "gray",
      borderWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 10,
    },
  });

const pickerStyle = (theme) =>
  StyleSheet.create({
    inputIOS: {
      fontSize: RFPercentage(2),
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      color: theme.primaryTextColor,
      marginBottom: 8,
    },
    inputAndroid: {
      fontSize: RFPercentage(2),
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "purple",
      color: theme.primaryTextColor,
      marginBottom: 8,
    },
  });

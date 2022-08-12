import { Text, View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import ThemedView from "../shared/ThemedView";
import ThemedText from "../shared/ThemedText";
import { useTheme } from "../../contexts/ThemeContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useEffect, useState } from "react";
import { JikanApi } from "../../services/JikanApi";
import LoadingIndicator from "../shared/LoadingIndicator";

export default function ProgressFormModal(props) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const [animeData, setAnimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch anime data to retrieve latest episode count
    (async () => {
      try {
        setIsLoading(true);
        const data = await JikanApi.fetchAnimeById(props.mal_id);
        setAnimeData(null);
        setAnimeData(data.data);
      } catch (e) {
        console.error("ProgressFormModal fetchAnimeById error:", e);
        setError(null);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [props.mal_id]);

  console.log("animeData", animeData);

  return (
    <Modal {...props} animationType="slide" presentationStyle="formSheet">
      <ThemedView style={themedStyles.container}>
        <View style={themedStyles.header}>
          <TouchableOpacity onPress={props.closeModalCallback}>
            <Text style={themedStyles.headerButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={themedStyles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ThemedText>{props.mal_id}</ThemedText>
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
      fontSize: RFPercentage(3),
    },
  });

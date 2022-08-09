import { StyleSheet, ScrollView } from "react-native";
import TopSection from "../../components/AnimeDetail/TopSection";
import MiddleSection from "../../components/AnimeDetail/MiddleSection";
import ThemedView from "../../components/shared/ThemedView";

export default function AnimeDetailScreen({ route }) {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TopSection route={route} />
        <MiddleSection route={route} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 15,
    paddingHorizontal: 15,
    marginBottom: 80,
  },
});

import { View, Text, StyleSheet } from "react-native";
import ThemedView from "../shared/ThemedView";

export default function ForYouView() {
  return (
    <ThemedView style={styles.container}>
      <Text>For you</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

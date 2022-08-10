import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ThemedView from "../../components/shared/ThemedView";
export default function RandomScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text>Random</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { View, StyleSheet } from "react-native";
import ThemedText from "../shared/ThemedText";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function MiddleSection({
  title,
  japaneseTitle,
  genres,
  synopsis,
}) {
  return (
    <View>
      <ThemedText style={styles.header}>{title}</ThemedText>
      <ThemedText style={styles.subheader}>{japaneseTitle}</ThemedText>
      <ThemedText style={styles.boldText}>Genre</ThemedText>
      <ThemedText style={styles.text}>{genres.join(" • ")}</ThemedText>
      <ThemedText style={styles.boldText}>Synopsis</ThemedText>
      <ThemedText style={styles.text}>{synopsis}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: RFPercentage(3),
    fontWeight: "700",
  },
  subheader: {
    fontSize: RFPercentage(2.8),
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "700",
    fontSize: RFPercentage(2),
  },
  text: {
    fontSize: RFPercentage(2),
    marginBottom: 8,
  },
});

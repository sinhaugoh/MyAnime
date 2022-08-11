import ThemedView from "../shared/ThemedView";
import ThemedText from "../shared/ThemedText";
import { Image, StyleSheet, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function BookRackTile({
  title,
  image_url,
  style,
  progress,
  myRating,
  note,
}) {
  return (
    <ThemedView style={[style, styles.container]}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <View style={styles.middle}>
        <ThemedText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </ThemedText>
        <View style={styles.row}>
          <View style={styles.col}>
            <ThemedText style={styles.boldText}>Progress</ThemedText>
            <ThemedText style={styles.text}>
              {progress ? `Episode ${progress}` : "-"}
            </ThemedText>
          </View>
          <View style={styles.col}>
            <ThemedText style={styles.boldText}>My rating</ThemedText>
            <ThemedText style={styles.text}>
              {myRating ? `${myRating} / 10` : "-"}
            </ThemedText>
          </View>
        </View>
        <View style={styles.note}>
          <ThemedText style={styles.boldText}>Note to myself</ThemedText>
          <ThemedText style={styles.text}>{note ?? "-"}</ThemedText>
        </View>
      </View>
      <View style={styles.end}>
        <ThemedText>heee</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 8,
  },
  image: {
    flex: 3,
    height: 150,
  },
  middle: {
    flex: 6,
    marginLeft: 5,
    marginRight: 15,
  },
  end: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  col: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: "700",
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "700",
    fontSize: RFPercentage(2),
  },
  text: {
    fontSize: RFPercentage(2),
  },
  note: {},
});

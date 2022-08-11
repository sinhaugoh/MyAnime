import { View, StyleSheet, Image } from "react-native";
import ThemedText from "../../components/shared/ThemedText";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function TopSection({
  image_url,
  type,
  episodes,
  year,
  studios,
  ageRating,
  rank,
  rating,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Image source={{ uri: image_url }} style={styles.image} />
      </View>
      <View style={styles.right}>
        <View style={styles.row}>
          <View style={styles.col}>
            <ThemedText style={[styles.bold, styles.text]}>Type</ThemedText>
            <ThemedText style={styles.text}>{type ?? "-"}</ThemedText>
          </View>
          <View style={styles.col}>
            <ThemedText style={[styles.bold, styles.text]}>Episodes</ThemedText>
            <ThemedText style={styles.text}>{episodes ?? "-"}</ThemedText>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={styles.col}>
            <ThemedText style={[styles.bold, styles.text]}>Year</ThemedText>
            <ThemedText style={styles.text}>{year ?? "-"}</ThemedText>
          </View>
          <View style={[styles.col]}>
            <ThemedText style={[styles.bold, styles.text]}>Studio</ThemedText>
            <ThemedText numberOfLines={1} style={[styles.text]}>
              {studios?.[0]?.name ?? "-"}
            </ThemedText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <ThemedText numberOfLines={1} style={[styles.bold, styles.text]}>
              Age rating
            </ThemedText>
            <ThemedText style={styles.text}>{ageRating ?? "-"}</ThemedText>
          </View>
        </View>
        <View style={[styles.row, styles.justifyBetween]}>
          <View style={styles.col}>
            <ThemedText style={[styles.bold, styles.text]}>Rank</ThemedText>
            <ThemedText style={[styles.bigText, styles.bold]}>
              {rank ? `# ${rank}` : "-"}
            </ThemedText>
          </View>
          <View style={styles.col}>
            <ThemedText style={[styles.bold, styles.text]}>Rating</ThemedText>
            <ThemedText style={[styles.bigText, styles.bold]}>
              {rating === null || rating === undefined
                ? "-"
                : `${rating.toFixed(1)} / 10`}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

function Spacer() {
  return <View style={{ width: 40 }}></View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  col: {
    flexDirection: "column",
    flex: 1,
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 1.5,
    resizeMode: "stretch",
  },
  left: {
    flex: 3,
    marginRight: 20,
  },
  right: {
    flex: 5,
  },
  text: {
    fontSize: RFPercentage(2),
  },
  bigText: {
    fontSize: RFPercentage(3.5),
  },
  bold: {
    fontWeight: "700",
  },
});

import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import ThemedText from "../../components/shared/ThemedText";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function AnimeDetailScreen({ route }) {
  const { image_url, type, episodes, year, studios, ageRating, rank, rating } =
    route.params;
  const { theme } = useTheme();
  const themedStyle = styles(theme);

  return (
    <View style={themedStyle.container}>
      <ScrollView>
        <View style={themedStyle.row}>
          <View style={themedStyle.left}>
            <Image source={{ uri: image_url }} style={themedStyle.image} />
          </View>
          <View style={themedStyle.right}>
            <View style={themedStyle.row}>
              <View style={themedStyle.col}>
                <ThemedText style={[themedStyle.bold, themedStyle.text]}>
                  Type
                </ThemedText>
                <ThemedText style={themedStyle.text}>{type}</ThemedText>
              </View>
              <Spacer />
              <View style={themedStyle.col}>
                <ThemedText style={[themedStyle.bold, themedStyle.text]}>
                  Episodes
                </ThemedText>
                <ThemedText style={themedStyle.text}>{episodes}</ThemedText>
              </View>
            </View>
            <View style={themedStyle.row}>
              <View style={themedStyle.col}>
                <ThemedText style={[themedStyle.bold, themedStyle.text]}>
                  Year
                </ThemedText>
                <ThemedText style={themedStyle.text}>{year}</ThemedText>
              </View>
              <Spacer />
              <View style={themedStyle.col}>
                <ThemedText style={[themedStyle.bold, themedStyle.text]}>
                  Episodes
                </ThemedText>
                <ThemedText style={themedStyle.text}>
                  {studios?.[0]?.name ?? "No info"}
                </ThemedText>
              </View>
            </View>
            <View style={themedStyle.row}>
              <View style={themedStyle.col}>
                <ThemedText style={[themedStyle.bold, themedStyle.text]}>
                  Age rating
                </ThemedText>
                <ThemedText style={themedStyle.text}>{ageRating}</ThemedText>
              </View>
            </View>
            <View style={[themedStyle.row, themedStyle.justifyBetween]}>
              <View style={themedStyle.col}>
                <ThemedText style={[themedStyle.bold, themedStyle.text]}>
                  Rank
                </ThemedText>
                <ThemedText style={[themedStyle.bigText, themedStyle.bold]}>
                  # {rank}
                </ThemedText>
              </View>
              <View style={themedStyle.col}>
                <ThemedText style={[themedStyle.bold, themedStyle.text]}>
                  Rating
                </ThemedText>
                <ThemedText style={[themedStyle.bigText, themedStyle.bold]}>
                  {rating.toFixed(1)} / 10
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Spacer() {
  return <View style={{ width: 40 }}></View>;
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackgroundColor,
      padding: 12,
    },
    row: {
      flexDirection: "row",
      marginBottom: 5,
    },
    col: {
      flexDirection: "column",
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

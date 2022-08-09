import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function AnimeDetailScreen() {
  const { theme } = useTheme();
  const themedStyle = styles(theme);

  return (
    <View style={themedStyle.container}>
      <ScrollView>
        <Text>Detail</Text>
      </ScrollView>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackgroundColor,
      padding: 8,
    },
  });

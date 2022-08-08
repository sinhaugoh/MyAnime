import { View, Image, Text, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function AnimeTile({ title, image_url }) {
  const { theme } = useTheme();
  const themedStyle = styles(theme);
  return (
    <View style={themedStyle.container}>
      <Image source={{ uri: image_url }} style={themedStyle.image} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={themedStyle.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
    },
    image: {
      width: "100%",
      aspectRatio: 1 / 1.5,
      resizeMode: "stretch",
      marginBottom: 8,
    },
    title: {
      color: theme.primaryTextColor,
    },
  });

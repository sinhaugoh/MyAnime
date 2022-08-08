import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";

export default function AnimeTile({ title, image_url }) {
  const { theme } = useTheme();
  const themedStyle = styles(theme);
  const navigation = useNavigation();

  function handleOnPress() {
    navigation.navigate("Anime detail");
  }

  return (
    <TouchableOpacity
      style={themedStyle.container}
      activeOpacity={0.8}
      onPress={handleOnPress}
    >
      <Image source={{ uri: image_url }} style={themedStyle.image} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={themedStyle.title}>
        {title}
      </Text>
    </TouchableOpacity>
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

import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import React from "react";

export default function AnimeTile(props) {
  const { theme } = useTheme();
  const themedStyle = styles(theme);
  const navigation = useNavigation();

  function handleOnPress() {
    navigation.navigate("Anime detail", props);
  }

  return (
    <TouchableOpacity
      style={themedStyle.container}
      activeOpacity={0.8}
      onPress={handleOnPress}
    >
      <Image source={{ uri: props.image_url }} style={themedStyle.image} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={themedStyle.title}>
        {props.title}
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
      fontSize: RFPercentage(2.2),
    },
  });

export const MemoizedAnimeTile = React.memo(AnimeTile);

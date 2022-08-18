import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function LoadingIndicator() {
  const { theme } = useTheme();
  const themedStyle = styles(theme);
  return <ActivityIndicator size="large" style={themedStyle.container} />;
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackgroundColor,
    },
  });

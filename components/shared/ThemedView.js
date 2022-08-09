import { View, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemedView(props) {
  const { theme } = useTheme();

  return (
    <View
      {...props}
      style={[props.style, { backgroundColor: theme.primaryBackgroundColor }]}
    >
      {props.children}
    </View>
  );
}

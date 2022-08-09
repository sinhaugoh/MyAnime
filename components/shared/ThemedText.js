import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemedText(props) {
  const { theme } = useTheme();

  return (
    <Text {...props} style={[props.style, { color: theme.primaryTextColor }]}>
      {props.children}
    </Text>
  );
}

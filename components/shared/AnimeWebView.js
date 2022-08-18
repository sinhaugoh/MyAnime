import React from "react";
import { WebView } from "react-native-webview";

export default function AnimeWebView({ route }) {
  const { animeUrl } = route.params;
  return <WebView source={{ uri: animeUrl }} />;
}

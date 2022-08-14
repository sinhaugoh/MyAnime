import { useState, useContext, createContext } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { genrePreferencesKey } from "../const";
import LoadingIndicator from "../components/shared/LoadingIndicator";

const SettingsContext = createContext({});

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [
    genreExcludesPreferences,
    setGenreExcludesPreferences,
    hasRetrievedValue,
  ] = useAsyncStorage(genrePreferencesKey);

  // function excludeGenre(genre) {
  //   if (genreExcludesPreferences === undefined || genreExcludesPreferences === null) return;

  // }

  return (
    <SettingsContext.Provider
      value={{ genreExcludesPreferences, setGenreExcludesPreferences }}
    >
      {hasRetrievedValue ? children : <LoadingIndicator />}
    </SettingsContext.Provider>
  );
}
// {hasRetrievedValue ? (
//   genrePreferences === undefined || genrePreferences === null ? (
//     <PreferenceScreen />
//   ) : (
//     children
//   )
// ) : (
//   <LoadingIndicator />
// )}
import { useState, useContext, createContext } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { genrePreferencesKey } from "../const";
import LoadingIndicator from "../components/shared/LoadingIndicator";

const SettingsContext = createContext({});

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [genrePreferences, setGenrePreferences, hasRetrievedValue] =
    useAsyncStorage(genrePreferencesKey);
  return (
    <SettingsContext.Provider value={{ genrePreferences, setGenrePreferences }}>
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

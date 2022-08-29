import React from "react";
import { useContext, createContext } from "react";
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

  return (
    <SettingsContext.Provider
      value={{ genreExcludesPreferences, setGenreExcludesPreferences }}
    >
      {hasRetrievedValue ? children : <LoadingIndicator />}
    </SettingsContext.Provider>
  );
}

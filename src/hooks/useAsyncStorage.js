import React from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [hasRetrievedStoredValue, setHasRetrievedStoredValue] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        setStoredValue(JSON.parse(value) ?? initialValue);
        setHasRetrievedStoredValue(true);
      } catch (e) {
        console.error("useAsyncStorage getItem error:", e);
      }
    })();
  }, [key, initialValue]);

  const setValue = async (value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (e) {
      console.error("useAsyncStorage setItem error:", e);
    }
  };

  return [storedValue, setValue, hasRetrievedStoredValue];
}

import { useContext, createContext, useState, useEffect, useRef } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import LoadingIndicator from "../components/shared/LoadingIndicator";

const FavouriteAnimesContext = createContext({});

export function useFavouriteAnimes() {
  return useContext(FavouriteAnimesContext);
}

export function FavouriteAnimesProvider({ children }) {
  const [favouriteAnimes, setFavouriteAnimes, hasRetrievedFavouriteAnimes] =
    useAsyncStorage("@favouriteAnimes", useRef([]).current);

  function toggleFavouriteAnime(mal_id) {
    if (favouriteAnimes.find((anime) => anime.mal_id === mal_id)) {
      // filter out the current anime from favouriteAnimes
      setFavouriteAnimes(
        favouriteAnimes.filter((anime) => anime.mal_id != mal_id)
      );
    } else {
      // append the anime to favouriteAnimes
      setFavouriteAnimes([...favouriteAnimes, { mal_id: mal_id }]);
    }
  }

  const isFavouriteAnime = (mal_id) =>
    favouriteAnimes.find((anime) => anime.mal_id === mal_id) ? true : false;

  return (
    <FavouriteAnimesContext.Provider
      value={{ favouriteAnimes, toggleFavouriteAnime, isFavouriteAnime }}
    >
      {hasRetrievedFavouriteAnimes ? children : <LoadingIndicator />}
    </FavouriteAnimesContext.Provider>
  );
}

import React from "react";
import { useContext, createContext, useRef } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import LoadingIndicator from "../components/shared/LoadingIndicator";
import { favouriteAnimesKey, categories } from "../const";

const FavouriteAnimesContext = createContext({});

export function useFavouriteAnimes() {
  return useContext(FavouriteAnimesContext);
}

export function FavouriteAnimesProvider({ children }) {
  const [favouriteAnimes, setFavouriteAnimes, hasRetrievedFavouriteAnimes] =
    useAsyncStorage(favouriteAnimesKey, useRef([]).current);

  function toggleFavouriteAnime(mal_id, title, image_url) {
    if (favouriteAnimes.find((anime) => anime.mal_id === mal_id)) {
      // filter out the current anime from favouriteAnimes
      setFavouriteAnimes(
        favouriteAnimes.filter((anime) => anime.mal_id != mal_id)
      );
    } else {
      // append the anime to favouriteAnimes
      setFavouriteAnimes([
        ...favouriteAnimes,
        {
          mal_id: mal_id,
          title: title,
          image_url: image_url,
          category: categories[0],
        },
      ]);
    }
  }

  function updateFavouriteAnime(mal_id, episode, rating, note, category) {
    // update anime
    setFavouriteAnimes(
      favouriteAnimes.map((anime) => {
        if (anime.mal_id === mal_id) {
          return {
            ...anime,
            episode: episode,
            rating: rating,
            note: note,
            category: category,
          };
        } else {
          return anime;
        }
      })
    );
    // }
  }

  function removeFavouriteAnime(mal_id) {
    // filter out the current anime from favouriteAnimes
    setFavouriteAnimes(
      favouriteAnimes.filter((anime) => anime.mal_id != mal_id)
    );
  }

  const isFavouriteAnime = (mal_id) =>
    favouriteAnimes.find((anime) => anime.mal_id === mal_id) ? true : false;

  return (
    <FavouriteAnimesContext.Provider
      value={{
        favouriteAnimes,
        toggleFavouriteAnime,
        isFavouriteAnime,
        updateFavouriteAnime,
        removeFavouriteAnime,
      }}
    >
      {hasRetrievedFavouriteAnimes ? children : <LoadingIndicator />}
    </FavouriteAnimesContext.Provider>
  );
}

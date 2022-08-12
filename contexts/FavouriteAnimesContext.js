import { useContext, createContext, useState, useEffect, useRef } from "react";
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
    // const animeIndex = favouriteAnimes.findIndex(
    //   (anime) => anime.mal_id === mal_id
    // );

    // if anime can be found from local storage
    // if (animeIndex >= 0) {
    //   let updatedFavouriteAnimes = [...favouriteAnimes];
    //   updatedFavouriteAnimes[animeIndex] = {
    //     ...updatedFavouriteAnimes[animeIndex],
    //     episode: episode,
    //     rating: rating,
    //     note: note,
    //     category: category,
    //   };

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

  const isFavouriteAnime = (mal_id) =>
    favouriteAnimes.find((anime) => anime.mal_id === mal_id) ? true : false;

  // console.log(favouriteAnimes);

  return (
    <FavouriteAnimesContext.Provider
      value={{
        favouriteAnimes,
        toggleFavouriteAnime,
        isFavouriteAnime,
        updateFavouriteAnime,
      }}
    >
      {hasRetrievedFavouriteAnimes ? children : <LoadingIndicator />}
    </FavouriteAnimesContext.Provider>
  );
}

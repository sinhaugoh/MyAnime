import { fetchWithTimeout } from "../utils";
const _PAGE_LIMIT = 24;

export const JikanApi = {
  fetchAiringAnime: async (page, excluded_genre) => {
    const excluded_genre_str = excluded_genre
      ? excluded_genre.toString()
      : null;
    const response = await fetch(
      // `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=${_PAGE_LIMIT}&page=${page}`
      `https://api.jikan.moe/v4/anime?order_by=popularity&min_score=6&limit=${_PAGE_LIMIT}&page=${page}${
        excluded_genre ? "&genres_exclude=" + excluded_genre_str : ""
      }`
    );
    return await response.json();
  },
  fetchSearchResult: async (searchTerm, page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=${_PAGE_LIMIT}&page=${page}`
    );
    return await response.json();
  },
  fetchTopRankedAnime: async (page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?&limit=${_PAGE_LIMIT}&page=${page}`
    );
    return await response.json();
  },
  fetchAnimeCharacters: async (mal_id) => {
    const response = await fetchWithTimeout(
      `https://api.jikan.moe/v4/anime/${mal_id}/characters`
    );

    return await response.json();
  },
  fetchRecommendedAnime: async (mal_id) => {
    const response = await fetchWithTimeout(
      `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`
    );
    return await response.json();
  },
  fetchRandomAnime: async () => {
    const response = await fetch("https://api.jikan.moe/v4/random/anime");
    return await response.json();
  },
  fetchAnimeById: async (mal_id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
    return await response.json();
  },
  fetchGenres: async () => {
    const response = await fetch("https://api.jikan.moe/v4/genres/anime");
    return await response.json();
  },
};

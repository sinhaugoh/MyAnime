const _PAGE_LIMIT = 24;

export const JikanApi = {
  fetchAiringAnime: async (page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=${_PAGE_LIMIT}&page=${page}`
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
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${mal_id}/characters`
    );
    return await response.json();
  },
};

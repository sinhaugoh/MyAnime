import { categories } from "./const";

/** wrapper to abort the fetch request after exceeding timeout */
export async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  // abort request after timeout
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(id);
  return response;
}

export function categoriseFavouriteAnimes(favouriteAnimes) {
  let categorisedFavAnime = [];
  // initialise categories
  for (category of categories) {
    categorisedFavAnime.push({
      category: category,
      data: [],
    });
  }

  for (const favouriteAnime of favouriteAnimes) {
    // locate anime's category
    const categoryIndex = categorisedFavAnime.findIndex(
      (element) => element.category === favouriteAnime.category
    );

    if (categoryIndex >= 0) {
      // append the current anime
      categorisedFavAnime[categoryIndex] = {
        ...categorisedFavAnime[categoryIndex],
        data: [...categorisedFavAnime[categoryIndex].data, favouriteAnime],
      };
    }
  }

  return categorisedFavAnime;
}

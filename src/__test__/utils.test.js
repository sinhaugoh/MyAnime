import { categoriseFavouriteAnimes } from "../utils";

describe("categoriseFavouriteAnimes", () => {
  let defaultCategorisedAnimes = [];
  let animeData = [];

  beforeEach(() => {
    defaultCategorisedAnimes = [
      {
        category: "Newly added",
        data: [],
      },
      {
        category: "Plan to watch",
        data: [],
      },
      {
        category: "Watching",
        data: [],
      },
      {
        category: "Completed",
        data: [],
      },
      {
        category: "Dropped",
        data: [],
      },
    ];

    animeData = [
      {
        category: "Newly added",
        image_url: "test",
        mal_id: 1,
        title: "test",
      },
    ];
  });

  it("should return array of objects with correct properties if empty array is passed in", () => {
    const categorisedFavouriteAnimes = categoriseFavouriteAnimes([]);
    for (const anime of categorisedFavouriteAnimes) {
      expect(anime).toHaveProperty("category");
      expect(anime).toHaveProperty("data");
    }
  });

  it("should return array of objects with correct value if empty array is passed in", () => {
    const categorisedFavouriteAnimes = categoriseFavouriteAnimes([]);
    for (let i = 0; i < categoriseFavouriteAnimes.length; i++) {
      expect(categorisedFavouriteAnimes[i]).toEqual(
        defaultCategorisedAnimes[i]
      );
    }
  });

  it("should return defaultCategorisedAnimes if animeData with unknown category is passed in", () => {
    animeData[0].category = "unknown---";
    const categorisedFavouriteAnimes = categoriseFavouriteAnimes(animeData);
    expect(JSON.stringify(categorisedFavouriteAnimes)).toBe(
      JSON.stringify(defaultCategorisedAnimes)
    );
  });

  it("should return correct value if an anime data is passed in", () => {
    const categorisedFavouriteAnimes = categoriseFavouriteAnimes(animeData);

    //add anime data into default categorised animes
    defaultCategorisedAnimes[0].data.push(animeData[0]);

    expect(JSON.stringify(categorisedFavouriteAnimes)).toBe(
      JSON.stringify(defaultCategorisedAnimes)
    );
  });
});

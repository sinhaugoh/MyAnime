import { render, screen, act, waitFor } from "@testing-library/react-native";
import { JikanApi } from "../../../services/JikanApi";
import RecommendedView from "../RecommendedView";

jest.mock("../../../contexts/ThemeContext", () => {
  return {
    useTheme: () => {
      const theme = {
        primaryBackgroundColor: "#242C33",
        secondaryBackgroundColor: "#2C333B",
        linkColor: "#6d68e8",
        bottomTabBarColor: "#2C333B",
        primaryTextColor: "#e3e3e3",
        borderOutline: "#e3e3e3",
        formInputColor: "#34373E",
      };
      return { theme };
    },
  };
});

jest.mock("../AnimeTile", () => {
  return {
    MemoizedAnimeTile: () => <mock-animetile testID="animeTile" />,
  };
});

jest.mock("../../../services/JikanApi");

describe("<RecommendedView />", () => {
  const fixture = {
    data: [
      {
        mal_id: 1,
        title: "title",
        title_japanese: "title japanese",
        images: {
          jpg: {
            image_url: "image url",
          },
        },
        type: "type",
        episodes: 1,
        year: 1999,
        studios: ["studio"],
        rating: "rating",
        score: 1,
        rank: 1,
        genres: [{ name: "genre" }],
        synopsis: "synopsis",
        url: "url",
      },
    ],
    pagination: {
      has_next_page: true,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    JikanApi.fetchAiringAnime.mockResolvedValue(fixture);
    render(<RecommendedView />);
    await waitFor(() => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it("should call fetchAiringAnime once on render", async () => {
    JikanApi.fetchAiringAnime.mockResolvedValue(fixture);
    render(<RecommendedView />);

    await act(async () => {
      expect(JikanApi.fetchAiringAnime).toHaveBeenCalledTimes(1);
    });
  });

  it("should render children correctly", async () => {
    JikanApi.fetchAiringAnime.mockResolvedValue(fixture);
    render(<RecommendedView />);

    // first render is before the data is fetched from the API
    await act(async () => {
      expect(screen.getByAccessibilityHint("loading")).toBeTruthy();
    });

    await act(async () => {
      expect(screen.getAllByTestId("animeTile").length).toBe(1);
    });
  });
});

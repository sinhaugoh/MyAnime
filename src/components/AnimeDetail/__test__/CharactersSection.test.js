import React from "react";
import CharactersSection from "../CharactersSection";
import { JikanApi } from "../../../services/JikanApi";
import { render, act, screen, waitFor } from "@testing-library/react-native";

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

jest.mock("../../../services/JikanApi");
describe("<CharactersSection />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    render(<CharactersSection mal_id={1} />);

    await waitFor(() => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it("should render loading before the result is returned from the API", async () => {
    const { getByAccessibilityHint } = render(<CharactersSection mal_id={1} />);

    await act(async () => {
      expect(getByAccessibilityHint("loading")).toBeTruthy();
    });
  });

  it("should call fethAnimeCharacters API once when rendered", async () => {
    // JikanApi.fetchAnimeCharacters.mockResolvedValue({
    //   data: [
    //     {
    //       data: {
    //         character: {
    //           images: {
    //             jpg: {
    //               image_url: "test url",
    //             },
    //           },
    //           name: "name",
    //           animeUrl: "url",
    //         },
    //       },
    //     },
    //   ],
    // });

    render(<CharactersSection mal_id={1} />);

    await act(async () => {
      expect(JikanApi.fetchAnimeCharacters).toHaveBeenCalledTimes(1);
    });
  });
});

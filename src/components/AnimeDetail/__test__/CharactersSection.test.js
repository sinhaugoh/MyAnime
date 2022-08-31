import React from "react";
import CharactersSection from "../CharactersSection";
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

jest.mock("fetch");

describe("<CharactersSection />", () => {
  it("should match snapshot", async () => {
    render(<CharactersSection mal_id={1} />);

    await waitFor(() => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it("should render loading before the result is returned from the API", async () => {
    const { getByAccessibilityHint, debug } = render(<CharactersSection />);
    expect(getByAccessibilityHint("loading")).toBeTruthy();

    await waitFor(() => {});
  });
});

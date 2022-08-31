import { render, screen } from "@testing-library/react-native";
import MiddleSection from "../MiddleSection";

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

describe("<MiddleSection />", () => {
  const props = {
    title: "title",
    japaneseTitle: "japaneseTitle",
    genres: ["genre1"],
    synopsis: "synopsis",
  };
  it("should match snapshot", () => {
    render(<MiddleSection {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correct texts", () => {
    render(<MiddleSection {...props} />);
    expect(screen.getByText(props.title)).toBeTruthy();
    expect(screen.getByText(props.japaneseTitle)).toBeTruthy();
    expect(screen.getByText(props.synopsis)).toBeTruthy();
  });

  it("should have genre text correctly formatted", () => {
    render(<MiddleSection {...props} />);
    expect(screen.getByText(props.genres.join(" • "))).toBeTruthy();
  });
});

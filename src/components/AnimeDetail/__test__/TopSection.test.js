import TopSection from "../TopSection";
import { render, screen } from "@testing-library/react-native";

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

describe("<TopSection />", () => {
  const props = {
    image_url: "test url",
    type: "type",
    episodes: 1,
    year: 1998,
    studios: [{ name: "studio" }],
    ageRating: "age rating",
    rank: 1,
    rating: 1,
  };
  it("should match snapshot", () => {
    render(<TopSection {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render rating with 1 decimal places", () => {
    render(<TopSection {...props} />);
    expect(screen.getByText(/1.0/)).toBeTruthy();
  });

  it("should render correct text", () => {
    render(<TopSection {...props} />);
    expect(screen.getByText(props.type)).toBeTruthy();
    expect(screen.getByText(props.episodes.toString())).toBeTruthy();
    expect(screen.getByText(props.year.toString())).toBeTruthy();
    expect(screen.getByText(props.ageRating)).toBeTruthy();
    expect(screen.getByText(props.studios[0].name)).toBeTruthy();
    expect(screen.getByText(`# ${props.rank}`)).toBeTruthy();
  });
});

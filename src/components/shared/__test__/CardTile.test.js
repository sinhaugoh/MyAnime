import { render, screen, fireEvent } from "@testing-library/react-native";
import { CardTile } from "../CardTile";

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

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe("<CardTile />", () => {
  const props = {
    image_url: "image url",
    title: "title",
    animeUrl: "anime url",
  };

  it("should match snapshot", () => {
    render(<CardTile {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should navigate when on clicked", () => {
    render(<CardTile {...props} />);
    expect(mockedNavigate).toHaveBeenCalledTimes(0);
    fireEvent.press(screen.getByText(props.title));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});

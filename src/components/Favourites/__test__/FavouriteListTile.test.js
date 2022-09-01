import { render, screen, fireEvent } from "@testing-library/react-native";
import FavouriteListTile from "../FavouriteListTile";

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

const mockEditButtonPressedCallback = jest.fn();

describe("<FavouriteListTile />", () => {
  const props = {
    mal_id: 1,
    title: "title",
    image_url: "image url",
    style: {},
    episode: 1,
    rating: 5,
    note: "note",
    editButtonPressedCallback: mockEditButtonPressedCallback,
  };
  it("should match snapshot", () => {
    render(<FavouriteListTile {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correct texts", () => {
    render(<FavouriteListTile {...props} />);

    expect(screen.getByText(props.title)).toBeTruthy();
    expect(screen.getByText(`Episode ${props.episode}`)).toBeTruthy();
    expect(screen.getByText(`${props.rating} / 10`)).toBeTruthy();
    expect(screen.getByText(props.note));
  });

  it("should trigger editButtonPressedCallback if edit button pressed", () => {
    render(<FavouriteListTile {...props} />);

    expect(mockEditButtonPressedCallback).toHaveBeenCalledTimes(0);
    fireEvent.press(screen.getByLabelText("edit"));

    expect(mockEditButtonPressedCallback).toHaveBeenCalledTimes(1);
  });
});

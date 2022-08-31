import { render, screen, fireEvent } from "@testing-library/react-native";
import AnimeTile from "../AnimeTile";

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

describe("<AnimeTile />", () => {
  const props = {
    title: "title",
    image_url: "image url",
  };

  beforeEach(() => {
    render(<AnimeTile {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render correct text", () => {
    expect(screen.getByText(props.title)).toBeTruthy();
  });

  it("should navigate if it is pressed", () => {
    expect(mockedNavigate).toHaveBeenCalledTimes(0);
    fireEvent.press(screen.getByText(props.title));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});

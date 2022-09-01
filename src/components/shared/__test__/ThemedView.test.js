import { render, screen } from "@testing-library/react-native";
import ThemedView from "../ThemedView";

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

describe("<ThemedView />", () => {
  it("should match snapshot", () => {
    render(<ThemedView />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

import { render, screen } from "@testing-library/react-native";
import LoadingIndicator from "../LoadingIndicator";

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

describe("<LoadingIndicator />", () => {
  it("should match snapshot", () => {
    render(<LoadingIndicator />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

import { render, screen, act } from "@testing-library/react-native";
import { JikanApi } from "../../../services/JikanApi";
import ProgressFormModal from "../ProgressFormModal";

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

describe("<ProgressFormModal />", () => {
  const props = {
    data: {
      episodes: 1,
      title: "title",
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    render(<ProgressFormModal />);
    await act(async () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});

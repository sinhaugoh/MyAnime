import { render, screen } from "@testing-library/react-native";
import AnimeWebView from "../AnimeWebView";

describe("<AnimeDetail />", () => {
  const mockedParams = {
    route: { params: { animeUrl: "anime url" } },
    navigation: "",
  };
  it("should match snapshot", () => {
    render(<AnimeWebView {...mockedParams} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

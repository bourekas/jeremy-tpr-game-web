import { render, screen } from "@testing-library/react";
import GameDisplay from "./game-display";
import StoreProvider from "@/app/store-provider";

it("initially renders setup by default", () => {
  renderGameDisplay();

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders setup when initialIsGameStarted is false", () => {
  renderGameDisplay({ initialIsGameStarted: false });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

// render with mocked dependencies
function renderGameDisplay(props = {}) {
  const Setup =
    props.Setup || jest.fn().mockReturnValue(<div data-testid="setup" />);
  const Words =
    props.Words || jest.fn().mockReturnValue(<div data-testid="words" />);

  render(
    <StoreProvider>
      <GameDisplay setup={<Setup />} words={<Words />} {...props} />
    </StoreProvider>,
  );

  return { Setup, Words };
}

import { render, screen } from "@testing-library/react";
import GameDisplay from "./game-display";
import StoreProvider from "@/app/store-provider";

it("renders setup element when game has not started", () => {
  renderGameDisplay({ isGameStarted: false });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders word element when game has started", () => {
  renderGameDisplay({ isGameStarted: true });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

function renderGameDisplay({ isGameStarted }) {
  const setup = <div data-testid="setup" />;
  const words = <div data-testid="words" />;

  const wrapper = ({ children }) => (
    <StoreProvider initialState={{ game: { isGameStarted } }}>
      {children}
    </StoreProvider>
  );

  return render(<GameDisplay setup={setup} words={words} />, { wrapper });
}

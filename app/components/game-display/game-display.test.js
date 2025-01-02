import { render, screen } from "@testing-library/react";
import { GameStatusContext } from "@/app/contexts";
import GameDisplay from "./game-display";

it("renders the setup element when game has not started", () => {
  renderGameDisplay({ isGameStarted: false });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders the word element when game has started", () => {
  renderGameDisplay({ isGameStarted: true });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

function renderGameDisplay({ isGameStarted }) {
  const setup = <div data-testid="setup" />;
  const words = <div data-testid="words" />;

  const wrapper = ({ children }) => (
    <GameStatusContext.Provider value={{ isGameStarted }}>
      {children}
    </GameStatusContext.Provider>
  );

  return render(<GameDisplay setup={setup} words={words} />, { wrapper });
}

import { act, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { createGameDisplayComponent } from "./game-display";
import { GameDisplayContext } from "@/app/contexts/game-display";

it("initially renders setup by default", () => {
  renderGameDisplay();

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders setup when initialIsGameStarted is false", () => {
  renderGameDisplay({ initialIsGameStarted: false });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders words when initialIsGameStarted is true", () => {
  renderGameDisplay({ initialIsGameStarted: true });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

it("calls Words with the given words", () => {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];

  const { Words } = renderGameDisplay({
    initialIsGameStarted: true,
    words,
  });

  expect(Words.mock.lastCall[0]).toEqual({ words });
});

it("provides the onBackToSetup callback", () => {
  let onBackToSetup;

  const Words = jest.fn(() => {
    const result = useContext(GameDisplayContext);
    onBackToSetup = result.onBackToSetup;
  });

  renderGameDisplay({ initialIsGameStarted: true, Words });
  act(onBackToSetup);

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("provides the onStart callback", () => {
  let onStart;

  const Setup = jest.fn(() => {
    const result = useContext(GameDisplayContext);
    onStart = result.onStart;
  });

  renderGameDisplay({ Setup });
  act(onStart);

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

// render with mocked dependencies
function renderGameDisplay(props = {}) {
  const Setup =
    props.Setup || jest.fn().mockReturnValue(<div data-testid="setup" />);
  const Words =
    props.Words || jest.fn().mockReturnValue(<div data-testid="words" />);

  const GameDisplay = createGameDisplayComponent(Setup, Words);

  render(<GameDisplay {...props} />);

  return { Setup, Words };
}

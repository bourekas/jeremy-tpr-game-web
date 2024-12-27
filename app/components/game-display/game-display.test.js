import { act, useContext } from "react";
import { render, screen } from "@testing-library/react";
import GameDisplay from "./game-display";
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

  render(<GameDisplay setup={<Setup />} words={<Words />} {...props} />);

  return { Setup, Words };
}

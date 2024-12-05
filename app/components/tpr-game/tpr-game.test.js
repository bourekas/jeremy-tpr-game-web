import { act } from "react";
import { render, screen } from "@testing-library/react";
import TprGame from "./tpr-game";

it("initially renders SetupMenu by default", () => {
  renderTprGame();

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
});

it("renders SetupMenu when initialIsGameStarted is false", () => {
  renderTprGame({ initialIsGameStarted: false });

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
});

it("calls SetupMenu with the default setup by default", () => {
  const { SetupMenu } = renderTprGame();
  const setupMenuProps = SetupMenu.mock.lastCall[0];
  const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

  expect(setupMenuProps.setup).toEqual(defaultSetup);
});

it("calls SetupMenu with the given initialSetup", () => {
  const initialSetup = { displayTime: 9, isAutoPlayAudio: false };
  const { SetupMenu } = renderTprGame({ initialSetup });
  const setupMenuProps = SetupMenu.mock.lastCall[0];

  expect(setupMenuProps.setup).toEqual(initialSetup);
});

it("renders WordPlayer when initialIsGameStarted is true", () => {
  renderTprGame({ initialIsGameStarted: true });

  expect(screen.getByTestId("word-player")).toBeInTheDocument();
});

it("calls WordPlayer with the given words and initialSetup", () => {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];
  const initialSetup = { displayTime: 9, isAutoPlayAudio: false };
  const { WordPlayer } = renderTprGame({
    initialIsGameStarted: true,
    words,
    initialSetup,
  });
  const wordPlayerProps = WordPlayer.mock.lastCall[0];

  expect(wordPlayerProps).toEqual(
    expect.objectContaining({ words, setup: initialSetup }),
  );
});

it("renders WordPlayer when onStart is called by SetupMenu", () => {
  const { SetupMenu } = renderTprGame();

  act(() => {
    // Simulate SetupMenu calling onStart
    const setupMenuProps = SetupMenu.mock.lastCall[0];
    setupMenuProps.onStart();
  });

  expect(screen.getByTestId("word-player")).toBeInTheDocument();
});

it("renders SetupMenu when onBackToMenu is called by WordPlayer", () => {
  const { WordPlayer } = renderTprGame({ initialIsGameStarted: true });

  // Simulate WordPlayer calling onBackToSetup
  act(() => WordPlayer.mock.lastCall[0].onBackToSetup());

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
});

it("calls WordPlayer with updated setup when configuring setup in SetupMenu", () => {
  const initialSetup = { displayTime: 3, isAutoPlayAudio: false };
  const updatedSetup = { displayTime: 4, isAutoPlayAudio: true };

  const { SetupMenu, WordPlayer } = renderTprGame({ initialSetup });

  act(() => {
    // Simulate SetupMenu updating setup and starting game
    const setupMenuProps = SetupMenu.mock.lastCall[0];
    setupMenuProps.onSetupChange(updatedSetup);
    setupMenuProps.onStart();
  });

  const wordPlayerProps = WordPlayer.mock.lastCall[0];
  expect(wordPlayerProps.setup).toEqual(updatedSetup);
});

// render with mocked dependencies
function renderTprGame(props) {
  const SetupMenu = jest.fn().mockReturnValue(<div data-testid="setup-menu" />);
  const WordPlayer = jest
    .fn()
    .mockReturnValue(<div data-testid="word-player" />);

  render(<TprGame SetupMenu={SetupMenu} WordPlayer={WordPlayer} {...props} />);

  return { SetupMenu, WordPlayer };
}

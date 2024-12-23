import { act } from "react";
import { render, screen } from "@testing-library/react";
import { createGameDisplayComponent } from "./game-display";

it("initially renders setup by default", () => {
  renderTprGame();

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders setup when initialIsGameStarted is false", () => {
  renderTprGame({ initialIsGameStarted: false });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("calls Setup with the default setup by default", () => {
  const { Setup } = renderTprGame();
  const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

  expect(Setup.mock.lastCall[0]).toEqual({
    setup: defaultSetup,
    onSetupChange: expect.any(Function),
    onStart: expect.any(Function),
  });
});

it("calls Setup with the given initialSetup", () => {
  const initialSetup = { displayTime: 9, isAutoPlayAudio: false };
  const { Setup } = renderTprGame({ initialSetup });

  expect(Setup.mock.lastCall[0]).toEqual({
    setup: initialSetup,
    onSetupChange: expect.any(Function),
    onStart: expect.any(Function),
  });
});

it("renders words when initialIsGameStarted is true", () => {
  renderTprGame({ initialIsGameStarted: true });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

it("calls Words with the given words and initialSetup", () => {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];
  const initialSetup = { displayTime: 9, isAutoPlayAudio: false };

  const { Words } = renderTprGame({
    initialIsGameStarted: true,
    words,
    initialSetup,
  });

  expect(Words.mock.lastCall[0]).toEqual({
    setup: initialSetup,
    words,
    onBackToSetup: expect.any(Function),
  });
});

it("calls Words when calling onStart", () => {
  const { Setup } = renderTprGame();

  act(() => {
    const { onStart } = Setup.mock.lastCall[0];
    onStart();
  });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

it("calls Setup when calling onBackToSetup", () => {
  const { Words } = renderTprGame({ initialIsGameStarted: true });

  act(() => {
    const { onBackToSetup } = Words.mock.lastCall[0];
    onBackToSetup();
  });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("calls Words with updated setup when calling onSetupChange", () => {
  const initialSetup = { displayTime: 3, isAutoPlayAudio: false };
  const updatedSetup = { displayTime: 4, isAutoPlayAudio: true };

  const { Setup, Words } = renderTprGame({
    initialSetup,
  });

  act(() => {
    const { onSetupChange, onStart } = Setup.mock.lastCall[0];
    onSetupChange(updatedSetup);
    onStart();
  });

  const { setup: wordsSetup } = Words.mock.lastCall[0];
  expect(wordsSetup).toEqual(updatedSetup);
});

// render with mocked dependencies
function renderTprGame(props) {
  const Setup = jest.fn().mockReturnValue(<div data-testid="setup" />);
  const Words = jest.fn().mockReturnValue(<div data-testid="words" />);

  const GameDisplay = createGameDisplayComponent(Setup, Words);

  render(<GameDisplay {...props} />);

  return { Setup, Words };
}

import { act } from "react";
import { render, screen } from "@testing-library/react";
import TprGame from "./tpr-game";

it("initially renders Setup by default", () => {
  renderTprGame();

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders Setup when initialIsGameStarted is false", () => {
  renderTprGame({ initialIsGameStarted: false });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("calls Setup with the default setup by default", () => {
  const { Setup } = renderTprGame();
  const setupProps = Setup.mock.lastCall[0];
  const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

  expect(setupProps.setup).toEqual(defaultSetup);
});

it("calls Setup with the given initialSetup", () => {
  const initialSetup = { displayTime: 9, isAutoPlayAudio: false };
  const { Setup } = renderTprGame({ initialSetup });
  const setupProps = Setup.mock.lastCall[0];

  expect(setupProps.setup).toEqual(initialSetup);
});

it("renders Words when initialIsGameStarted is true", () => {
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
  const wordsProps = Words.mock.lastCall[0];

  expect(wordsProps).toEqual(
    expect.objectContaining({ words, setup: initialSetup }),
  );
});

it("renders Words when onStart is called by Setup", () => {
  const { Setup } = renderTprGame();

  act(() => {
    // Simulate Setup calling onStart
    const setupProps = Setup.mock.lastCall[0];
    setupProps.onStart();
  });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

it("renders Setup when onBackToSetup is called by Words", () => {
  const { Words } = renderTprGame({ initialIsGameStarted: true });

  // Simulate Words calling onBackToSetup
  act(() => Words.mock.lastCall[0].onBackToSetup());

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("calls Words with updated setup when configuring setup in Setup", () => {
  const initialSetup = { displayTime: 3, isAutoPlayAudio: false };
  const updatedSetup = { displayTime: 4, isAutoPlayAudio: true };

  const { Setup, Words } = renderTprGame({ initialSetup });

  act(() => {
    // Simulate Setup updating setup and starting game
    const setupProps = Setup.mock.lastCall[0];
    setupProps.onSetupChange(updatedSetup);
    setupProps.onStart();
  });

  const wordsProps = Words.mock.lastCall[0];
  expect(wordsProps.setup).toEqual(updatedSetup);
});

// render with mocked dependencies
function renderTprGame(props) {
  const Setup = jest.fn().mockReturnValue(<div data-testid="setup" />);
  const Words = jest.fn().mockReturnValue(<div data-testid="words" />);

  render(<TprGame Setup={Setup} Words={Words} {...props} />);

  return { Setup, Words };
}

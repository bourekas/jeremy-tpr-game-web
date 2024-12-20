import { act } from "react";
import { render, screen } from "@testing-library/react";
import GameDisplay from "./game-display";

it("initially renders setup by default", () => {
  renderTprGame();

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("renders setup when initialIsGameStarted is false", () => {
  renderTprGame({ initialIsGameStarted: false });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("calls renderSetup with the default setup by default", () => {
  const { renderSetup } = renderTprGame();
  const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

  expect(renderSetup).toHaveBeenCalledWith(
    defaultSetup,
    expect.any(Function),
    expect.any(Function),
  );
});

it("calls renderSetup with the given initialSetup", () => {
  const initialSetup = { displayTime: 9, isAutoPlayAudio: false };
  const { renderSetup } = renderTprGame({ initialSetup });

  expect(renderSetup).toHaveBeenCalledWith(
    initialSetup,
    expect.any(Function),
    expect.any(Function),
  );
});

it("renders words when initialIsGameStarted is true", () => {
  renderTprGame({ initialIsGameStarted: true });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

it("calls renderWords with the given words and initialSetup", () => {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];
  const initialSetup = { displayTime: 9, isAutoPlayAudio: false };

  const { renderWords } = renderTprGame({
    initialIsGameStarted: true,
    words,
    initialSetup,
  });

  expect(renderWords).toHaveBeenCalledWith(
    initialSetup,
    words,
    expect.any(Function),
  );
});

it("calls renderWords when calling onStart", () => {
  const { renderSetup } = renderTprGame();

  act(() => {
    const onStart = renderSetup.mock.lastCall[2];
    onStart();
  });

  expect(screen.getByTestId("words")).toBeInTheDocument();
});

it("calls renderSetup when calling onBackToSetup", () => {
  const { renderWords } = renderTprGame({ initialIsGameStarted: true });

  act(() => {
    const onBackToSetup = renderWords.mock.lastCall[2];
    onBackToSetup();
  });

  expect(screen.getByTestId("setup")).toBeInTheDocument();
});

it("calls renderWords with updated setup when calling onSetupChange", () => {
  const initialSetup = { displayTime: 3, isAutoPlayAudio: false };
  const updatedSetup = { displayTime: 4, isAutoPlayAudio: true };

  const { renderSetup, renderWords } = renderTprGame({ initialSetup });

  act(() => {
    const [, onSetupChange, onStart] = renderSetup.mock.lastCall;
    onSetupChange(updatedSetup);
    onStart();
  });

  const renderWordsSetup = renderWords.mock.lastCall[0];
  expect(renderWordsSetup).toEqual(updatedSetup);
});

// render with mocked dependencies
function renderTprGame(props) {
  const renderSetup = jest.fn().mockReturnValue(<div data-testid="setup" />);
  const renderWords = jest.fn().mockReturnValue(<div data-testid="words" />);

  render(
    <GameDisplay
      renderSetup={renderSetup}
      renderWords={renderWords}
      {...props}
    />,
  );

  return { renderSetup, renderWords };
}

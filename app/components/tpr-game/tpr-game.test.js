import { render, screen } from "@testing-library/react";
import TprGame from "./tpr-game";

const sourceWord = {
  word: "לגעת",
  imageSrc: "לגעת.jpg",
  audioSrc: "לגעת.mp3",
};

const initializedWord = {
  word: "לגעת",
  imageSrc: "לגעת.jpg",
  audio: new Audio("לגעת.mp3"),
};

it("renders setup-menu component when initially loaded", () => {
  const SetupMenu = jest.fn().mockReturnValue(<div data-testid="setup-menu" />);

  renderTprGame({ SetupMenu });

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
});

it("calls word-Player hook with the words prop", () => {
  const words = [sourceWord];
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord });

  renderTprGame({ words, useWordPlayer });

  expect(useWordPlayer).toHaveBeenCalledWith(words);
});

it("calls the start function when start callback is called by setup-menu component", () => {
  const SetupMenu = jest.fn();
  const start = jest.fn();
  const useWordPlayer = jest.fn().mockReturnValue({ start });

  renderTprGame({ SetupMenu, useWordPlayer });

  // simulate setup-menu component calling the start callback
  const { onStart } = SetupMenu.mock.lastCall[0];
  onStart({ displayTime: 5 });

  expect(start).toHaveBeenCalledTimes(1);
});

it("renders word-card component per returned word from word-Player hook", () => {
  const WordCard = jest.fn().mockReturnValue(<div data-testid="word-card" />);
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord });

  renderTprGame({ WordCard, useWordPlayer });

  expect(screen.getByTestId("word-card")).toBeInTheDocument();

  // assert that it was called with the correct props
  const wordCardProps = WordCard.mock.lastCall[0];
  expect(wordCardProps).toEqual(expect.objectContaining(initializedWord));
});

it("calls the stop function when back-to-setup callback is called by word-card component", () => {
  const WordCard = jest.fn();
  const stop = jest.fn();
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord, stop });

  renderTprGame({ WordCard, useWordPlayer });

  // simulate word-card component calling the back-to-setup callback
  const { onBackToSetup } = WordCard.mock.lastCall[0];
  onBackToSetup();

  expect(stop).toHaveBeenCalledTimes(1);
});

it("calls the next function when next-word callback is called by word-card component", () => {
  const WordCard = jest.fn();
  const next = jest.fn();
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord, next });

  renderTprGame({ WordCard, useWordPlayer });

  // simulate word-card component calling the next-word callback
  const { onNextWord } = WordCard.mock.lastCall[0];
  onNextWord();

  expect(next).toHaveBeenCalledTimes(1);
});

// renders with default mocked dependencies which can be overriden
function renderTprGame(props) {
  render(
    <TprGame
      SetupMenu={jest.fn()}
      WordCard={jest.fn()}
      useWordPlayer={jest.fn().mockReturnValue({})}
      {...props}
    />,
  );
}

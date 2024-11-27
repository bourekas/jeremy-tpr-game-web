import { act } from "react";
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
  const useWordPlayer = jest.fn().mockReturnValue({ play: jest.fn() });

  renderTprGame({ SetupMenu, useWordPlayer });

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
  expect(SetupMenu.mock.lastCall[0]).toEqual({
    displayTime: expect.any(Number),
    onDisplayTimeChange: expect.any(Function),
    onStart: expect.any(Function),
  });
});

it("calls word-player hook with the words prop", () => {
  const words = [sourceWord];
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord });

  renderTprGame({ words, useWordPlayer });

  expect(useWordPlayer).toHaveBeenCalledWith(words, expect.any(Number));
});

it("calls the play function when start callback is called by setup-menu component", () => {
  const SetupMenu = jest.fn();
  const play = jest.fn();
  const useWordPlayer = jest.fn().mockReturnValue({ play });

  renderTprGame({ SetupMenu, useWordPlayer });

  // simulate setup-menu component calling the start callback
  const { onStart } = SetupMenu.mock.lastCall[0];
  act(() => onStart());

  expect(play).toHaveBeenCalledTimes(1);
});

it("renders word-card component per returned word from word-player hook", () => {
  const WordCard = jest.fn().mockReturnValue(<div data-testid="word-card" />);
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord });

  renderTprGame({ WordCard, useWordPlayer });

  expect(screen.getByTestId("word-card")).toBeInTheDocument();

  // assert that it was called with the correct props
  const wordCardProps = WordCard.mock.lastCall[0];
  expect(wordCardProps).toEqual(expect.objectContaining(initializedWord));
});

it("passes isPlaying returned from use-player hook to word-card component", () => {
  const useWordPlayer = jest
    .fn()
    .mockReturnValue({ word: sourceWord, isPlaying: true });
  const WordCard = jest.fn();

  renderTprGame({ WordCard, useWordPlayer });

  const wordCardProps = WordCard.mock.lastCall[0];
  expect(wordCardProps).toHaveProperty("isPlaying", true);
});

it("calls the reset function when back-to-setup callback is called by word-card component", () => {
  const WordCard = jest.fn();
  const reset = jest.fn();
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord, reset });

  renderTprGame({ WordCard, useWordPlayer });

  // simulate word-card component calling the back-to-setup callback
  const { onBackToSetup } = WordCard.mock.lastCall[0];
  act(() => onBackToSetup());

  expect(reset).toHaveBeenCalledTimes(1);
});

it("calls the next function when next-word callback is called by word-card component", () => {
  const WordCard = jest.fn();
  const next = jest.fn();
  const useWordPlayer = jest.fn().mockReturnValue({ word: sourceWord, next });

  renderTprGame({ WordCard, useWordPlayer });

  // simulate word-card component calling the next-word callback
  const { onNextWord } = WordCard.mock.lastCall[0];
  act(() => onNextWord());

  expect(next).toHaveBeenCalledTimes(1);
});

// renders with default mocked dependencies which can be overriden
function renderTprGame(props) {
  return render(
    <TprGame
      SetupMenu={jest.fn()}
      WordCard={jest.fn()}
      useWordPlayer={jest.fn().mockReturnValue({})}
      {...props}
    />,
  );
}

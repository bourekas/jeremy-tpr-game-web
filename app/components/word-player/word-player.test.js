import { render, screen } from "@testing-library/react";
import WordPlayer from "./word-player";
import { act } from "react";

it("calls the use-word-player hook with words and display time props", () => {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];
  const displayTime = 3;

  const { useWordPlayer } = renderWordPlayer({ words, displayTime });

  expect(useWordPlayer).toHaveBeenCalledWith(words, displayTime);
});

it("renders the word-card component with values returned from use-word-player hook", () => {
  const {
    useWordPlayerReturnValue: { word, isPlaying, next, play, pause },
    WordCard,
  } = renderWordPlayer();

  expect(screen.getByTestId("word-card")).toBeInTheDocument();
  expect(WordCard.mock.lastCall[0]).toEqual({
    word: word.word,
    imageSrc: word.imageSrc,
    audio: new Audio(word.audioSrc),
    isPlaying,
    onPlay: play,
    onPause: pause,
    onBackToSetup: expect.any(Function),
    onNextWord: next,
  });
});

it("calls reset and back-to-setup functions when word-card calls its back-to-setup callback", () => {
  const {
    useWordPlayerReturnValue: { reset },
    WordCard,
    onBackToSetup,
  } = renderWordPlayer();

  act(() => WordCard.mock.lastCall[0].onBackToSetup());

  expect(reset).toHaveBeenCalledTimes(1);
  expect(onBackToSetup).toHaveBeenCalledTimes(1);
});

it("calls play function when mounting", () => {
  const {
    useWordPlayerReturnValue: { play },
  } = renderWordPlayer();

  expect(play).toHaveBeenCalledTimes(1);
});

function renderWordPlayer(props) {
  const useWordPlayerReturnValue = {
    word: { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
    isPlaying: true,
    play: jest.fn(),
    pause: jest.fn(),
    reset: jest.fn(),
    next: jest.fn(),
  };
  const useWordPlayer = jest.fn().mockReturnValue(useWordPlayerReturnValue);
  const WordCard = jest.fn().mockReturnValue(<div data-testid="word-card" />);
  const onBackToSetup = jest.fn();

  render(
    <WordPlayer
      useWordPlayer={useWordPlayer}
      WordCard={WordCard}
      onBackToSetup={onBackToSetup}
      {...props}
    />,
  );

  return { useWordPlayer, useWordPlayerReturnValue, WordCard, onBackToSetup };
}

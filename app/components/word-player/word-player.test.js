import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordPlayer from "./word-player";
import { expect } from "@storybook/test";

it("calls the use-word-player hook with words and display time props", () => {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];
  const displayTime = 3;

  const { useWordPlayer } = renderWordPlayer({ words, displayTime });

  expect(useWordPlayer).toHaveBeenCalledWith(words, displayTime, true);
});

it("renders the word component with values returned from use-word-player hook", () => {
  const {
    useWordPlayerReturnValue: { word },
    Word,
  } = renderWordPlayer();

  expect(screen.getByTestId("word")).toBeInTheDocument();
  expect(Word.mock.lastCall[0]).toEqual({
    word: word.word,
    imageSrc: word.imageSrc,
  });
});

it("calls the back-to-setup callback when back-to-setup button is clicked", async () => {
  const { onBackToSetup, user } = renderWordPlayer();

  await user.click(screen.getByRole("button", { name: "Back to setup menu" }));

  expect(onBackToSetup).toHaveBeenCalledTimes(1);
});

it("calls back-to-setup callback when stop button is clicked", async () => {
  const { onBackToSetup, user } = renderWordPlayer();

  const button = screen.getByRole("button", { name: "Stop game" });
  await user.click(button);

  expect(onBackToSetup).toHaveBeenCalledTimes(1);
});

it("calls pause when pause button is clicked", async () => {
  const {
    useWordPlayerReturnValue: { pause },
    user,
  } = renderWordPlayer({ isPlaying: true });

  const button = screen.getByRole("button", { name: "Pause" });
  await user.click(button);

  expect(pause).toHaveBeenCalledTimes(1);
});

it("calls play when play button is clicked", async () => {
  const {
    useWordPlayerReturnValue: { play },
    user,
  } = renderWordPlayer({ isPlaying: false });

  const button = screen.getByRole("button", { name: "Play" });
  await user.click(button);

  expect(play).toHaveBeenCalledTimes(1);
});

it("calls next when next-word button is clicked", async () => {
  const {
    useWordPlayerReturnValue: { next },
    user,
  } = renderWordPlayer();

  const button = screen.getByRole("button", { name: "Go to next word" });
  await user.click(button);

  expect(next).toHaveBeenCalledTimes(1);
});

it("calls useAudio with audio source of current word", () => {
  const {
    useWordPlayerReturnValue: { word },
    useAudio,
  } = renderWordPlayer();

  expect(useAudio).toHaveBeenCalledWith(word.audioSrc);
});

it("has previous button", async () => {
  const {
    useWordPlayerReturnValue: { previous },
    user,
  } = renderWordPlayer();

  const button = screen.getByRole("button", { name: "Go to previous word" });
  await user.click(button);

  expect(previous).toHaveBeenCalledTimes(1);
});

function renderWordPlayer(props = {}) {
  const useWordPlayerReturnValue = {
    word: { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
    isPlaying: props.isPlaying === undefined ? true : props.isPlaying,
    play: jest.fn(),
    pause: jest.fn(),
    reset: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
  };
  const useWordPlayer = jest.fn().mockReturnValue(useWordPlayerReturnValue);
  const useAudio = jest.fn();
  const Word = jest.fn().mockReturnValue(<div data-testid="word" />);
  const onBackToSetup = jest.fn();
  const user = userEvent.setup();

  render(
    <WordPlayer
      useWordPlayer={useWordPlayer}
      useAudio={useAudio}
      Word={Word}
      onBackToSetup={onBackToSetup}
      {...props}
    />,
  );

  return {
    useWordPlayer,
    useWordPlayerReturnValue,
    useAudio,
    Word,
    onBackToSetup,
    user,
  };
}

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordPlayer from "./word-player";
import { expect } from "@storybook/test";

it("calls usePlayer with given words and setup", () => {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];
  const setup = { displayTime: 3 };

  const { usePlayer } = renderWordPlayer({ words, setup });

  expect(usePlayer).toHaveBeenCalledWith({
    length: words.length,
    displayTime: setup.displayTime,
    initialIsPlaying: true,
  });
});

it("calls renderWord with values returned from usePlayer hook", () => {
  const { words, renderWord } = renderWordPlayer();
  const word = words[0];

  expect(screen.getByTestId("word")).toBeInTheDocument();
  expect(renderWord).toHaveBeenCalledWith(word.word, word.word, word.imageSrc);
});

it("calls onBackToSetup when back-to-setup button is clicked", async () => {
  const { onBackToSetup, user } = renderWordPlayer();

  await user.click(screen.getByRole("button", { name: "Back to setup menu" }));

  expect(onBackToSetup).toHaveBeenCalledTimes(1);
});

it("calls onBackToSetup when stop button is clicked", async () => {
  const { onBackToSetup, user } = renderWordPlayer();

  const button = screen.getByRole("button", { name: "Stop game" });
  await user.click(button);

  expect(onBackToSetup).toHaveBeenCalledTimes(1);
});

it("calls pause when pause button is clicked", async () => {
  const {
    usePlayerReturnValue: { pause },
    user,
  } = renderWordPlayer({ isPlaying: true });

  const button = screen.getByRole("button", { name: "Pause" });
  await user.click(button);

  expect(pause).toHaveBeenCalledTimes(1);
});

it("calls play when play button is clicked", async () => {
  const {
    usePlayerReturnValue: { play },
    user,
  } = renderWordPlayer({ isPlaying: false });

  const button = screen.getByRole("button", { name: "Play" });
  await user.click(button);

  expect(play).toHaveBeenCalledTimes(1);
});

it("calls next when next-word button is clicked", async () => {
  const {
    usePlayerReturnValue: { next },
    user,
  } = renderWordPlayer();

  const button = screen.getByRole("button", { name: "Go to next word" });
  await user.click(button);

  expect(next).toHaveBeenCalledTimes(1);
});

it("calls use-audio with audio source and is-auto-play-audio props", () => {
  const { words, useAudio } = renderWordPlayer({
    setup: { isAutoPlayAudio: false },
  });

  expect(useAudio).toHaveBeenCalledWith(words[0].audioSrc, false);
});

it("has previous button", async () => {
  const {
    usePlayerReturnValue: { previous },
    user,
  } = renderWordPlayer();

  const button = screen.getByRole("button", { name: "Go to previous word" });
  await user.click(button);

  expect(previous).toHaveBeenCalledTimes(1);
});

function renderWordPlayer(props = {}) {
  const words = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }];
  const usePlayerReturnValue = {
    index: 0,
    isPlaying: props.isPlaying === undefined ? true : props.isPlaying,
    play: jest.fn(),
    pause: jest.fn(),
    reset: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
  };
  const usePlayer = jest.fn().mockReturnValue(usePlayerReturnValue);
  const useAudio = jest.fn();
  const renderWord = jest.fn().mockReturnValue(<div data-testid="word" />);
  const onBackToSetup = jest.fn();
  const user = userEvent.setup();

  render(
    <WordPlayer
      words={words}
      renderWord={renderWord}
      usePlayer={usePlayer}
      useAudio={useAudio}
      onBackToSetup={onBackToSetup}
      {...props}
    />,
  );

  return {
    words,
    renderWord,
    usePlayer,
    usePlayerReturnValue,
    useAudio,
    onBackToSetup,
    user,
  };
}

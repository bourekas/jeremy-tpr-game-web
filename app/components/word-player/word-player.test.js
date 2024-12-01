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

it("calls audio play when play-audio button is clicked", async () => {
  const playAudio = jest.fn();
  const audio = { play: playAudio };
  const { user } = renderWordPlayer({ audio });

  const button = screen.getByRole("button", { name: "Play audio" });
  await user.click(button);

  expect(playAudio).toHaveBeenCalledTimes(1);
});

function renderWordPlayer(props = {}) {
  const { audio } = props;

  const useWordPlayerReturnValue = {
    word: { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
    isPlaying: props.isPlaying === undefined ? true : props.isPlaying,
    audio: audio || new Audio("a.mp3"),
    play: jest.fn(),
    pause: jest.fn(),
    reset: jest.fn(),
    next: jest.fn(),
  };
  const useWordPlayer = jest.fn().mockReturnValue(useWordPlayerReturnValue);
  const Word = jest.fn().mockReturnValue(<div data-testid="word" />);
  const onBackToSetup = jest.fn();
  const user = userEvent.setup();

  render(
    <WordPlayer
      useWordPlayer={useWordPlayer}
      Word={Word}
      onBackToSetup={onBackToSetup}
      {...props}
    />,
  );

  return {
    useWordPlayer,
    useWordPlayerReturnValue,
    Word,
    onBackToSetup,
    user,
  };
}

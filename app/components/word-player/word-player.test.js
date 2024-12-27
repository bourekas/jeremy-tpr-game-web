import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createWordPlayerComponent } from "./word-player";
import { GameDisplayContext } from "@/app/contexts/game-display";

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];

it("calls onBackToSetup when clicking back to setup button", async () => {
  const { onBackToSetup, clickBackToSetupButton } = renderWordPlayer();

  await clickBackToSetupButton();
  expect(onBackToSetup).toHaveBeenCalled();
});

it("calls stop control when clicking back to setup button", async () => {
  const {
    controls: { stop },
    clickBackToSetupButton,
  } = renderWordPlayer();

  await clickBackToSetupButton();
  expect(stop).toHaveBeenCalled();
});

it("forwards all props except onBackToSetup to useWordPlayer", () => {
  const propsExceptOnBackToSetup = {
    words,
    initialIsPlaying: true,
    initialWordIndex: 1,
  };
  const { useWordPlayer } = renderWordPlayer(propsExceptOnBackToSetup);

  expect(useWordPlayer).toHaveBeenCalledWith(propsExceptOnBackToSetup);
});

it("forwards the returned word from useWordPlayer to WordContent", () => {
  const word = words[0].word;
  const imageSrc = words[0].imageSrc;
  const { WordContent } = renderWordPlayer();

  expect(WordContent.mock.lastCall[0]).toEqual(
    expect.objectContaining({ word, imageSrc }),
  );
});

it("forwards the returned isPlaying props from useWordPlayer to WordControls", () => {
  const { WordControls, wordPlayerHookReturnValue } = renderWordPlayer();

  expect(WordControls.mock.lastCall[0]).toHaveProperty(
    "isPlaying",
    wordPlayerHookReturnValue.isPlaying,
  );
});

it("calls audio.play when WordControls calls onPlayAudio", () => {
  const {
    wordPlayerHookReturnValue: { audio },
    WordControls,
  } = renderWordPlayer();

  act(() => {
    const { onPlayAudio } = getControlHandlers(WordControls);
    onPlayAudio();
  });

  expect(audio.play).toHaveBeenCalledTimes(1);
});

it("calls play control when WordControls calls onPlay", () => {
  const {
    wordPlayerHookReturnValue: {
      controls: { play },
    },
    WordControls,
  } = renderWordPlayer();

  act(() => {
    const { onPlay } = getControlHandlers(WordControls);
    onPlay();
  });

  expect(play).toHaveBeenCalledTimes(1);
});

it("calls pause control when WordControls calls onPause", () => {
  const {
    wordPlayerHookReturnValue: {
      controls: { pause },
    },
    WordControls,
  } = renderWordPlayer();

  act(() => {
    const { onPause } = getControlHandlers(WordControls);
    onPause();
  });

  expect(pause).toHaveBeenCalledTimes(1);
});

it("calls previous control when WordControls calls onPrevious", () => {
  const {
    wordPlayerHookReturnValue: {
      controls: { previous },
    },
    WordControls,
  } = renderWordPlayer();

  act(() => {
    const { onPrevious } = getControlHandlers(WordControls);
    onPrevious();
  });

  expect(previous).toHaveBeenCalledTimes(1);
});

it("calls next control when WordControls calls onNext", () => {
  const {
    wordPlayerHookReturnValue: {
      controls: { next },
    },
    WordControls,
  } = renderWordPlayer();

  act(() => {
    const { onNext } = getControlHandlers(WordControls);
    onNext();
  });

  expect(next).toHaveBeenCalledTimes(1);
});

it("calls stop control when WordControls calls onStop", () => {
  const {
    wordPlayerHookReturnValue: {
      controls: { stop },
    },
    WordControls,
  } = renderWordPlayer();

  act(() => {
    const { onStop } = getControlHandlers(WordControls);
    onStop();
  });

  expect(stop).toHaveBeenCalledTimes(1);
});

it("calls onBackToSetup when WordControls calls onStop", () => {
  const { onBackToSetup, WordControls } = renderWordPlayer();

  act(() => {
    const { onStop } = getControlHandlers(WordControls);
    onStop();
  });

  expect(onBackToSetup).toHaveBeenCalledTimes(1);
});

function getControlHandlers(WordControls) {
  return getProps(WordControls).controlHandlers;
}

function getProps(Mock) {
  return Mock.mock.lastCall[0];
}

function renderWordPlayer(props = {}) {
  const onBackToSetup = jest.fn();
  const user = userEvent.setup();

  const clickBackToSetupButton = () =>
    user.click(screen.getByRole("button", "Back to setup menu"));

  const controls = {
    play: jest.fn(),
    pause: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
    stop: jest.fn(),
  };

  const wordPlayerHookReturnValue = {
    word: words[0],
    audio: { play: jest.fn() },
    isPlaying: true,
    controls,
  };
  const useWordPlayer = jest.fn().mockReturnValue(wordPlayerHookReturnValue);

  const WordContent = jest.fn();
  const WordControls = jest.fn();

  const WordPlayer = createWordPlayerComponent(
    useWordPlayer,
    WordContent,
    WordControls,
  );

  render(
    <GameDisplayContext.Provider value={{ onBackToSetup }}>
      <WordPlayer words={words} {...props} />
    </GameDisplayContext.Provider>,
  );

  return {
    useWordPlayer,
    WordContent,
    WordControls,
    controls,
    wordPlayerHookReturnValue,
    onBackToSetup,
    clickBackToSetupButton,
  };
}

import { act, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createWordPlayerComponent } from "./word-player";
import { GameDisplayContext } from "@/app/contexts/game-display";
import { WordPlaybackContext } from "@/app/contexts/word-playback";

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

it("provides the returned word prop from useWordPlayer", () => {
  let providedWord;

  const WordContent = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedWord = result.word;
  });

  const {
    wordPlayerHookReturnValue: { word },
  } = renderWordPlayer({ WordContent });

  expect(providedWord).toEqual(word);
});

it("provides the returned isPlaying prop from useWordPlayer", () => {
  let providedIsPlaying;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedIsPlaying = result.isPlaying;
  });

  const {
    wordPlayerHookReturnValue: { isPlaying },
  } = renderWordPlayer({ WordControls });

  expect(providedIsPlaying).toEqual(isPlaying);
});

it("provides onPlayAudio which calls the returned audio.play from useWordPlayer", () => {
  let onPlayAudio;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    onPlayAudio = result.controlHandlers.onPlayAudio;
  });

  const {
    wordPlayerHookReturnValue: { audio },
  } = renderWordPlayer({ WordControls });

  act(onPlayAudio);

  expect(audio.play).toHaveBeenCalledTimes(1);
});

it("provides onPlay which calls the returned play control from useWordPlayer", () => {
  let onPlay;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    onPlay = result.controlHandlers.onPlay;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { play },
    },
  } = renderWordPlayer({ WordControls });

  act(onPlay);

  expect(play).toHaveBeenCalledTimes(1);
});

it("provides onPause which calls the returned pause control from useWordPlayer", () => {
  let onPause;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    onPause = result.controlHandlers.onPause;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { pause },
    },
  } = renderWordPlayer({ WordControls });

  act(onPause);

  expect(pause).toHaveBeenCalledTimes(1);
});

it("provides onPrevious which calls the returned previous control from useWordPlayer", () => {
  let onPrevious;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    onPrevious = result.controlHandlers.onPrevious;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { previous },
    },
  } = renderWordPlayer({ WordControls });

  act(onPrevious);

  expect(previous).toHaveBeenCalledTimes(1);
});

it("provides onNext which calls the returned next control from useWordPlayer", () => {
  let onNext;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    onNext = result.controlHandlers.onNext;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { next },
    },
  } = renderWordPlayer({ WordControls });

  act(onNext);

  expect(next).toHaveBeenCalledTimes(1);
});

it("provides onStop which calls the returned stop control from useWordPlayer and onBackToSetup", () => {
  let onStop;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    onStop = result.controlHandlers.onStop;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { stop },
    },
    onBackToSetup,
  } = renderWordPlayer({ WordControls });

  act(onStop);

  expect(stop).toHaveBeenCalledTimes(1);
  expect(onBackToSetup).toHaveBeenCalled();
});

it("renders the given content element", () => {
  renderWordPlayer();

  expect(screen.getByTestId("content")).toBeInTheDocument();
});

it("renders the given controls element", () => {
  renderWordPlayer();

  expect(screen.getByTestId("controls")).toBeInTheDocument();
});

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

  const WordContent =
    props.WordContent ||
    jest.fn().mockReturnValue(<div data-testid="content" />);
  const WordControls =
    props.WordControls ||
    jest.fn().mockReturnValue(<div data-testid="controls" />);

  const WordPlayer = createWordPlayerComponent(useWordPlayer);

  render(
    <GameDisplayContext.Provider value={{ onBackToSetup }}>
      <WordPlayer words={words} {...props}>
        <WordContent />
        <WordControls />
      </WordPlayer>
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

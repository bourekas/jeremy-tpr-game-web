import { act, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordPlayer from "./word-player";
import { WordPlaybackContext } from "@/app/contexts/word-playback";
import useWordPlayer from "./use-word-player";
import StoreProvider from "@/app/store/store-provider/store-provider";

jest.mock("./use-word-player");

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];

it("calls stop when clicking back to setup button", async () => {
  const {
    controls: { stop },
    clickBackToSetupButton,
  } = renderWordPlayer();

  await clickBackToSetupButton();
  expect(stop).toHaveBeenCalled();
});

it("calls stop control when clicking back to setup button", async () => {
  const {
    controls: { stop },
    clickBackToSetupButton,
  } = renderWordPlayer();

  await clickBackToSetupButton();
  expect(stop).toHaveBeenCalled();
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

it("provides the returned playAudio control from useWordPlayer", () => {
  let providedPlayAudio;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedPlayAudio = result.controls.playAudio;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { playAudio },
    },
  } = renderWordPlayer({ WordControls });

  act(providedPlayAudio);

  expect(playAudio).toHaveBeenCalledTimes(1);
});

it("provides the returned play control from useWordPlayer", () => {
  let providedPlay;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedPlay = result.controls.play;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { play },
    },
  } = renderWordPlayer({ WordControls });

  act(providedPlay);

  expect(play).toHaveBeenCalledTimes(1);
});

it("provides the returned pause control from useWordPlayer", () => {
  let providedPause;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedPause = result.controls.pause;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { pause },
    },
  } = renderWordPlayer({ WordControls });

  act(providedPause);

  expect(pause).toHaveBeenCalledTimes(1);
});

it("provides the previous control returned from useWordPlayer", () => {
  let providedPrevious;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedPrevious = result.controls.previous;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { previous },
    },
  } = renderWordPlayer({ WordControls });

  act(providedPrevious);

  expect(previous).toHaveBeenCalledTimes(1);
});

it("provides the next control returned from useWordPlayer", () => {
  let providedNext;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedNext = result.controls.next;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { next },
    },
  } = renderWordPlayer({ WordControls });

  act(providedNext);

  expect(next).toHaveBeenCalledTimes(1);
});

it("provides the stop control returned from useWordPlayer", () => {
  let providedStop;

  const WordControls = jest.fn(() => {
    const result = useContext(WordPlaybackContext);
    providedStop = result.controls.stop;
  });

  const {
    wordPlayerHookReturnValue: {
      controls: { stop },
    },
    onBackToSetup,
  } = renderWordPlayer({ WordControls });

  act(providedStop);

  expect(stop).toHaveBeenCalledTimes(1);
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
    playAudio: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
    stop: jest.fn(),
  };

  const wordPlayerHookReturnValue = {
    word: words[0],
    isPlaying: true,
    controls,
  };
  useWordPlayer.mockReturnValue(wordPlayerHookReturnValue);

  const WordContent =
    props.WordContent ||
    jest.fn().mockReturnValue(<div data-testid="content" />);
  const WordControls =
    props.WordControls ||
    jest.fn().mockReturnValue(<div data-testid="controls" />);

  render(
    <StoreProvider>
      <WordPlayer words={words} {...props}>
        <WordContent />
        <WordControls />
      </WordPlayer>
    </StoreProvider>,
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

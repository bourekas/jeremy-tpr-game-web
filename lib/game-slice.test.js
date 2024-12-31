import { expect } from "@storybook/test";
import reducer, {
  gameSlice,
  setWords,
  setDisplayTime,
  setIsAutoPlayAudio,
  startGame,
  backToSetup,
  play,
  pause,
  previous,
  next,
  stop,
  selectIsGameStarted,
} from "./game-slice";

const initialState = gameSlice.getInitialState();

it("defaults to null words", () => {
  expect(initialState).toHaveProperty("words", null);
});

it("sets words to the given words when 'setWords' is dispatched", () => {
  const newWords = [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3 " }];
  expect(reducer(initialState, setWords(newWords))).toHaveProperty(
    "words",
    newWords,
  );
});

it("defaults to a display time of 5 seconds", () => {
  expect(initialState).toHaveProperty("setup.displayTime", 5);
});

it("sets the display time to the dispatched display time", () => {
  expect(reducer(initialState, setDisplayTime(10))).toHaveProperty(
    "setup.displayTime",
    10,
  );
});

it("defaults to auto-play audio being enabled", () => {
  expect(initialState).toHaveProperty("setup.isAutoPlayAudio", true);
});

it("sets auto-play audio to the given value when 'setIsAutoPlayAudio' is dispatched", () => {
  expect(reducer(initialState, setIsAutoPlayAudio(false))).toHaveProperty(
    "setup.isAutoPlayAudio",
    false,
  );
});

it("defaults to the game not being started", () => {
  expect(initialState).toHaveProperty("isGameStarted", false);
});

it("starts the game when 'startGame' is dispatched", () => {
  expect(reducer({ isGameStarted: false }, startGame())).toHaveProperty(
    "isGameStarted",
    true,
  );
});

it("stops the game when 'backToSetup' is dispatched", () => {
  expect(reducer({ isGameStarted: true }, backToSetup())).toHaveProperty(
    "isGameStarted",
    false,
  );
});

it("defaults to the first playback index", () => {
  expect(initialState).toHaveProperty("playback.index", 0);
});

it("defaults to the playback playing", () => {
  expect(initialState).toHaveProperty("playback.isPlaying", true);
});

it("plays playback when 'play' is dispatched", () => {
  expect(reducer({ playback: { isPlaying: false } }, play())).toHaveProperty(
    "playback.isPlaying",
    true,
  );
});

it("pauses playback when 'pause' is dispatched", () => {
  expect(reducer({ playback: { isPlaying: true } }, pause())).toHaveProperty(
    "playback.isPlaying",
    false,
  );
});

it("decrements the playback index when 'previous' is dispatched", () => {
  expect(reducer({ playback: { index: 3 } }, previous())).toHaveProperty(
    "playback.index",
    2,
  );
});

it("cycles to the last words index when 'previous' is dispatched from the first index", () => {
  const words = [
    { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3 " },
    { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3 " },
  ];
  expect(reducer({ words, playback: { index: 0 } }, previous())).toHaveProperty(
    "playback.index",
    1,
  );
});

it("increments the playback index when 'next' is dispatched", () => {
  const words = [
    { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3 " },
    { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3 " },
  ];

  expect(reducer({ words, playback: { index: 0 } }, next())).toHaveProperty(
    "playback.index",
    1,
  );
});

it("cycles to the first index when 'next' is dispatched from the last words index", () => {
  const words = [
    { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3 " },
    { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3 " },
  ];
  expect(reducer({ words, playback: { index: 1 } }, next())).toHaveProperty(
    "playback.index",
    0,
  );
});

it("resets to the first index when 'stop' is dispatched", () => {
  expect(reducer({ playback: { index: 5 } }, stop())).toHaveProperty(
    "playback.index",
    0,
  );
});

it("stops playback playing when 'stop' is dispatched", () => {
  expect(reducer({ playback: { isPlaying: true } }, stop())).toHaveProperty(
    "playback.isPlaying",
    false,
  );
});

it("selects 'isGameStarted'", () => {
  const state = { game: { isGameStarted: true } };
  expect(selectIsGameStarted(state)).toBe(true);
});

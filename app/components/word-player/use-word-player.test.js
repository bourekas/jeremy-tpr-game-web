import { renderHook } from "@testing-library/react";
import { createWordPlayerHook } from "./use-word-player";

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];
const setup = { displayTime: 4, isAutoPlayAudio: true };

it("calls useIndexPlayer with the given displayTime and initialIsPlaying", () => {
  const { useIndexPlayer } = renderWordPlayerHook({
    setup: { displayTime: 4 },
    initialIsPlaying: true,
  });

  expect(useIndexPlayer).toHaveBeenCalledWith(
    expect.objectContaining({ displayTime: 4, initialIsPlaying: true }),
  );
});

it("calls useIndexPlayer with the length of the given words", () => {
  const { useIndexPlayer } = renderWordPlayerHook({
    words: [
      { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
      { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
    ],
  });

  expect(useIndexPlayer).toHaveBeenCalledWith(
    expect.objectContaining({ length: 2 }),
  );
});

it("calls useIndexPlayer with the initialIndex equal to the initialWordIndex", () => {
  const { useIndexPlayer } = renderWordPlayerHook({ initialWordIndex: 1 });

  expect(useIndexPlayer).toHaveBeenCalledWith(
    expect.objectContaining({ initialIndex: 1 }),
  );
});

it("returns the word matching the index returned from useIndexPlayer", () => {
  const { result } = renderWordPlayerHook({
    playerHookReturnValue: { index: 1 },
  });

  expect(result.current.word).toEqual(words[1]);
});

it("returns the controls returned from useIndexPlayer", () => {
  const play = jest.fn();
  const pause = jest.fn();
  const previous = jest.fn();
  const next = jest.fn();
  const reset = jest.fn();
  const controls = { play, pause, previous, next, reset };

  const { result } = renderWordPlayerHook({ playerHookReturnValue: controls });

  expect(result.current).toEqual(expect.objectContaining(controls));
});

it("returns isPlaying value returned from useIndexPlayer", () => {
  const { result } = renderWordPlayerHook({
    playerHookReturnValue: { isPlaying: true },
  });

  expect(result.current.isPlaying).toBe(true);
});

it("calls useAudio with the given audioSrc, isAutoPlayAudio, and Audio arguments", () => {
  const { useAudio } = renderWordPlayerHook({
    words: [{ word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" }],
    setup: { isAutoPlayAudio: true },
  });

  expect(useAudio).toHaveBeenCalledWith("a.mp3", true, Audio);
});

it("returns the useAudio return value", () => {
  const audioReturnValue = new Audio("a.mp3");

  const { result } = renderWordPlayerHook({ audioReturnValue });

  expect(result.current.audio).toBe(audioReturnValue);
});

function renderWordPlayerHook(props = {}) {
  const useIndexPlayer = createMockIndexPlayerHook(props.playerHookReturnValue);
  const useAudio = createMockAudioHook(props.audioReturnValue);
  const useWordPlayer = createWordPlayerHook(useIndexPlayer, useAudio);

  const renderResult = renderHook(() =>
    useWordPlayer({ words, setup, ...props }),
  );

  return { useIndexPlayer, useAudio, ...renderResult };
}

function createMockIndexPlayerHook(playerHookReturnValue) {
  return jest.fn().mockReturnValue({
    ...{ index: 0, isPlaying: false },
    ...playerHookReturnValue,
  });
}

function createMockAudioHook(audioReturnValue) {
  return jest.fn().mockReturnValue(audioReturnValue);
}

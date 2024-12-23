import { renderHook } from "@testing-library/react";
import { createWordPlayerHook } from "./use-word-player";

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];
const setup = { displayTime: 4, isAutoPlayAudio: true };

it("forwards words prop as values prop to useValuePlayer", () => {
  const { useValuePlayer } = renderWordPlayerHook({ words });

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining({ values: words }),
  );
});

it("forwards displayTime property of setup prop to useValuePlayer", () => {
  const displayTime = 10;
  const { useValuePlayer } = renderWordPlayerHook({ setup: { displayTime } });

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining({ displayTime }),
  );
});

it("forwards initialWordIndex prop as initialValueIndex to useValuePlayer", () => {
  const initialWordIndex = 1;
  const { useValuePlayer } = renderWordPlayerHook({ initialWordIndex });

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining({ initialValueIndex: initialWordIndex }),
  );
});

it("forwards initialIsPlaying prop to useValuePlayer", () => {
  const initialIsPlaying = true;
  const { useValuePlayer } = renderWordPlayerHook({ initialIsPlaying });

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining({ initialIsPlaying }),
  );
});

it("returns the value prop returned from useValuePlayer as word prop", () => {
  const value = { word: "c", imageSrc: "c.webp", audioSrc: "c.mp3" };
  const valuePlayerHookReturnValue = { value };

  const { result } = renderWordPlayerHook({ valuePlayerHookReturnValue });

  expect(result.current.word).toBe(value);
});

it("returns the controls prop returned from useValuePlayer", () => {
  const controls = { someControl: () => {} };

  const { result } = renderWordPlayerHook({
    valuePlayerHookReturnValue: { controls },
  });

  expect(result.current).toHaveProperty("controls", controls);
});

it("returnsthe isPlaying prop returned from useValuePlayer", () => {
  const isPlaying = true;
  const { result } = renderWordPlayerHook({
    valuePlayerHookReturnValue: { isPlaying },
  });

  expect(result.current.isPlaying).toBe(isPlaying);
});

it("forwards the word audio source returned from useValuePlayer to useAudio", () => {
  const audioSrc = "d.mp3";
  const valuePlayerHookReturnValue = {
    value: { word: "d", imageSrc: "d.webp", audioSrc },
  };

  const { useAudio } = renderWordPlayerHook({ valuePlayerHookReturnValue });

  expect(useAudio).toHaveBeenCalledWith(audioSrc, expect.anything());
});

it("forwards the isAutoPlayAudio prop from setup as isAutoPlay prop to useAudio", () => {
  const isAutoPlayAudio = true;
  const { useAudio } = renderWordPlayerHook({ setup: { isAutoPlayAudio } });

  expect(useAudio).toHaveBeenCalledWith(expect.anything(), isAutoPlayAudio);
});

it("returns the audio returned from useAudio", () => {
  const audioReturnValue = new Audio("a.mp3");

  const { result } = renderWordPlayerHook({ audioReturnValue });

  expect(result.current.audio).toBe(audioReturnValue);
});

function renderWordPlayerHook(props = {}) {
  const useValuePlayer = jest
    .fn()
    .mockReturnValue({ value: words[0], ...props.valuePlayerHookReturnValue });
  const useAudio = jest.fn().mockReturnValue(props.audioReturnValue);
  const useWordPlayer = createWordPlayerHook(useValuePlayer, useAudio);

  const renderResult = renderHook(() =>
    useWordPlayer({ words, setup, ...props }),
  );

  return { useValuePlayer, useAudio, ...renderResult };
}

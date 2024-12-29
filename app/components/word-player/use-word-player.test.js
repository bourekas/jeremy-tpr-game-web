import { renderHook } from "@testing-library/react";
import { createWordPlayerHook } from "./use-word-player";
import { GameDisplayContext } from "@/app/contexts/game-display";
import { act } from "react";
import { SetupContext } from "@/app/contexts/setup";

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];
const setup = { displayTime: 4, isAutoPlayAudio: true };

it("forwards the displayTime returned from useSetup to useValuePlayer", () => {
  const { useValuePlayer } = renderWordPlayerHook();

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining({ displayTime: setup.displayTime }),
  );
});

it("forwards words prop as values prop to useValuePlayer", () => {
  const { useValuePlayer } = renderWordPlayerHook({ words });

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining({ values: words }),
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

  expect(result.current.word).toEqual(expect.objectContaining(value));
});

it("returns the controls prop returned from useValuePlayer", () => {
  const controls = { someControl: () => {} };

  const { result } = renderWordPlayerHook({
    valuePlayerHookReturnValue: { controls },
  });

  expect(result.current).toHaveProperty(
    "controls",
    expect.objectContaining(controls),
  );
});

it("returns the isPlaying prop returned from useValuePlayer", () => {
  const isPlaying = true;
  const { result } = renderWordPlayerHook({
    valuePlayerHookReturnValue: { isPlaying },
  });

  expect(result.current.isPlaying).toBe(isPlaying);
});

it("calls the provided onBackToSetup when calling the stop control", () => {
  const { onBackToSetup, result } = renderWordPlayerHook({
    valuePlayerHookReturnValue: { controls: { stop: () => {} } },
  });

  const stop = result.current.controls.stop;
  act(stop);

  expect(onBackToSetup).toHaveBeenCalled();
});

function renderWordPlayerHook(props = {}) {
  const onBackToSetup = jest.fn();
  const wrapper = ({ children }) => (
    <SetupContext.Provider value={{ setup: setup }}>
      <GameDisplayContext.Provider value={{ onBackToSetup }}>
        {children}
      </GameDisplayContext.Provider>
    </SetupContext.Provider>
  );
  const useValuePlayer = jest
    .fn()
    .mockReturnValue({ value: words[0], ...props.valuePlayerHookReturnValue });
  const useAudio = jest.fn().mockReturnValue(props.audioReturnValue);
  const useWordPlayer = createWordPlayerHook({
    useValuePlayer,
    useAudio,
  });

  const renderResult = renderHook(() => useWordPlayer({ words, ...props }), {
    wrapper,
  });

  return { useValuePlayer, useAudio, onBackToSetup, ...renderResult };
}

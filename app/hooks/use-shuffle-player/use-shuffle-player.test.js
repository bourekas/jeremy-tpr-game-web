import { renderHook } from "@testing-library/react";
import { createShufflePlayerHook } from "./use-shuffle-player";

const values = ["a", "b", "c"];
const shuffledValues = ["b", "c", "a"];

it("forwards the values prop to the shuffle function", () => {
  const { shuffle } = renderShufflePlayerHook();

  expect(shuffle).toHaveBeenCalledWith(values);
});

it("forwards all props unchanged to useValuePlayer, except for the values prop", () => {
  const propsWithoutValuesProp = {
    displayTime: 7,
    initialIsPlaying: true,
    initialValueIndex: 1,
  };
  const { useValuePlayer } = renderShufflePlayerHook({
    values,
    ...propsWithoutValuesProp,
  });

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining(propsWithoutValuesProp),
  );
});

it("forwards the shuffled values returned from the shuffle function to useValuePlayer", () => {
  const { useValuePlayer } = renderShufflePlayerHook();

  expect(useValuePlayer).toHaveBeenCalledWith(
    expect.objectContaining({ values: shuffledValues }),
  );
});

it("returns all props returned from useValuePlayer", () => {
  const valuePlayerHookReturnValue = {
    value: "a",
    isPlaying: true,
    controls: {},
  };

  const { result } = renderShufflePlayerHook({
    valuePlayerHookReturnValue,
  });

  expect(result.current).toBe(valuePlayerHookReturnValue);
});

it("memoizes the returned shuffled values while values prop is unchanged", () => {
  const originalShuffledValues = ["a", "c", "b"];
  const newShuffledValues = ["c", "b", "a"];

  const shuffle = jest
    .fn()
    .mockReturnValueOnce(originalShuffledValues)
    .mockReturnValueOnce(newShuffledValues);

  const { rerender, useValuePlayer } = renderShufflePlayerHook({ shuffle });
  rerender();

  expect(useValuePlayer).toHaveBeenLastCalledWith(
    expect.objectContaining({ values: originalShuffledValues }),
  );
});

function renderShufflePlayerHook(props = {}) {
  const shuffle = props.shuffle || jest.fn().mockReturnValue(shuffledValues);
  const useValuePlayer = jest
    .fn()
    .mockReturnValue(props.valuePlayerHookReturnValue);
  const useShufflePlayer = createShufflePlayerHook(shuffle, useValuePlayer);

  const renderResult = renderHook(() => useShufflePlayer({ values, ...props }));

  return { useValuePlayer, shuffle, ...renderResult };
}

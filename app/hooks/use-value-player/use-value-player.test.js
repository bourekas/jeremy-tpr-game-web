import { renderHook } from "@testing-library/react";
import { createValuePlayerHook } from "./use-value-player";

const values = ["a", "b", "c"];

it("calls useIndexPlayer with the length of the values prop", () => {
  const { useIndexPlayer } = renderValuePlayerHook();

  expect(useIndexPlayer).toHaveBeenCalledWith(
    expect.objectContaining({ length: 3 }),
  );
});

it("forwards displayTime and initialIsPlaying props to useIndexPlayer", () => {
  const props = { displayTime: 5, initialIsPlaying: true };
  const { useIndexPlayer } = renderValuePlayerHook(props);

  expect(useIndexPlayer).toHaveBeenCalledWith(expect.objectContaining(props));
});

it("forwards initialValueIndex prop as initialIndex to useIndexPlayer", () => {
  const { useIndexPlayer } = renderValuePlayerHook({ initialValueIndex: 2 });

  expect(useIndexPlayer).toHaveBeenCalledWith(
    expect.objectContaining({ initialIndex: 2 }),
  );
});

it("returns the isPlaying and controls props from useIndexPlayer", () => {
  const indexPlayerHookReturnValue = {
    isPlaying: true,
    controls: { someControl: () => {} },
  };

  const { result } = renderValuePlayerHook({
    indexPlayerHookReturnValue,
  });

  expect(result.current).toEqual(
    expect.objectContaining(indexPlayerHookReturnValue),
  );
});

it("returns the matching value to the index returned from useIndexPlayer", () => {
  const { result } = renderValuePlayerHook({
    indexPlayerHookReturnValue: { index: 1 },
  });

  expect(result.current).toHaveProperty("value", values[1]);
});

function renderValuePlayerHook(props = {}) {
  const indexPlayerHookReturnValue = props.indexPlayerHookReturnValue || {};
  const useIndexPlayer = jest.fn().mockReturnValue(indexPlayerHookReturnValue);
  const useValuePlayer = createValuePlayerHook(useIndexPlayer);

  const renderResult = renderHook(() => useValuePlayer({ values, ...props }));

  return { useIndexPlayer, ...renderResult };
}

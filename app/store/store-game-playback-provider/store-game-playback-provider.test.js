import { act, useContext } from "react";
import { renderHook } from "@testing-library/react";
import { GamePlaybackContext } from "@/app/contexts";
import StoreProvider from "../store-provider/store-provider";
import StoreGamePlaybackProvider from "./store-game-playback-provider";
import { makeStore } from "@/lib/store";
import { gameSlice } from "@/lib/game-slice";

it.each([0, 4])(
  "provides the playback index from the store for index = %d",
  (index) => {
    const { result } = renderStoreGamePlaybackProvider({ playback: { index } });

    expect(result.current.index).toBe(index);
  },
);

it.each([true, false])(
  "provides isPlaying from the store for isPlaying = %s",
  (isPlaying) => {
    const { result } = renderStoreGamePlaybackProvider({
      playback: { isPlaying },
    });

    expect(result.current.isPlaying).toBe(isPlaying);
  },
);

it("provides 'play' callback that dispatches the play action", () => {
  const { result, reducer } = renderStoreGamePlaybackProvider();

  act(() => result.current.controls.play());

  expect(reducer).toHaveBeenLastCalledWith(
    expect.anything(),
    gameSlice.actions.play(),
  );
});

it("provides 'pause' callback that dispatches the pause action", () => {
  const { result, reducer } = renderStoreGamePlaybackProvider();

  act(() => result.current.controls.pause());

  expect(reducer).toHaveBeenLastCalledWith(
    expect.anything(),
    gameSlice.actions.pause(),
  );
});

it("provides 'previous' callback that dispatches the previous action", () => {
  const { result, reducer } = renderStoreGamePlaybackProvider();

  act(() => result.current.controls.previous());

  expect(reducer).toHaveBeenLastCalledWith(
    expect.anything(),
    gameSlice.actions.previous(),
  );
});

it("provides 'next' callback that dispatches the next action", () => {
  const { result, reducer } = renderStoreGamePlaybackProvider();

  act(() => result.current.controls.next());

  expect(reducer).toHaveBeenLastCalledWith(
    expect.anything(),
    gameSlice.actions.next(),
  );
});

it("provides 'stop' callback that dispatches the stop action", () => {
  const { result, reducer } = renderStoreGamePlaybackProvider();

  act(() => result.current.controls.stop());

  expect(reducer).toHaveBeenLastCalledWith(
    expect.anything(),
    gameSlice.actions.stop(),
  );
});

function renderStoreGamePlaybackProvider({ playback = {} } = {}) {
  const initialState = { game: { playback } };
  const reducer = jest.fn((state) => state);
  const store = makeStore({ initialState, reducer });

  const wrapper = ({ children }) => (
    <StoreProvider store={store}>
      <StoreGamePlaybackProvider>{children}</StoreGamePlaybackProvider>
    </StoreProvider>
  );

  const renderResult = renderHook(() => useContext(GamePlaybackContext), {
    wrapper,
  });

  return { ...renderResult, reducer };
}

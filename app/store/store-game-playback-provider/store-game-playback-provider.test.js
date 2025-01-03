import { useContext } from "react";
import { renderHook } from "@testing-library/react";
import { GamePlaybackContext } from "@/app/contexts";
import StoreProvider from "../store-provider/store-provider";
import StoreGamePlaybackProvider from "./store-game-playback-provider";
import { makeStore } from "@/lib/store";

it.each([0, 4])("provides the playback index %d from the store", (index) => {
  const { result } = renderStoreGamePlaybackProvider({ playback: { index } });

  expect(result.current.index).toBe(index);
});

it.each([true, false])(
  "provides if playback is playing from the store",
  (isPlaying) => {
    const { result } = renderStoreGamePlaybackProvider({
      playback: { isPlaying },
    });

    expect(result.current.isPlaying).toBe(isPlaying);
  },
);

function renderStoreGamePlaybackProvider({ playback }) {
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

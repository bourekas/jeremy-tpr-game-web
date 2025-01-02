import { act, useContext } from "react";
import { renderHook } from "@testing-library/react";
import { GameSetupContext } from "@/app/contexts";
import StoreProvider from "../store-provider/store-provider";
import StoreGameSetupProvider from "./store-game-setup-provider";

it.each([4, 7])(
  "provides the displayTime from the store for displayTime = %s",
  (displayTime) => {
    const { result } = renderStoreGameSetupProvider({ displayTime });

    expect(result.current.displayTime).toBe(displayTime);
  },
);

it("provides setDisplayTime callback that sets the displayTime in the store", () => {
  const { result } = renderStoreGameSetupProvider({ displayTime: 3 });
  act(() => result.current.setDisplayTime(6));

  expect(result.current.displayTime).toBe(6);
});

it.each([true, false])(
  "provides the isAutoPlayAudio from the store for isAutoPlayAudio = %s",
  (isAutoPlayAudio) => {
    const { result } = renderStoreGameSetupProvider({ isAutoPlayAudio });

    expect(result.current.isAutoPlayAudio).toBe(isAutoPlayAudio);
  },
);

it("provides setIsAutoPlayAudio that sets the isAutoPlayAudio in the store", () => {
  const { result } = renderStoreGameSetupProvider({ isAutoPlayAudio: false });
  act(() => result.current.setIsAutoPlayAudio(true));

  expect(result.current.isAutoPlayAudio).toBe(true);
});

function renderStoreGameSetupProvider({ displayTime, isAutoPlayAudio }) {
  const wrapper = ({ children }) => (
    <StoreProvider
      initialState={{ game: { setup: { displayTime, isAutoPlayAudio } } }}
    >
      <StoreGameSetupProvider>{children}</StoreGameSetupProvider>
    </StoreProvider>
  );

  return renderHook(() => useContext(GameSetupContext), { wrapper });
}

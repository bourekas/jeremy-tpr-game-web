import { act, useContext } from "react";
import { renderHook } from "@testing-library/react";
import { GameStatusContext } from "@/app/contexts";
import StoreProvider from "@/app/store/store-provider/store-provider";
import StoreGameStatusProvider from "./store-game-status-provider";

it("provides isGameStarted as true when set to true in the store", () => {
  const { result } = renderGameStatusProvider({ isGameStarted: true });

  expect(result.current.isGameStarted).toBe(true);
});

it("provides isGameStarted as false when set to false in the store", () => {
  const { result } = renderGameStatusProvider({ isGameStarted: false });

  expect(result.current.isGameStarted).toBe(false);
});

it("provides startGame callback that sets isGameStarted to true in the store", () => {
  const { result } = renderGameStatusProvider({ isGameStarted: false });
  act(() => result.current.startGame());

  expect(result.current.isGameStarted).toBe(true);
});

it("provides stopGame callback that sets isGameStarted to false in the store", () => {
  const { result } = renderGameStatusProvider({ isGameStarted: true });
  act(() => result.current.stopGame());

  expect(result.current.isGameStarted).toBe(false);
});

function renderGameStatusProvider({ isGameStarted }) {
  const wrapper = ({ children }) => (
    <StoreProvider initialState={{ game: { isGameStarted } }}>
      <StoreGameStatusProvider>{children}</StoreGameStatusProvider>
    </StoreProvider>
  );

  return renderHook(() => useContext(GameStatusContext), {
    wrapper,
  });
}

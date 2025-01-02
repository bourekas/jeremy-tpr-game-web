"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { useSelector } from "@/lib/hooks";
import { GameStatusContext } from "./contexts";
import { selectIsGameStarted } from "@/lib/game-slice";

export default function StoreProvider({ children, initialState } = {}) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore({ initialState });
  }

  return (
    <Provider store={storeRef.current}>
      <GameStatusProvider>{children}</GameStatusProvider>
    </Provider>
  );
}

function GameStatusProvider({ children }) {
  const isGameStarted = useSelector(selectIsGameStarted);

  return (
    <GameStatusContext.Provider value={{ isGameStarted }}>
      {children}
    </GameStatusContext.Provider>
  );
}

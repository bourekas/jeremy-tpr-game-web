"use client";

import { GameStatusContext } from "@/app/contexts";
import { gameSlice, selectIsGameStarted } from "@/lib/game-slice";
import { useDispatch, useSelector } from "@/lib/hooks";

export default function StoreGameStatusProvider({ children }) {
  const isGameStarted = useSelector(selectIsGameStarted);
  const dispatch = useDispatch();
  const startGame = () => dispatch(gameSlice.actions.startGame());
  const stopGame = () => dispatch(gameSlice.actions.backToSetup());

  return (
    <GameStatusContext.Provider value={{ isGameStarted, startGame, stopGame }}>
      {children}
    </GameStatusContext.Provider>
  );
}

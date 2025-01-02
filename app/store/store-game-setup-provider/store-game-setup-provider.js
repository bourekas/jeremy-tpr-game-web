"use client";

import { GameSetupContext } from "@/app/contexts";
import { gameSlice, selectSetup } from "@/lib/game-slice";
import { useDispatch, useSelector } from "@/lib/hooks";

export default function StoreGameSetupProvider({ children }) {
  const { displayTime, isAutoPlayAudio } = useSelector(selectSetup);
  const dispatch = useDispatch();
  const setDisplayTime = (dt) => dispatch(gameSlice.actions.setDisplayTime(dt));
  const setIsAutoPlayAudio = (autoPlay) =>
    dispatch(gameSlice.actions.setIsAutoPlayAudio(autoPlay));

  return (
    <GameSetupContext.Provider
      value={{
        displayTime,
        isAutoPlayAudio,
        setDisplayTime,
        setIsAutoPlayAudio,
      }}
    >
      {children}
    </GameSetupContext.Provider>
  );
}

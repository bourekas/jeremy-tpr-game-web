"use client";

import { useContext, useMemo } from "react";
import { GamePlaybackContext, GameWordsContext } from "@/app/contexts";
import { gameSlice } from "@/lib/game-slice";
import { useDispatch, useSelector } from "@/lib/hooks";

export default function StoreGamePlaybackProvider({ children }) {
  const words = useContext(GameWordsContext);
  const index = useSelector((state) => state.game.playback.index);
  const isPlaying = useSelector((state) => state.game.playback.isPlaying);
  const dispatch = useDispatch();
  const controls = Object.fromEntries(
    Object.entries(gameSlice.actions).map(([actionName, action]) => [
      actionName,
      () => dispatch(action()),
    ]),
  );
  const word = words[index];
  const audioSrc = word?.audioSrc;
  const audio = useMemo(() => audioSrc && new Audio(audioSrc), [audioSrc]);
  const playAudio = () => audio?.play();

  return (
    <GamePlaybackContext.Provider
      value={{
        word: { ...word, audio },
        index,
        isPlaying,
        controls: { ...controls, playAudio },
      }}
    >
      {children}
    </GamePlaybackContext.Provider>
  );
}

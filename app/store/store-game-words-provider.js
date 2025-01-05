"use client";

import { useDispatch } from "@/lib/hooks";
import { setWords } from "@/lib/game-slice";
import { useEffect } from "react";
import { GameWordsContext } from "@/app/contexts";

export function StoreGameWordsProvider({ words, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWords(words));
  }, [words, dispatch]);

  return (
    <GameWordsContext.Provider value={words}>
      {children}
    </GameWordsContext.Provider>
  );
}

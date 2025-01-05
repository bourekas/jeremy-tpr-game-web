"use client";

import { useDispatch } from "@/lib/hooks";
import { setWords } from "@/lib/game-slice";
import { createContext, useEffect } from "react";

export const WordsContext = createContext();

export function WordsProvider({ words, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWords(words));
  }, [words, dispatch]);

  return (
    <WordsContext.Provider value={words}>{children}</WordsContext.Provider>
  );
}

"use client";

import { createContext } from "react";

export const WordsContext = createContext();

export function WordsProvider({ words, children }) {
  return (
    <WordsContext.Provider value={words}>{children}</WordsContext.Provider>
  );
}

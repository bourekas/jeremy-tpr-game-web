"use client";

import { useContext, useMemo } from "react";
import { shuffle as lodashShuffle } from "lodash";
import { WordsContext } from "@/app/contexts/words";

export default function ShuffleWordPlayer({
  shuffle = lodashShuffle,
  children,
}) {
  const words = useContext(WordsContext);
  const shuffledWords = useMemo(() => shuffle(words), [shuffle, words]);

  return (
    <WordsContext.Provider value={shuffledWords}>
      {children}
    </WordsContext.Provider>
  );
}

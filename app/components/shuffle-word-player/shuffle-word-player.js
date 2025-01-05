"use client";

import { useContext, useMemo } from "react";
import { shuffle as lodashShuffle } from "lodash";
import { GameWordsContext } from "@/app/contexts";

export default function ShuffleWordPlayer({
  shuffle = lodashShuffle,
  children,
}) {
  const words = useContext(GameWordsContext);
  const shuffledWords = useMemo(() => shuffle(words), [shuffle, words]);

  return (
    <GameWordsContext.Provider value={shuffledWords}>
      {children}
    </GameWordsContext.Provider>
  );
}

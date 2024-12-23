import { useMemo } from "react";

export function createShufflePlayerHook(shuffle, useValuePlayer) {
  return function useShufflePlayer({ values, ...props }) {
    const shuffledValues = useMemo(() => shuffle(values), [values]);

    return useValuePlayer({ values: shuffledValues, ...props });
  };
}

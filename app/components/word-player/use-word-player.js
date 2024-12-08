import { useState, useRef, useEffect, useMemo } from "react";

export default function useWordPlayer(
  words = [],
  displayTime = 5,
  initialIsPlaying = false,
  initialWordIndex = 0,
) {
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const word = words[wordIndex];
  const timeoutIdRef = useRef();

  useEffect(() => {
    if (!isPlaying) return;

    timeoutIdRef.current = setTimeout(
      () => setWordIndex((wordIndex + 1) % words.length),
      displayTime * 1000,
    );

    return cancelNextWord;
  }, [wordIndex, words, isPlaying, displayTime]);

  const play = () => {
    cancelNextWord();
    setIsPlaying(true);
  };

  const pause = () => {
    cancelNextWord();
    setIsPlaying(false);
  };

  const reset = () => {
    cancelNextWord();
    setIsPlaying(false);
    setWordIndex(0);
  };

  const next = () => {
    cancelNextWord();
    setNextWordIndex();
  };

  const previous = () => {
    setWordIndex((i) => (i === 0 ? words.length - 1 : i - 1));
  };

  const cancelNextWord = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const setNextWordIndex = () => {
    setWordIndex((i) => (i + 1) % words.length);
  };

  return { word, isPlaying, play, pause, reset, previous, next };
}

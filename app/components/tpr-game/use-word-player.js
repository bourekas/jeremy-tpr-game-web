import { useState, useRef, useEffect } from "react";

export default function useWordPlayer(
  words = [],
  displayTime = 5,
  initialWordIndex = -1,
) {
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const word = words[wordIndex];
  const timeoutIdRef = useRef();

  useEffect(() => {
    if (!isPlaying || wordIndex === -1) return;

    timeoutIdRef.current = setTimeout(setNextWordIndex, displayTime * 1000);
  }, [wordIndex]);

  const play = () => {
    cancelNextWord();
    setIsPlaying(true);
    setWordIndex((i) => (i === -1 ? 0 : i));
  };

  const pause = () => {
    cancelNextWord();
    setIsPlaying(false);
  };

  const reset = () => {
    cancelNextWord();
    setWordIndex(-1);
  };

  const next = () => {
    cancelNextWord();
    setNextWordIndex();
  };

  const cancelNextWord = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const setNextWordIndex = () => {
    setWordIndex((i) => {
      const nextIndex = i + 1;
      return nextIndex < words.length ? nextIndex : -1;
    });
  };

  return { word, isPlaying, play, pause, reset, next };
}

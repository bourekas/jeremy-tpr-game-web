import { useState, useRef, useEffect, useMemo } from "react";

export default function useIndexPlayer({
  length = 0,
  displayTime = 5,
  initialIndex = 0,
  initialIsPlaying = false,
}) {
  const [index, setIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const timeoutIdRef = useRef();

  useEffect(() => {
    if (!isPlaying) return;

    timeoutIdRef.current = setTimeout(
      () => setIndex((index + 1) % length),
      displayTime * 1000,
    );

    return cancelNextWord;
  }, [index, length, isPlaying, displayTime]);

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
    setIndex(0);
  };

  const next = () => {
    cancelNextWord();
    setNextWordIndex();
  };

  const previous = () => {
    setIndex((i) => (i === 0 ? length - 1 : i - 1));
  };

  const cancelNextWord = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const setNextWordIndex = () => {
    setIndex((i) => (i + 1) % length);
  };

  return { index, isPlaying, play, pause, reset, previous, next };
}

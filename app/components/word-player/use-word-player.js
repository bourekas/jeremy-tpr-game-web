import { useState, useRef, useEffect } from "react";

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

    timeoutIdRef.current = setTimeout(setNextWordIndex, displayTime * 1000);
    return cancelNextWord;
  }, [wordIndex, isPlaying, displayTime]);

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

  const cancelNextWord = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const setNextWordIndex = () => {
    setWordIndex((i) => (i + 1) % words.length);
  };

  return { word, isPlaying, play, pause, reset, next };
}

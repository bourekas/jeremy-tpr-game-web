import { useState, useRef, useEffect } from "react";

export default function useWordPlayer(
  words = [],
  displayTime = 5,
  initialWordIndex = -1,
) {
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const word = words[wordIndex];
  const timeoutIdRef = useRef();

  useEffect(() => {
    if (wordIndex < 0 || wordIndex >= words.length) return;

    timeoutIdRef.current = setTimeout(setNextWordIndex, displayTime * 1000);
  }, [wordIndex]);

  const play = () => {
    next();
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
    setWordIndex((i) => (i === words.length ? 0 : i + 1));
  };

  return { word, play, reset, next };
}

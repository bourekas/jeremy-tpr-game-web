import { useState, useRef } from "react";

export default function useWordPlayer(words = [], initialWordIndex = -1) {
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const word = words[wordIndex];
  const timeoutIdRef = useRef();
  const displayTimeRef = useRef(5);

  const play = (displayTime) => {
    displayTimeRef.current = displayTime;
    nextWord(wordIndex);
  };

  const reset = () => {
    unscheduleNextWord();
    setWordIndex(-1);
  };

  const next = () => {
    unscheduleNextWord();
    nextWord(wordIndex);
  };

  const nextWord = (wordIndex) => {
    setNextWordIndex();

    if (wordIndex + 1 < words.length) {
      scheduleNextWord(wordIndex + 1);
    }
  };

  const scheduleNextWord = (wordIndex) => {
    timeoutIdRef.current = setTimeout(
      () => nextWord(wordIndex),
      displayTimeRef.current * 1000,
    );
  };

  const unscheduleNextWord = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const setNextWordIndex = () => {
    setWordIndex((i) => {
      const nextIndex = i + 1;
      return nextIndex < words.length ? nextIndex : -1;
    });
  };

  return { word, play, reset, next };
}

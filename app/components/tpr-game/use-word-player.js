import { useState, useRef } from "react";

export default function useWordPlayer(words = [], initialWordIndex = -1) {
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const word = words[wordIndex];
  const timeoutIdRef = useRef();
  const displayTimeRef = useRef(5);

  const play = (displayTime) => {
    displayTimeRef.current = displayTime;
    nextWord();
  };

  const reset = () => {
    unscheduleNextWord();
    setWordIndex(-1);
  };

  const next = () => {
    unscheduleNextWord();
    nextWord();
  };

  const nextWord = () => {
    setNextWordIndex();
    scheduleNextWord();
  };

  const scheduleNextWord = () => {
    if (ended()) return;
    timeoutIdRef.current = setTimeout(nextWord, displayTimeRef.current * 1000);
  };

  const unscheduleNextWord = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const setNextWordIndex = () => {
    if (ended()) return;

    setWordIndex((i) => i + 1);
  };

  const ended = () => {
    return wordIndex >= words.length;
  };

  return { word, play, reset, next };
}

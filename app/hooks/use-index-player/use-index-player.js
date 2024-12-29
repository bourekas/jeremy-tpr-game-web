import { useRef, useCallback } from "react";
import useIndex from "./use-index";

export default function useIndexPlayer({
  length = 0,
  displayTime = 5,
  initialIndex = 0,
  initialIsPlaying = false,
}) {
  const {
    index,
    isPlaying,
    play: dispatchPlay,
    pause: dispatchPause,
    previous: dispatchPrevious,
    next: dispatchNext,
    stop: dispatchStop,
  } = useIndex({
    length,
    initialIndex,
    initialIsPlaying,
  });
  const timeoutIdRef = useRef();

  const cancelNextWord = useCallback(() => {
    clearTimeout(timeoutIdRef.current);
  }, []);

  const scheduleNextWord = useCallback(() => {
    if (!isPlaying) return;

    timeoutIdRef.current = setTimeout(() => {
      dispatchNext();
      scheduleNextWord();
    }, displayTime * 1000);
  }, [isPlaying, displayTime, dispatchNext]);

  const play = () => {
    cancelNextWord();
    dispatchPlay();
  };

  const pause = () => {
    cancelNextWord();
    dispatchPause();
  };

  const stop = () => {
    cancelNextWord();
    dispatchStop();
  };

  const next = () => {
    cancelNextWord();
    dispatchNext();
    scheduleNextWord();
  };

  const previous = () => {
    cancelNextWord();
    dispatchPrevious();
    scheduleNextWord();
  };

  return {
    index,
    isPlaying,
    controls: { play, pause, previous, next, stop },
    scheduleNextWord,
    cancelNextWord,
  };
}

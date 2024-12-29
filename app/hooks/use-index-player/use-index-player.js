import { useRef, useEffect, useCallback } from "react";
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
    dispatch,
  } = useIndex({
    length,
    initialIndex,
    initialIsPlaying,
  });
  const timeoutIdRef = useRef();

  const scheduleNext = useCallback(() => {
    if (!isPlaying) return;

    timeoutIdRef.current = setTimeout(() => {
      dispatch({ type: "next" });
      scheduleNext();
    }, displayTime * 1000);
  }, [isPlaying, displayTime, dispatch]);

  useEffect(() => {
    scheduleNext();

    return cancelNextWord;
  }, [scheduleNext]);

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
    scheduleNext();
  };

  const previous = () => {
    cancelNextWord();
    dispatchPrevious();
    scheduleNext();
  };

  const cancelNextWord = () => {
    clearTimeout(timeoutIdRef.current);
  };

  return {
    index,
    isPlaying,
    controls: { play, pause, previous, next, stop },
  };
}

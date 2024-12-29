import { useRef, useEffect, useReducer, useCallback } from "react";

export default function useIndexPlayer({
  length = 0,
  displayTime = 5,
  initialIndex = 0,
  initialIsPlaying = false,
}) {
  const reducer = (state, action) => {
    const { index: i } = state;
    let newState = null;

    switch (action.type) {
      case "play": {
        newState = { isPlaying: true };
        break;
      }
      case "pause": {
        newState = { isPlaying: false };
        break;
      }
      case "previous": {
        newState = { index: i ? i - 1 : length - 1 };
        break;
      }
      case "next": {
        newState = { index: (i + 1) % length };
        break;
      }
      case "stop": {
        newState = { index: 0, isPlaying: false };
        break;
      }
    }

    return { ...state, ...newState };
  };
  const initialState = {
    index: initialIndex,
    isPlaying: initialIsPlaying,
  };
  const [{ index, isPlaying }, dispatch] = useReducer(reducer, initialState);
  const timeoutIdRef = useRef();

  const scheduleNext = useCallback(() => {
    if (!isPlaying) return;

    timeoutIdRef.current = setTimeout(() => {
      dispatch({ type: "next" });
      scheduleNext();
    }, displayTime * 1000);
  }, [isPlaying, displayTime]);

  useEffect(() => {
    scheduleNext();

    return cancelNextWord;
  }, [scheduleNext]);

  const play = () => {
    cancelNextWord();
    dispatch({ type: "play" });
  };

  const pause = () => {
    cancelNextWord();
    dispatch({ type: "pause" });
  };

  const stop = () => {
    cancelNextWord();
    dispatch({ type: "stop" });
  };

  const next = () => {
    cancelNextWord();
    dispatch({ type: "next" });
    scheduleNext();
  };

  const previous = () => {
    cancelNextWord();
    dispatch({ type: "previous" });
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

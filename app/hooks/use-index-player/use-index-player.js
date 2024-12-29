import { useRef, useEffect, useReducer } from "react";

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

  useEffect(() => {
    if (!isPlaying) return;

    timeoutIdRef.current = setTimeout(
      () => dispatch({ type: "next" }),
      displayTime * 1000,
    );

    return cancelNextWord;
  }, [index, isPlaying, displayTime]);

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
  };

  const previous = () => {
    dispatch({ type: "previous" });
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

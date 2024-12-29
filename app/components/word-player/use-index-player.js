import { useReducer } from "react";

export default function useIndexPlayer({
  length = 0,
  initialIndex = 0,
  initialIsPlaying = true,
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

  const action = (type) => () => dispatch({ type });
  const play = action("play");
  const pause = action("pause");
  const previous = action("previous");
  const next = action("next");
  const stop = action("stop");

  return { index, isPlaying, controls: { play, pause, previous, next, stop } };
}

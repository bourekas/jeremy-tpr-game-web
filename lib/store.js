import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game-slice";

export const makeStore = ({ initialState } = {}) => {
  return configureStore({
    preloadedState: initialState,
    reducer: {
      game: gameReducer,
    },
  });
};

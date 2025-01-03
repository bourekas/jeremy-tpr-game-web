import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game-slice";

const defaultReducer = {
  game: gameReducer,
};

export const makeStore = ({ initialState, reducer = defaultReducer } = {}) => {
  return configureStore({
    preloadedState: initialState,
    reducer,
  });
};

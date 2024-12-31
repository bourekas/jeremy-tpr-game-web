import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
    },
  });
};

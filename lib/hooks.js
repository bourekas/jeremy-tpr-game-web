"use client";

import * as reactRedux from "react-redux";
import { selectIsGameStarted } from "./game-slice";

export const useDispatch = reactRedux.useDispatch.withTypes();
export const useSelector = reactRedux.useSelector.withTypes();
export const useStore = reactRedux.useStore.withTypes();

export const useIsGameStarted = () => {
  return useSelector(selectIsGameStarted);
};

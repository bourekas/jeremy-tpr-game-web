"use client";

import * as redux from "react-redux";

export const useDispatch = redux.useDispatch.withTypes();
export const useSelector = redux.useSelector.withTypes();
export const useStore = redux.useStore.withTypes();

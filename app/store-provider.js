"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

export default function StoreProvider({ children, initialState } = {}) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore({ initialState });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

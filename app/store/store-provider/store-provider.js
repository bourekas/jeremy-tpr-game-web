"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { useDispatch, useSelector } from "@/lib/hooks";
import { GameSetupContext } from "../../contexts";
import {
  selectSetup,
  setDisplayTime,
  setIsAutoPlayAudio,
} from "@/lib/game-slice";

export default function StoreProvider({ children, initialState } = {}) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore({ initialState });
  }

  return (
    <Provider store={storeRef.current}>
      <SetupProvider>{children}</SetupProvider>
    </Provider>
  );
}

function SetupProvider({ children }) {
  const setup = useSelector(selectSetup);
  const dispatch = useDispatch();
  const dispatchSetDisplayTime = () => dispatch(setDisplayTime());
  const dispatchSetIsAutoPlayAudio = () => dispatch(setIsAutoPlayAudio());

  return (
    <GameSetupContext.Provider
      value={{
        ...setup,
        setDisplayTime: dispatchSetDisplayTime,
        setIsAutoPlayAudio: dispatchSetIsAutoPlayAudio,
      }}
    >
      {children}
    </GameSetupContext.Provider>
  );
}

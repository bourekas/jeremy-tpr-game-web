"use client";

import { createContext, useContext, useState } from "react";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };
const SetupContext = createContext(defaultSetup);
const SetupChangeContext = createContext(null);

export function SetupProvider({ children }) {
  const [setup, setSetup] = useState(defaultSetup);

  return (
    <SetupContext.Provider value={setup}>
      <SetupChangeContext.Provider value={setSetup}>
        {children}
      </SetupChangeContext.Provider>
    </SetupContext.Provider>
  );
}

export function useSetup() {
  return useContext(SetupContext);
}

export function useSetupChange() {
  const onSetupChange = useContext(SetupChangeContext);

  if (!onSetupChange) {
    throw new Error("Used useSetupChange without a SetupProvider");
  }

  return onSetupChange;
}

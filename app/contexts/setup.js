"use client";

import { createContext, useState } from "react";

export const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };
export const SetupContext = createContext({ setup: defaultSetup });

export function SetupProvider({ initialSetup = defaultSetup, children }) {
  const [setup, setSetup] = useState(initialSetup);
  const setupChange = (key) => (val) => setSetup((s) => ({ ...s, [key]: val }));
  const setDisplayTime = setupChange("displayTime");
  const setIsAutoPlayAudio = setupChange("isAutoPlayAudio");

  return (
    <SetupContext.Provider
      value={{ setup, setDisplayTime, setIsAutoPlayAudio }}
    >
      {children}
    </SetupContext.Provider>
  );
}

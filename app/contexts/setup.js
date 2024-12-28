"use client";

import { createContext, useContext, useState } from "react";

export const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };
export const SetupContext = createContext({ setup: defaultSetup });
export const SetupChangeContext = createContext(null);

export function SetupProvider({ initialSetup = defaultSetup, children }) {
  const [setup, setSetup] = useState(initialSetup);
  const setupChange = (key) => (val) => setSetup((s) => ({ ...s, [key]: val }));
  const setDisplayTime = setupChange("displayTime");
  const setIsAutoPlayAudio = setupChange("isAutoPlayAudio");

  return (
    <SetupContext.Provider value={{ setup }}>
      <SetupChangeContext.Provider
        value={{ setDisplayTime, setIsAutoPlayAudio }}
      >
        {children}
      </SetupChangeContext.Provider>
    </SetupContext.Provider>
  );
}

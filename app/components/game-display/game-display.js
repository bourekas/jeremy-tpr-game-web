"use client";

import { useState } from "react";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

export function createGameDisplayComponent(Setup, Words) {
  return function GameDisplay({
    words,
    initialIsGameStarted = false,
    initialSetup = defaultSetup,
  }) {
    const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);
    const [setup, setSetup] = useState(initialSetup);
    const handleStart = () => setIsGameStarted(true);
    const handleBackToSetup = () => setIsGameStarted(false);

    return isGameStarted ? (
      <Words words={words} onBackToSetup={handleBackToSetup} />
    ) : (
      <Setup setup={setup} onSetupChange={setSetup} onStart={handleStart} />
    );
  };
}

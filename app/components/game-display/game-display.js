"use client";

import { useState } from "react";
import { GameDisplayContext } from "@/app/contexts/game-display";

export function createGameDisplayComponent(Setup, Words) {
  return function GameDisplay({ words, initialIsGameStarted = false }) {
    const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);
    const handleStart = () => setIsGameStarted(true);
    const handleBackToSetup = () => setIsGameStarted(false);
    const callbacks = {
      onStart: handleStart,
      onBackToSetup: handleBackToSetup,
    };

    return (
      <GameDisplayContext.Provider value={callbacks}>
        {isGameStarted ? <Words words={words} /> : <Setup />}
      </GameDisplayContext.Provider>
    );
  };
}

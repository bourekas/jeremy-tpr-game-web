"use client";

import { useState } from "react";

export function createGameDisplayComponent(Setup, Words) {
  return function GameDisplay({ words, initialIsGameStarted = false }) {
    const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);
    const handleStart = () => setIsGameStarted(true);
    const handleBackToSetup = () => setIsGameStarted(false);

    return isGameStarted ? (
      <Words words={words} onBackToSetup={handleBackToSetup} />
    ) : (
      <Setup onStart={handleStart} />
    );
  };
}

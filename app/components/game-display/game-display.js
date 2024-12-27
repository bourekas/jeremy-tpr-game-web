"use client";

import { useState } from "react";
import { GameDisplayContext } from "@/app/contexts/game-display";

export default function GameDisplay({
  setup,
  words,
  initialIsGameStarted = false,
}) {
  const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);

  const handleStart = () => setIsGameStarted(true);
  const handleBackToSetup = () => setIsGameStarted(false);
  const callbacks = {
    onStart: handleStart,
    onBackToSetup: handleBackToSetup,
  };

  return (
    <GameDisplayContext.Provider value={callbacks}>
      {isGameStarted ? words : setup}
    </GameDisplayContext.Provider>
  );
}

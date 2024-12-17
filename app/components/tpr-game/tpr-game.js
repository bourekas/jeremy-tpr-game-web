"use client";

import { useState } from "react";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

export default function TprGame({
  words,
  initialIsGameStarted = false,
  initialSetup = defaultSetup,
  Words,
  Setup,
}) {
  const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);
  const [setup, setSetup] = useState(initialSetup);
  const handleStart = () => setIsGameStarted(true);
  const handleBackToSetup = () => setIsGameStarted(false);

  return isGameStarted ? (
    <Words setup={setup} words={words} onBackToSetup={handleBackToSetup} />
  ) : (
    <Setup setup={setup} onSetupChange={setSetup} onStart={handleStart} />
  );
}

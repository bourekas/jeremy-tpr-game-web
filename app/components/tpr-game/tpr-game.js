"use client";

import { useState } from "react";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

export default function TprGame({
  Setup,
  Words,
  words,
  initialIsGameStarted = false,
  initialSetup = defaultSetup,
}) {
  const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);
  const [setup, setSetup] = useState(initialSetup);
  const handleStart = () => setIsGameStarted(true);
  const handleBackToSetup = () => setIsGameStarted(false);

  return isGameStarted ? (
    <Words words={words} setup={setup} onBackToSetup={handleBackToSetup} />
  ) : (
    <Setup setup={setup} onSetupChange={setSetup} onStart={handleStart} />
  );
}

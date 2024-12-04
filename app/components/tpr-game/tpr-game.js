"use client";

import { useState } from "react";
import DefaultSetupMenu from "../setup-menu/setup-menu";
import DefaultWordPlayer from "../word-player/word-player";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

export default function TprGame({
  words,
  initialHasStarted = false,
  initialSetup = defaultSetup,
  SetupMenu = DefaultSetupMenu,
  WordPlayer = DefaultWordPlayer,
}) {
  const [setup, setSetup] = useState(initialSetup);
  const [hasStarted, setHasStarted] = useState(initialHasStarted);

  const handleStart = () => setHasStarted(true);
  const handleBackToSetup = () => setHasStarted(false);

  if (!hasStarted) {
    return (
      <SetupMenu setup={setup} onSetupChange={setSetup} onStart={handleStart} />
    );
  }

  return (
    <WordPlayer words={words} setup={setup} onBackToSetup={handleBackToSetup} />
  );
}

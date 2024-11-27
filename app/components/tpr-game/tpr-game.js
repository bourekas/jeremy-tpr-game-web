"use client";

import { useState } from "react";
import DefaultSetupMenu from "../setup-menu/setup-menu";
import DefaultWordPlayer from "../word-player/word-player";

export default function TprGame({
  words,
  initialHasStarted = false,
  SetupMenu = DefaultSetupMenu,
  WordPlayer = DefaultWordPlayer,
}) {
  const [displayTime, setDisplayTime] = useState(5);
  const [hasStarted, setHasStarted] = useState(initialHasStarted);
  const handleStart = () => setHasStarted(true);
  const handleBackToSetup = () => setHasStarted(false);

  if (!hasStarted) {
    return (
      <SetupMenu
        displayTime={displayTime}
        onDisplayTimeChange={setDisplayTime}
        onStart={handleStart}
      />
    );
  }

  return (
    <WordPlayer
      words={words}
      displayTime={displayTime}
      onBackToSetup={handleBackToSetup}
    />
  );
}

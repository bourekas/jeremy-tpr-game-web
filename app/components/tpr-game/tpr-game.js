"use client";

import { useState } from "react";
import DefaultSetupMenu from "../setup-menu/setup-menu";
import DefaultWordPlayer from "../word-player/word-player";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

export default function TprGame({
  words,
  initialIsGameStarted = false,
  initialSetup = defaultSetup,
  SetupMenu = DefaultSetupMenu,
  WordPlayer = DefaultWordPlayer,
}) {
  const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);
  const [setup, setSetup] = useState(initialSetup);
  const handleStart = () => setIsGameStarted(true);
  const handleBackToSetup = () => setIsGameStarted(false);

  return isGameStarted ? (
    <WordPlayer words={words} setup={setup} onBackToSetup={handleBackToSetup} />
  ) : (
    <SetupMenu setup={setup} onSetupChange={setSetup} onStart={handleStart} />
  );
}

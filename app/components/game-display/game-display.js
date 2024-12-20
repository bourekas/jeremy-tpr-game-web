"use client";

import { useState } from "react";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

export default function GameDisplay({
  words,
  initialIsGameStarted = false,
  initialSetup = defaultSetup,
  renderSetup,
  renderWords,
}) {
  const [isGameStarted, setIsGameStarted] = useState(initialIsGameStarted);
  const [setup, setSetup] = useState(initialSetup);
  const handleStart = () => setIsGameStarted(true);
  const handleBackToSetup = () => setIsGameStarted(false);

  return isGameStarted
    ? renderWords(setup, words, handleBackToSetup)
    : renderSetup(setup, setSetup, handleStart);
}

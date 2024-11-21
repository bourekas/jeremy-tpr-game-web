"use client";

import DefaultSetupMenu from "../setup-menu/setup-menu";
import DefaultWordCard from "../word-card/word-card";
import defaultUseWordRotation from "./use-word-rotation";

export default function TprGame({
  words,
  SetupMenu = DefaultSetupMenu,
  WordCard = DefaultWordCard,
  useWordRotation = defaultUseWordRotation,
}) {
  const { word, start, stop, next } = useWordRotation(words);
  const handleStart = ({ displayTime }) => start(displayTime);

  return word ? (
    <WordCard {...word} onBackToSetup={stop} onNextWord={next} />
  ) : (
    <SetupMenu onStart={handleStart} />
  );
}

"use client";

import DefaultSetupMenu from "../setup-menu/setup-menu";
import DefaultWordCard from "../word-card/word-card";
import defaultUseWordPlayer from "./use-word-player";

export default function TprGame({
  words,
  SetupMenu = DefaultSetupMenu,
  WordCard = DefaultWordCard,
  useWordPlayer = defaultUseWordPlayer,
}) {
  const { word, play, stop, next } = useWordPlayer(words);
  const audio = word?.audioSrc && new Audio(word.audioSrc);
  const handleStart = ({ displayTime }) => play(displayTime);

  return word ? (
    <WordCard
      word={word.word}
      imageSrc={word?.imageSrc}
      audio={audio}
      onBackToSetup={stop}
      onNextWord={next}
    />
  ) : (
    <SetupMenu onStart={handleStart} />
  );
}

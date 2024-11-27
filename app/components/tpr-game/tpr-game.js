"use client";

import { useState } from "react";
import DefaultSetupMenu from "../setup-menu/setup-menu";
import DefaultWordCard from "../word-card/word-card";
import defaultUseWordPlayer from "./use-word-player";

export default function TprGame({
  words,
  SetupMenu = DefaultSetupMenu,
  WordCard = DefaultWordCard,
  useWordPlayer = defaultUseWordPlayer,
}) {
  const [displayTime, setDisplayTime] = useState(5);
  const { word, isPlaying, play, pause, reset, next } = useWordPlayer(
    words,
    displayTime,
  );
  const audio = word?.audioSrc && new Audio(word.audioSrc);

  return word ? (
    <WordCard
      key={word.word}
      word={word.word}
      imageSrc={word?.imageSrc}
      audio={audio}
      isPlaying={isPlaying}
      onPlay={play}
      onPause={pause}
      onBackToSetup={reset}
      onNextWord={next}
    />
  ) : (
    <SetupMenu
      displayTime={displayTime}
      onDisplayTimeChange={setDisplayTime}
      onStart={play}
    />
  );
}

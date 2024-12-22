"use client";

import { useMemo } from "react";
import useIndexPlayer from "./use-index-player";
import useAudio from "./use-audio";
import Box from "@mui/material/Box";
import {
  PlayAudioButton,
  BackToSetupButton,
  PreviousWordButton,
  PlayPauseButton,
  NextWordButton,
  StopButton,
} from "../word-controls/word-controls";
import { shuffle } from "lodash";
import { createWordPlayerHook } from "./use-word-player";

const useWordPlayer = createWordPlayerHook(useIndexPlayer, useAudio);

export default function WordPlayer({
  setup = {},
  words,
  renderWord,
  onBackToSetup,
  initialWordIndex,
  initialIsPlaying = true,
  processWords = shuffle,
}) {
  const processedWords = useMemo(
    () => processWords(words),
    [words, processWords],
  );
  const { word, audio, isPlaying, play, pause, reset, previous, next } =
    useWordPlayer({
      words: processedWords,
      setup,
      initialIsPlaying,
      initialWordIndex,
    });

  const handleBackToSetup = () => {
    reset();
    onBackToSetup();
  };

  const handlePlayAudio = () => audio.play();
  const handleTogglePlay = isPlaying ? pause : play;

  return (
    <>
      <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
        <BackToSetupButton onClick={handleBackToSetup} />
      </Box>
      {renderWord(word.word, word.word, word.imageSrc)}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <PlayAudioButton onClick={handlePlayAudio} />
        <PreviousWordButton onClick={previous} />
        <PlayPauseButton isPlaying={isPlaying} onClick={handleTogglePlay} />
        <NextWordButton onClick={next} />
        <StopButton onClick={handleBackToSetup} />
      </Box>
    </>
  );
}

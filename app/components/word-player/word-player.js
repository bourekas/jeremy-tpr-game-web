"use client";

import { useMemo } from "react";
import usePlayer from "./use-player";
import useAudio from "./use-audio";
import Box from "@mui/material/Box";
import {
  PlayAudioButton,
  BackToSetupButton,
  PreviousWordButton,
  PlayPauseButton,
  NextWordButton,
  StopButton,
} from "../controls/controls";
import { shuffle } from "lodash";

export default function WordPlayer({
  setup = {},
  words,
  renderWord,
  onBackToSetup,
  initialWordIndex,
  initialIsPlaying = true,
  Audio = window.Audio,
  processWords = shuffle,
}) {
  const processedWords = useMemo(
    () => processWords(words),
    [words, processWords],
  );
  const { index, isPlaying, play, pause, reset, previous, next } = usePlayer({
    length: processedWords.length,
    displayTime: setup.displayTime,
    initialIsPlaying,
    initialIndex: initialWordIndex,
  });
  const word = processedWords[index];
  const audio = useAudio(word.audioSrc, setup.isAutoPlayAudio, Audio);

  const handleBackToSetup = () => {
    reset();
    onBackToSetup();
  };

  const handlePlayAudio = () => audio.play();
  const handleTogglePlay = isPlaying ? pause : play;

  return (
    <Box>
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
    </Box>
  );
}

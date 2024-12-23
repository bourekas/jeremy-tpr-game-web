"use client";

import Box from "@mui/material/Box";
import { shuffle } from "lodash";
import useIndexPlayer from "../../hooks/use-index-player/use-index-player";
import { createValuePlayerHook } from "../../hooks/use-value-player/use-value-player";
import { createShufflePlayerHook } from "@/app/hooks/use-shuffle-player/use-shuffle-player";
import { createWordPlayerHook } from "../../hooks/use-word-player/use-word-player";
import useAudio from "../../hooks/use-audio/use-audio";
import WordControls from "../word-controls/word-controls";
import ActionButton from "../action-button/action-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useValuePlayer = createValuePlayerHook(useIndexPlayer);
const useShufflePlayer = createShufflePlayerHook(shuffle, useValuePlayer);
const useWordPlayer = createWordPlayerHook(useShufflePlayer, useAudio);

export default function WordPlayer({
  setup = {},
  words,
  renderWord,
  onBackToSetup,
  initialWordIndex,
  initialIsPlaying = true,
}) {
  const {
    word,
    audio,
    isPlaying,
    controls: { play, pause, reset, previous, next },
  } = useWordPlayer({
    words,
    setup,
    initialIsPlaying,
    initialWordIndex,
  });

  const handleBackToSetup = () => {
    reset();
    onBackToSetup();
  };

  const handlePlayAudio = () => audio.play();

  const controlHandlers = {
    onPlayAudio: handlePlayAudio,
    onPlay: play,
    onPause: pause,
    onPrevious: previous,
    onNext: next,
    onStop: handleBackToSetup,
  };

  return (
    <>
      <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
        <BackToSetupButton onClick={handleBackToSetup} />
      </Box>
      {renderWord(word.word, word.word, word.imageSrc)}
      <Box sx={{ mb: 1 }}>
        <WordControls isPlaying={isPlaying} controlHandlers={controlHandlers} />
      </Box>
    </>
  );
}

function BackToSetupButton({ onClick }) {
  return (
    <ActionButton name="Back to setup menu" onClick={onClick}>
      <ArrowBackIcon />
    </ActionButton>
  );
}

"use client";

import { useContext } from "react";
import Box from "@mui/material/Box";
import ActionButton from "../action-button/action-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GameDisplayContext } from "@/app/contexts/game-display";
import { WordPlaybackContext } from "@/app/contexts/word-playback";

export function createWordPlayerComponent(useWordPlayer) {
  return function WordPlayer({ children, ...props }) {
    const { onBackToSetup } = useContext(GameDisplayContext);
    const { word, audio, isPlaying, controls } = useWordPlayer(props);
    const { play, pause, stop, previous, next } = controls;

    const handleBackToSetup = () => {
      stop();
      onBackToSetup();
    };

    const playAudio = () => audio.play();

    return (
      <WordPlaybackContext.Provider
        value={{
          word,
          isPlaying,
          controls: { playAudio, play, pause, previous, next, stop },
        }}
      >
        <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
          <BackToSetupButton onClick={handleBackToSetup} />
        </Box>
        {children}
      </WordPlaybackContext.Provider>
    );
  };
}

function BackToSetupButton({ onClick }) {
  return (
    <ActionButton name="Back to setup menu" onClick={onClick}>
      <ArrowBackIcon />
    </ActionButton>
  );
}

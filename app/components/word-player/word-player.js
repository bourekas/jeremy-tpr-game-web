"use client";

import Box from "@mui/material/Box";
import ActionButton from "../action-button/action-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { WordPlaybackContext } from "@/app/contexts/word-playback";

export function createWordPlayerComponent(useWordPlayer) {
  return function WordPlayer({ children, ...props }) {
    const { word, isPlaying, controls } = useWordPlayer(props);

    return (
      <WordPlaybackContext.Provider value={{ word, isPlaying, controls }}>
        <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
          <BackToSetupButton onClick={controls.stop} />
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

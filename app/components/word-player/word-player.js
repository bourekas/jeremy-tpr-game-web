"use client";

import Box from "@mui/material/Box";
import ActionButton from "../action-button/action-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GamePlaybackContext } from "@/app/contexts";
import useWordPlayer from "./use-word-player";

export default function WordPlayer({ children }) {
  const { word, isPlaying, controls } = useWordPlayer();

  return (
    <GamePlaybackContext.Provider value={{ word, isPlaying, controls }}>
      <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
        <BackToSetupButton onClick={controls.stop} />
      </Box>
      {children}
    </GamePlaybackContext.Provider>
  );
}

function BackToSetupButton({ onClick }) {
  return (
    <ActionButton name="Back to setup menu" onClick={onClick}>
      <ArrowBackIcon />
    </ActionButton>
  );
}

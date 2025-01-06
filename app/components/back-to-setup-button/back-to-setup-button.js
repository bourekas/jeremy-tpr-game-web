"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ActionButton from "../action-button/action-button";
import { useContext } from "react";
import { GamePlaybackContext } from "@/app/contexts";

export default function BackToSetupButton({ onClick }) {
  const playback = useContext(GamePlaybackContext);

  return (
    <ActionButton
      name="Go back to setup"
      onClick={onClick || playback.controls.stop}
    >
      <ArrowBackIcon />
    </ActionButton>
  );
}

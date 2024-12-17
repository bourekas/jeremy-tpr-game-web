"use client";

import { useMemo } from "react";
import defaultUsePlayer from "./use-player";
import defaultUseAudio from "./use-audio";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import _ from "lodash";

export default function WordPlayer({
  words,
  setup = {},
  onBackToSetup,
  usePlayer = defaultUsePlayer,
  useAudio = defaultUseAudio,
  Word,
}) {
  const shuffledWords = useMemo(() => _.shuffle(words), [words]);
  const { index, isPlaying, play, pause, reset, previous, next } = usePlayer({
    length: shuffledWords.length,
    displayTime: setup.displayTime,
    initialIsPlaying: true,
  });
  const word = shuffledWords[index];
  const audio = useAudio(word.audioSrc, setup.isAutoPlayAudio);

  const handleBackToSetup = () => {
    reset();
    onBackToSetup();
  };

  const handlePlayAudio = () => audio.play();

  return (
    <Paper elevation={3} sx={{ px: { xs: 0, sm: 1 }, py: { xs: 0.5, sm: 1 } }}>
      <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
        <BackToSetupButton onBackToSetup={handleBackToSetup} />
      </Box>
      <Word key={word.word} word={word.word} imageSrc={word.imageSrc} />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <PlayAudioButton onPlayAudio={handlePlayAudio} />
        <PreviousWordButton onPreviousWord={previous} />
        <PlayOrPauseButton
          isPlaying={isPlaying}
          onPause={pause}
          onPlay={play}
        />
        <NextWordButton onNextWord={next} />
        <StopButton onStop={handleBackToSetup} />
      </Box>
    </Paper>
  );
}

function BackToSetupButton({ onBackToSetup }) {
  return (
    <ActionButton name="Back to setup menu" onClick={onBackToSetup}>
      <ArrowBackIcon />
    </ActionButton>
  );
}

function PlayAudioButton({ onPlayAudio }) {
  return (
    <ActionButton name="Play audio" onClick={onPlayAudio}>
      <AudiotrackIcon sx={{ color: "#BA68C8" }} />
    </ActionButton>
  );
}

function PreviousWordButton({ onPreviousWord }) {
  return (
    <ActionButton name="Go to previous word" onClick={onPreviousWord}>
      <SkipPreviousIcon sx={{ color: "#42A5F5" }} />
    </ActionButton>
  );
}

function PlayOrPauseButton({ isPlaying, onPause, onPlay }) {
  const pauseProps = {
    name: "Pause",
    handleClick: onPause,
    Icon: PauseIcon,
    color: "#FFCA28",
  };
  const playProps = {
    name: "Play",
    handleClick: onPlay,
    Icon: PlayArrowIcon,
    color: "#66BB6A",
  };
  const { name, handleClick, Icon, color } = isPlaying ? pauseProps : playProps;

  return (
    <ActionButton name={name} onClick={handleClick}>
      <Icon sx={{ color }} />
    </ActionButton>
  );
}

function NextWordButton({ onNextWord }) {
  return (
    <ActionButton name="Go to next word" onClick={onNextWord}>
      <SkipNextIcon sx={{ color: "#42A5F5" }} />
    </ActionButton>
  );
}

function StopButton({ onStop }) {
  return (
    <ActionButton name="Stop game" onClick={onStop}>
      <StopIcon sx={{ color: "#E57373" }} />
    </ActionButton>
  );
}

function ActionButton({ name, onClick, children }) {
  return (
    <Tooltip title={name}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
}

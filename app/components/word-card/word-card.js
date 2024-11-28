import { useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import Typogrophy from "@mui/material/Typography";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function WordCard({
  word,
  imageSrc,
  audio,
  isPlaying,
  onPlay,
  onPause,
  onBackToSetup,
  onNextWord,
}) {
  const handlePlayAudio = useAudio(audio);

  return (
    <Paper elevation={3} sx={{ px: { xs: 0, sm: 1 }, py: { xs: 0.5, sm: 1 } }}>
      <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
        <BackToSetupButton onBackToSetup={onBackToSetup} />
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
          objectFit: "contain",
          maxWidth: "525px",
          marginX: "auto",
          mb: 1,
          aspectRatio: "7 / 4",
        }}
      >
        <TprImage word={word} src={imageSrc} />
      </Box>
      <WordText>{word}</WordText>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <PlayAudioButton onPlayAudio={handlePlayAudio} />
        {isPlaying ? (
          <PauseButton onPause={onPause} />
        ) : (
          <PlayButton onPlay={onPlay} />
        )}
        <NextWordButton onNextWord={onNextWord} />
      </Box>
    </Paper>
  );
}

function useAudio(audio) {
  const playAudio = () => audio?.play();

  useEffect(() => {
    playAudio();

    return () => audio?.pause();
  }, [audio]);

  return playAudio;
}

function TprImage({ word, src }) {
  return (
    <Image
      src={src || "placeholder.svg"}
      alt={`Total Physical Response for the word '${word}'`}
      fill
      priority
    />
  );
}

function WordText({ children }) {
  return (
    <Typogrophy component="h1" variant="h3" sx={{ textAlign: "center", mb: 1 }}>
      {children}
    </Typogrophy>
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
      <AudiotrackIcon sx={{ color: "#9C27B0" }} />
    </ActionButton>
  );
}

function PauseButton({ onPause }) {
  return (
    <ActionButton name="Pause" onClick={onPause}>
      <PauseIcon sx={{ color: "#FFC107" }} />
    </ActionButton>
  );
}

function PlayButton({ onPlay }) {
  return (
    <ActionButton name="Play" onClick={onPlay}>
      <PlayArrowIcon sx={{ color: "#4CAF50" }} />
    </ActionButton>
  );
}

function NextWordButton({ name, onNextWord }) {
  return (
    <ActionButton name="Go to next word" onClick={onNextWord}>
      <SkipNextIcon sx={{ color: "#2196F3" }} />
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

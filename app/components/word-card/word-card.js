import { useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import Typogrophy from "@mui/material/Typography";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function WordCard({
  word,
  imageSrc,
  audio,
  onBackToSetup,
  onNextWord,
}) {
  const handleReplayAudio = useAudio(audio);

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
        <ReplayAudioButton onReplayAudio={handleReplayAudio} />
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

function ReplayAudioButton({ onReplayAudio }) {
  return (
    <ActionButton name="Replay audio" onClick={onReplayAudio}>
      <ReplayIcon />
    </ActionButton>
  );
}

function NextWordButton({ name, onNextWord }) {
  return (
    <ActionButton name="Go to next word" onClick={onNextWord}>
      <SkipNextIcon />
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

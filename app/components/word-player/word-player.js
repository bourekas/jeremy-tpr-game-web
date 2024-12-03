import defaultUseWordPlayer from "./use-word-player";
import defaultUseAudio from "./use-audio";
import DefaultWord from "../word/word";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function WordPlayer({
  words,
  displayTime,
  onBackToSetup,
  useWordPlayer = defaultUseWordPlayer,
  useAudio = defaultUseAudio,
  Word = DefaultWord,
}) {
  const { word, isPlaying, play, pause, reset, next } = useWordPlayer(
    words,
    displayTime,
    true,
  );
  const audio = useAudio(word.audioSrc);

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

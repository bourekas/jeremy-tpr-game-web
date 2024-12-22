import Box from "@mui/material/Box";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import StopIcon from "@mui/icons-material/Stop";
import ActionButton from "../action-button/action-button";

export default function WordControls({ isPlaying, controlHandlers }) {
  const { onPlayAudio, onPrevious, onPlay, onPause, onNext, onStop } =
    controlHandlers;
  const handleTogglePlay = isPlaying ? onPause : onPlay;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <PlayAudioButton onClick={onPlayAudio} />
      <PreviousWordButton onClick={onPrevious} />
      <PlayPauseButton isPlaying={isPlaying} onClick={handleTogglePlay} />
      <NextWordButton onClick={onNext} />
      <StopButton onClick={onStop} />
    </Box>
  );
}

function PlayAudioButton({ onClick }) {
  return (
    <ActionButton name="Play audio" onClick={onClick}>
      <AudiotrackIcon sx={{ color: "#BA68C8" }} />
    </ActionButton>
  );
}

function PreviousWordButton({ onClick }) {
  return (
    <ActionButton name="Go to previous word" onClick={onClick}>
      <SkipPreviousIcon sx={{ color: "#42A5F5" }} />
    </ActionButton>
  );
}

function PlayPauseButton({ isPlaying, onClick }) {
  const pauseProps = {
    name: "Pause",
    Icon: PauseIcon,
    color: "#FFCA28",
  };
  const playProps = {
    name: "Play",
    Icon: PlayArrowIcon,
    color: "#66BB6A",
  };
  const { name, Icon, color } = isPlaying ? pauseProps : playProps;

  return (
    <ActionButton name={name} onClick={onClick}>
      <Icon sx={{ color }} />
    </ActionButton>
  );
}

function NextWordButton({ onClick }) {
  return (
    <ActionButton name="Go to next word" onClick={onClick}>
      <SkipNextIcon sx={{ color: "#42A5F5" }} />
    </ActionButton>
  );
}

function StopButton({ onClick }) {
  return (
    <ActionButton name="Stop game" onClick={onClick}>
      <StopIcon sx={{ color: "#E57373" }} />
    </ActionButton>
  );
}

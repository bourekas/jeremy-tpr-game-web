import ActionButton from "../action-button/action-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export function BackToSetupButton({ onClick }) {
  return (
    <ActionButton name="Back to setup menu" onClick={onClick}>
      <ArrowBackIcon />
    </ActionButton>
  );
}

export function PlayAudioButton({ onClick }) {
  return (
    <ActionButton name="Play audio" onClick={onClick}>
      <AudiotrackIcon sx={{ color: "#BA68C8" }} />
    </ActionButton>
  );
}

export function PreviousWordButton({ onClick }) {
  return (
    <ActionButton name="Go to previous word" onClick={onClick}>
      <SkipPreviousIcon sx={{ color: "#42A5F5" }} />
    </ActionButton>
  );
}

export function PlayPauseButton({ isPlaying, onClick }) {
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

export function NextWordButton({ onClick }) {
  return (
    <ActionButton name="Go to next word" onClick={onClick}>
      <SkipNextIcon sx={{ color: "#42A5F5" }} />
    </ActionButton>
  );
}

export function StopButton({ onClick }) {
  return (
    <ActionButton name="Stop game" onClick={onClick}>
      <StopIcon sx={{ color: "#E57373" }} />
    </ActionButton>
  );
}

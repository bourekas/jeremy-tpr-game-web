"use client";

import Box from "@mui/material/Box";
import ActionButton from "../action-button/action-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function createWordPlayerComponent(
  useWordPlayer,
  WordContent,
  WordControls,
) {
  return function WordPlayer({ onBackToSetup, ...props }) {
    const { word, audio, isPlaying, controls } = useWordPlayer(props);
    const { play, pause, stop, previous, next } = controls;

    const handleBackToSetup = () => {
      stop();
      onBackToSetup();
    };

    const handlePlayAudio = () => audio.play();

    const controlHandlers = {
      onPlayAudio: handlePlayAudio,
      onPlay: play,
      onPause: pause,
      onPrevious: previous,
      onNext: next,
      onStop: handleBackToSetup,
    };

    return (
      <>
        <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
          <BackToSetupButton onClick={handleBackToSetup} />
        </Box>
        <WordContent
          key={word.word}
          word={word.word}
          imageSrc={word.imageSrc}
        />
        <Box sx={{ mb: 1 }}>
          <WordControls
            isPlaying={isPlaying}
            controlHandlers={controlHandlers}
          />
        </Box>
      </>
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

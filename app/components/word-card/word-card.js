"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Tooltip from "@mui/material/Tooltip";

function ActionButton({ name, onClick, children }) {
  return (
    <Tooltip title={name}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
}

function useLoadImage(imageSrc) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    setIsLoading(true);
    img.onload = () => setIsLoading(false);

    return () => setIsLoading(false);
  }, [imageSrc]);

  return isLoading;
}

function useLoadAudio(audioSrc) {
  const [audio, setAudio] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    setAudio(audio);
    setIsLoading(true);
    audio.oncanplaythrough = () => setIsLoading(false);

    return () => setIsLoading(false);
  }, [audioSrc]);

  return { isLoading, audio };
}

function useLoadMedia(imageSrc, audioSrc) {
  const isImageLoading = useLoadImage(imageSrc);
  const { isAudioLoading, audio } = useLoadAudio(audioSrc);
  const isLoading = isImageLoading || isAudioLoading;

  return { isLoading, audio };
}

function usePlayAudio(audio) {
  useEffect(() => {
    audio?.play();

    return () => audio?.pause();
  }, [audio]);
}

export default function WordCard({
  text,
  imageSrc,
  audioSrc,
  onClickBackToSetup,
  onClickNext,
}) {
  const { isLoading, audio } = useLoadMedia(imageSrc, audioSrc);
  usePlayAudio(audio);
  const handleClickReplayAudio = () => audio?.play();

  return (
    <Card component="article" sx={{ textAlign: "center", padding: 1 }}>
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Back to setup menu">
          <IconButton onClick={onClickBackToSetup}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <CardMedia
        component="img"
        image={imageSrc}
        alt={text}
        sx={{ objectFit: "contain", maxHeight: "300px" }}
      ></CardMedia>
      <CardContent>
        <Typography variant="h2">{text}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <ActionButton name="Replay audio" onClick={handleClickReplayAudio}>
          <ReplayIcon />
        </ActionButton>
        <ActionButton name="Go to the next word" onClick={onClickNext}>
          <SkipNextIcon />
        </ActionButton>
      </CardActions>
    </Card>
  );
}

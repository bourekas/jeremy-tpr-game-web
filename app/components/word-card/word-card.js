"use client";

import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";

function pronounceWord(audioSrc) {
  const audio = new Audio(audioSrc);
  audio.play();
}

function usePronounceWord(audioSrc) {
  useEffect(() => {
    pronounceWord(audioSrc);
  }, [audioSrc]);
}

export default function WordCard({ text, imageSrc, audioSrc }) {
  usePronounceWord(audioSrc);

  return (
    <Card component="article" sx={{ textAlign: "center" }}>
      <CardMedia
        component="img"
        image={imageSrc}
        alt={text}
        sx={{ objectFit: "contain", maxHeight: "70vh" }}
      ></CardMedia>
      <CardContent>
        <Typography variant="h2">{text}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip title="Replay">
          <IconButton onClick={() => pronounceWord(audioSrc)}>
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

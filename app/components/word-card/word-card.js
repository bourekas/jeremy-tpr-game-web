"use client";

import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
    </Card>
  );
}

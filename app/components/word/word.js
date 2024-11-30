import { useEffect } from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typogrophy from "@mui/material/Typography";

export default function Word({ word, imageSrc, audio }) {
  useAudio(audio);

  return (
    <>
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
    </>
  );
}

function useAudio(audio) {
  useEffect(() => {
    audio?.play();

    return () => audio?.pause();
  }, [audio]);

  return () => audio?.play();
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

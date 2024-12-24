import Box from "@mui/material/Box";
import Image from "next/image";
import Typogrophy from "@mui/material/Typography";

export default function WordContent({ word, imageSrc }) {
  return (
    <>
      <TprImage word={word} src={imageSrc} />
      <WordText>{word}</WordText>
    </>
  );
}

function TprImage({ word, src }) {
  return (
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
      <Image
        src={src || "placeholder.svg"}
        alt={`Total Physical Response for the word '${word}'`}
        sizes="525px"
        fill
        priority
      />
    </Box>
  );
}

function WordText({ children }) {
  return (
    <Typogrophy component="h1" variant="h3" sx={{ textAlign: "center", mb: 1 }}>
      {children}
    </Typogrophy>
  );
}

import Box from "@mui/material/Box";
import TprGame from "./components/tpr-game/tpr-game";
import SetupMenu from "./components/setup-menu/setup-menu";
import WordPlayer from "./components/word-player/word-player";

const words = [
  "לָגַעַת",
  "לְהַפְסִיק",
  "לְהַקְשִׁיב",
  "לְהַתְחִיל",
  "לְהִתְקַשֵּׁר",
  "לָזוּז",
  "לְחַכּוֹת",
  "לַחְשׁוֹב",
  "לְנַשֵּׁק",
  "לִסְגּוֹר",
].map((word) => ({
  word,
  imageSrc: `/words/${word}.webp`,
  audioSrc: `/words/${word}.mp3`,
}));

export default function Home() {
  return (
    <Box sx={{ padding: { xs: 1, sm: 1.5 } }}>
      <TprGame Setup={SetupMenu} Words={WordPlayer} words={words} />
    </Box>
  );
}

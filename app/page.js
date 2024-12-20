import Box from "@mui/material/Box";
import TprGame from "./components/tpr-game/tpr-game";
import { renderSetup, renderWords } from "./renders";

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
      <TprGame
        words={words}
        renderSetup={renderSetup}
        renderWords={renderWords}
      />
    </Box>
  );
}

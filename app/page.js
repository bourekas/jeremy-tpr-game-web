import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import GameDisplay from "./components/game-display/game-display";
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
    <PageWrapper>
      <GamePanel>
        <GameDisplay
          words={words}
          renderSetup={renderSetup}
          renderWords={renderWords}
        />
      </GamePanel>
    </PageWrapper>
  );
}

function PageWrapper({ children }) {
  return <Box sx={{ padding: { xs: 1, sm: 1.5 } }}>{children}</Box>;
}

function GamePanel({ children }) {
  return (
    <Paper elevation={3} sx={{ px: { xs: 0, sm: 1 }, py: { xs: 0.5, sm: 1 } }}>
      {children}
    </Paper>
  );
}

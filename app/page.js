import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import WordContent from "./components/word-content/word-content";
import WordControls from "./components/word-controls/word-controls";
import WordPlayer from "./components/word-player/word-player";
import SetupMenu from "./components/setup-menu/setup-menu";
import GameDisplay from "./components/game-display/game-display";
import { WordsProvider } from "./contexts/words";
import ShuffleWordPlayer from "./components/shuffle-word-player/shuffle-word-player";

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
        <WordsProvider words={words}>
          <GameDisplay
            setup={<SetupMenu />}
            words={
              <ShuffleWordPlayer>
                <WordPlayer>
                  <WordContent />
                  <WordControls />
                </WordPlayer>
              </ShuffleWordPlayer>
            }
          />
        </WordsProvider>
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

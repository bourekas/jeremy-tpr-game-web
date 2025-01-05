import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import WordContent from "./components/word-content/word-content";
import WordControls from "./components/word-controls/word-controls";
import WordPlayer from "./components/word-player/word-player";
import SetupMenu from "./components/setup-menu/setup-menu";
import GameDisplay from "./components/game-display/game-display";
import { StoreGameWordsProvider } from "./store/store-game-words-provider";
import ShuffleWordPlayer from "./components/shuffle-word-player/shuffle-word-player";
import StoreProvider from "./store/store-provider/store-provider";
import StoreGamePlaybackProvider from "./store/store-game-playback-provider/store-game-playback-provider";
import StoreGameStatusProvider from "./store/store-game-status-provider/store-game-status-provider";
import StoreGameSetupProvider from "./store/store-game-setup-provider/store-game-setup-provider";

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
        <GameProvider words={words}>
          <GameDisplay
            setup={<SetupMenu />}
            words={
              <WordPlayer>
                <WordContent />
                <WordControls />
              </WordPlayer>
            }
          />
        </GameProvider>
      </GamePanel>
    </PageWrapper>
  );
}

function GameProvider({ children, words }) {
  return (
    <StoreProvider>
      <StoreGameWordsProvider words={words}>
        <ShuffleWordPlayer>
          <StoreGameSetupProvider>
            <StoreGameStatusProvider>
              <StoreGamePlaybackProvider>{children}</StoreGamePlaybackProvider>
            </StoreGameStatusProvider>
          </StoreGameSetupProvider>
        </ShuffleWordPlayer>
      </StoreGameWordsProvider>
    </StoreProvider>
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

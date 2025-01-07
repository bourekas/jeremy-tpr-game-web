"use client";

import GamePanel from "@/app/components/game-panel/game-panel";
import GameDisplay from "@/app/components/game-display/game-display";
import BackToSetupButton from "@/app/components/back-to-setup-button/back-to-setup-button";
import SetupMenu from "@/app/components/setup-menu/setup-menu";
import WordContent from "@/app/components/word-content/word-content";
import WordControls from "@/app/components/word-controls/word-controls";

import StoreProvider from "@/app/store/store-provider/store-provider";
import StoreGamePlaybackProvider from "@/app/store/store-game-playback-provider/store-game-playback-provider";
import StoreGameSetupProvider from "@/app/store/store-game-setup-provider/store-game-setup-provider";
import StoreGameStatusProvider from "@/app/store/store-game-status-provider/store-game-status-provider";
import { StoreGameWordsProvider } from "@/app/store/store-game-words-provider";
import ShuffleWordPlayer from "../shuffle-word-player/shuffle-word-player";

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

export default function Game() {
  return (
    <GameProvider words={words}>
      <GamePanel>
        <GameDisplay
          setup={<SetupMenu />}
          words={
            <>
              <BackToSetupButton />
              <WordContent />
              <WordControls />
            </>
          }
        />
      </GamePanel>
    </GameProvider>
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

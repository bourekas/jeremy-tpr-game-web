"use client";

import SetupMenu from "./components/setup-menu/setup-menu";
import WordContent from "./components/word-content/word-content";
import WordControls from "./components/word-controls/word-controls";
import useIndexPlayer from "./hooks/use-index-player/use-index-player";
import useAudio from "./hooks/use-audio/use-audio";
import { createValuePlayerHook } from "./hooks/use-value-player/use-value-player";
import { createShufflePlayerHook } from "./hooks/use-shuffle-player/use-shuffle-player";
import { createWordPlayerHook } from "./hooks/use-word-player/use-word-player";
import { createWordPlayerComponent } from "./components/word-player/word-player";
import { shuffle } from "lodash";

export const renderSetup = (setup, onSetupChange, onStart) => (
  <SetupMenu setup={setup} onSetupChange={onSetupChange} onStart={onStart} />
);

export const renderWord = (key, word, imageSrc) => (
  <WordContent key={key} word={word} imageSrc={imageSrc} />
);

const useValuePlayer = createValuePlayerHook(useIndexPlayer);
const useShufflePlayer = createShufflePlayerHook(shuffle, useValuePlayer);
const useWordPlayer = createWordPlayerHook(useShufflePlayer, useAudio);

const WordPlayer = createWordPlayerComponent(
  useWordPlayer,
  WordContent,
  WordControls,
);

export const renderWords = (setup, words, onBackToSetup) => (
  <WordPlayer
    setup={setup}
    words={words}
    renderWord={renderWord}
    onBackToSetup={onBackToSetup}
  />
);

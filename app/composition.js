"use client";

import { shuffle } from "lodash";
import WordContent from "./components/word-content/word-content";
import { useSetup } from "./contexts/setup/setup";
import useIndexPlayer from "./hooks/use-index-player/use-index-player";
import useAudio from "./hooks/use-audio/use-audio";
import { createValuePlayerHook } from "./hooks/use-value-player/use-value-player";
import { createShufflePlayerHook } from "./hooks/use-shuffle-player/use-shuffle-player";
import { createWordPlayerHook } from "./hooks/use-word-player/use-word-player";
import { createWordPlayerComponent } from "./components/word-player/word-player";

const useValuePlayer = createValuePlayerHook(useIndexPlayer);
const useShufflePlayer = createShufflePlayerHook(shuffle, useValuePlayer);
const useWordPlayer = createWordPlayerHook({
  useSetup,
  useValuePlayer: useShufflePlayer,
  useAudio,
});

export const WordPlayer = createWordPlayerComponent(useWordPlayer, WordContent);

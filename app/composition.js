"use client";

import { shuffle } from "lodash";
import useIndexPlayer from "./hooks/use-index-player/use-index-player";
import useAudio from "./hooks/use-audio/use-audio";
import { createValuePlayerHook } from "./hooks/use-value-player/use-value-player";
import { createShufflePlayerHook } from "./hooks/use-shuffle-player/use-shuffle-player";
import { createWordPlayerHook } from "./components/word-player/use-word-player";
import { createWordPlayerComponent } from "./components/word-player/word-player";

const useValuePlayer = createValuePlayerHook(useIndexPlayer);
const useShufflePlayer = createShufflePlayerHook(shuffle, useValuePlayer);
const useWordPlayer = createWordPlayerHook({
  useValuePlayer: useShufflePlayer,
  useAudio,
});

export const WordPlayer = createWordPlayerComponent(useWordPlayer);

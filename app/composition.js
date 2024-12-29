"use client";

import useWordPlayer from "./components/word-player/use-word-player";
import { createWordPlayerComponent } from "./components/word-player/word-player";

export const WordPlayer = createWordPlayerComponent(useWordPlayer);

"use client";

import SetupMenu from "./components/setup-menu/setup-menu";
import Word from "./components/word/word";
import WordPlayer from "./components/word-player/word-player";

export const renderSetup = (setup, onSetupChange, onStart) => (
  <SetupMenu setup={setup} onSetupChange={onSetupChange} onStart={onStart} />
);

export const renderWord = (key, word, imageSrc) => (
  <Word key={key} word={word} imageSrc={imageSrc} />
);

export const renderWords = (setup, words, onBackToSetup) => (
  <WordPlayer
    setup={setup}
    words={words}
    renderWord={renderWord}
    onBackToSetup={onBackToSetup}
  />
);

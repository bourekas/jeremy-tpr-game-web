"use client";

import { useState } from "react";
import SetupMenu from "../setup-menu/setup-menu";
import WordCardRotator from "../word-card-rotator/word-card-rotator";

const cards = [
  {
    text: "לָגַעַת",
    imageSrc: "/words/לָגַעַת.jpg",
    audioSrc: "/words/לָגַעַת.mp3",
  },
  {
    text: "לְהַפְסִיק",
    imageSrc: "/words/לְהַפְסִיק.jpg",
    audioSrc: "/words/לְהַפְסִיק.mp3",
  },
  {
    text: "לְהַקְשִׁיב",
    imageSrc: "/words/לְהַקְשִׁיב.jpg",
    audioSrc: "/words/לְהַקְשִׁיב.mp3",
  },
  {
    text: "לְהַתְחִיל",
    imageSrc: "/words/לְהַתְחִיל.jpg",
    audioSrc: "/words/לְהַתְחִיל.mp3",
  },
  {
    text: "לְהִתְקַשֵּׁר",
    imageSrc: "/words/לְהִתְקַשֵּׁר.jpg",
    audioSrc: "/words/לְהִתְקַשֵּׁר.mp3",
  },
  {
    text: "לָזוּז",
    imageSrc: "/words/לָזוּז.jpg",
    audioSrc: "/words/לָזוּז.mp3",
  },
];

export default function TprGame() {
  const [gameSetup, setGameSetup] = useState();

  const handleClickBackToSetup = () => setGameSetup(undefined);
  const handleStart = (setup) => setGameSetup(setup);

  if (gameSetup) {
    return (
      <WordCardRotator
        cards={cards}
        intervalSeconds={gameSetup.displayTime}
        onClickBackToSetup={handleClickBackToSetup}
      />
    );
  }

  return <SetupMenu defaultDisplayTime={5} onStart={handleStart} />;
}

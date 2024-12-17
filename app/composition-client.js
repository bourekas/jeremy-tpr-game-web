"use client";

import TprGame from "./components/tpr-game/tpr-game";
import SetupMenu from "./components/setup-menu/setup-menu";
import WordPlayer from "./components/word-player/word-player";
import Word from "./components/word/word";
import { curry } from "react-curry-component";

const ComposedWordPlayer = curry(<WordPlayer Word={Word} />);
const ComposedTprGame = curry(
  <TprGame Setup={SetupMenu} Words={ComposedWordPlayer} />,
);

export default ComposedTprGame;

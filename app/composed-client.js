"use client";

import TprGame from "./components/tpr-game/tpr-game";
import SetupMenu from "./components/setup-menu/setup-menu";
import WordPlayer from "./components/word-player/word-player";
import Word from "./components/word/word";

const ComposedWordPlayer = withInjected(WordPlayer, { Word });

const ComposedTprGame = withInjected(TprGame, {
  Setup: SetupMenu,
  Words: ComposedWordPlayer,
});

function withInjected(Component, injected) {
  const InjectedComponent = function (props) {
    return <Component {...injected} {...props} />;
  };
  InjectedComponent.displayName = "Injected" + Component.displayName;

  return InjectedComponent;
}

export default ComposedTprGame;

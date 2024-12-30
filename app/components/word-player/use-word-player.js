import { GameDisplayContext } from "@/app/contexts/game-display";
import { useContext, useMemo } from "react";
import useIndexPlayer from "./use-index-player";
import { WordsContext } from "@/app/contexts/words";

export default function useWordPlayer() {
  const words = useContext(WordsContext);
  const { onBackToSetup } = useContext(GameDisplayContext);

  const { index, isPlaying, controls } = useIndexPlayer({
    length: words.length,
  });
  const word = words[index];

  const audio = useMemo(() => new Audio(word.audioSrc), [word.audioSrc]);
  const playAudio = () => audio.play();

  const stop = () => {
    controls.stop();
    onBackToSetup();
  };

  return {
    word: { ...word, audio },
    isPlaying,
    controls: { ...controls, playAudio, stop },
  };
}

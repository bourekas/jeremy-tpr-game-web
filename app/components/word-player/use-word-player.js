import { useContext, useMemo } from "react";
import { GameStatusContext } from "@/app/contexts";
import useIndexPlayer from "./use-index-player";
import { WordsContext } from "@/app/contexts/words";

export default function useWordPlayer() {
  const words = useContext(WordsContext);
  const { stopGame } = useContext(GameStatusContext);

  const { index, isPlaying, controls } = useIndexPlayer({
    length: words.length,
  });
  const word = words[index];

  const audio = useMemo(() => new Audio(word.audioSrc), [word.audioSrc]);
  const playAudio = () => audio.play();

  const stop = () => {
    controls.stop();
    stopGame();
  };

  return {
    word: { ...word, audio },
    isPlaying,
    controls: { ...controls, playAudio, stop },
  };
}

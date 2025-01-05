import { useContext, useMemo } from "react";
import { GamePlaybackContext } from "@/app/contexts";
import { WordsContext } from "@/app/contexts/words";

export default function useWordPlayer() {
  const words = useContext(WordsContext);
  const { index, isPlaying, controls } = useContext(GamePlaybackContext);

  const word = words[index];
  const audio = useMemo(() => new Audio(word.audioSrc), [word.audioSrc]);
  const playAudio = () => audio.play();

  return {
    word: { ...word, audio },
    isPlaying,
    controls: { ...controls, playAudio },
  };
}

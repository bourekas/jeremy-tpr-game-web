import { useContext, useMemo } from "react";
import { GamePlaybackContext, GameWordsContext } from "@/app/contexts";

export default function useWordPlayer() {
  const words = useContext(GameWordsContext);
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

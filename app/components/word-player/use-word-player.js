import { useContext, useMemo } from "react";
import useIndexPlayer from "./use-index-player";
import { WordsContext } from "@/app/contexts/words";
import { useDispatch } from "@/lib/hooks";
import { backToSetup } from "@/lib/game-slice";

export default function useWordPlayer() {
  const words = useContext(WordsContext);
  const dispatch = useDispatch();

  const { index, isPlaying, controls } = useIndexPlayer({
    length: words.length,
  });
  const word = words[index];

  const audio = useMemo(() => new Audio(word.audioSrc), [word.audioSrc]);
  const playAudio = () => audio.play();

  const stop = () => {
    controls.stop();
    dispatch(backToSetup());
  };

  return {
    word: { ...word, audio },
    isPlaying,
    controls: { ...controls, playAudio, stop },
  };
}

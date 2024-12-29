import { GameDisplayContext } from "@/app/contexts/game-display";
import { SetupContext } from "@/app/contexts/setup";
import { useContext, useMemo } from "react";

export function createWordPlayerHook({ useValuePlayer }) {
  return function useWordPlayer({
    words,
    initialIsPlaying = true,
    initialWordIndex,
  }) {
    const { setup } = useContext(SetupContext);

    const {
      value: word,
      isPlaying,
      controls,
    } = useValuePlayer({
      values: words,
      displayTime: setup.displayTime,
      initialIsPlaying,
      initialValueIndex: initialWordIndex,
    });
    const audio = useMemo(() => new Audio(word.audioSrc), [word.audioSrc]);

    const { onBackToSetup } = useContext(GameDisplayContext);

    const stop = () => {
      controls.stop();
      onBackToSetup();
    };

    const playAudio = () => audio.play();

    return {
      word: { ...word, audio },
      isPlaying,
      controls: { ...controls, playAudio, stop },
    };
  };
}

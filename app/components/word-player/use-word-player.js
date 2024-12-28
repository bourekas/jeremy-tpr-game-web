import { GameDisplayContext } from "@/app/contexts/game-display";
import { useContext } from "react";

export function createWordPlayerHook({ useSetup, useValuePlayer, useAudio }) {
  return function useWordPlayer({
    words,
    initialIsPlaying = true,
    initialWordIndex,
  }) {
    const setup = useSetup();

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

    const audio = useAudio(word.audioSrc, setup.isAutoPlayAudio);

    const { onBackToSetup } = useContext(GameDisplayContext);

    const stop = () => {
      controls.stop();
      onBackToSetup();
    };

    const playAudio = () => audio.play();

    return {
      word,
      audio,
      isPlaying,
      controls: { ...controls, playAudio, stop },
    };
  };
}

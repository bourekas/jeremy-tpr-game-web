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

    return { word, audio, isPlaying, controls };
  };
}

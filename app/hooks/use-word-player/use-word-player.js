export function createWordPlayerHook(useValuePlayer, useAudio) {
  return function useWordPlayer({
    words,
    setup,
    initialIsPlaying = true,
    initialWordIndex,
  }) {
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

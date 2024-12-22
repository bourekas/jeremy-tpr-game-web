export function createWordPlayerHook(usePlayer, useAudio) {
  return function useWordPlayer({
    words,
    setup,
    initialIsPlaying,
    initialWordIndex,
  }) {
    const { index, ...playerRest } = usePlayer({
      length: words.length,
      displayTime: setup.displayTime,
      initialIsPlaying,
      initialIndex: initialWordIndex,
    });
    const word = words[index];
    const audio = useAudio(word.audioSrc, setup.isAutoPlayAudio, Audio);

    return { word, audio, ...playerRest };
  };
}

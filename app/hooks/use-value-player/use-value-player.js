export function createValuePlayerHook(useIndexPlayer) {
  return function useValuePlayer({
    values,
    displayTime,
    initialIsPlaying,
    initialValueIndex,
  }) {
    const { index, isPlaying, controls } = useIndexPlayer({
      length: values.length,
      displayTime,
      initialIsPlaying,
      initialIndex: initialValueIndex,
    });
    const value = values[index];

    return { value, isPlaying, controls };
  };
}

import { useEffect } from "react";

export default function useAutoPlayAudio(audio, isAutoPlay) {
  useEffect(() => {
    if (!isAutoPlay) return;

    audio.play();

    return () => audio.pause();
  }, [audio, isAutoPlay]);
}

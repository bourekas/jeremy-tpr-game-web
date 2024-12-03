import { useEffect, useMemo, useRef } from "react";

export default function useAudio(audioSrc, isAutoPlay = true) {
  const audio = useMemo(() => new Audio(audioSrc), [audioSrc]);
  const lastEndedAudioRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlay || audio === lastEndedAudioRef.current) return;

    audio.onended = () => (lastEndedAudioRef.current = audio);
    audio.play();

    return () => audio.pause();
  }, [audio, isAutoPlay]);

  return audio;
}

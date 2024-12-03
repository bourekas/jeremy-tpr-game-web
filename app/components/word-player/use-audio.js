import { useEffect, useMemo, useRef } from "react";

export default function useAudio(audioSrc) {
  const audio = useMemo(() => new Audio(audioSrc), [audioSrc]);
  const lastEndedAudioRef = useRef(null);

  useEffect(() => {
    if (audio === lastEndedAudioRef.current) return;

    audio.onended = () => (lastEndedAudioRef.current = audio);
    audio.play();

    return () => audio.pause();
  }, [audio]);

  return audio;
}

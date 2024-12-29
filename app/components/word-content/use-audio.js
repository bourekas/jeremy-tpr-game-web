import { useEffect, useRef, useContext } from "react";
import { SetupContext } from "@/app/contexts/setup";

export default function useAudio(audio) {
  const lastEndedAudioRef = useRef(null);
  const {
    setup: { isAutoPlayAudio: isAutoPlay },
  } = useContext(SetupContext);

  useEffect(() => {
    if (!isAutoPlay || audio === lastEndedAudioRef.current) return;

    audio.onended = () => (lastEndedAudioRef.current = audio);
    audio.play();

    return () => audio.pause();
  }, [audio, isAutoPlay]);
}

import { useEffect, useContext } from "react";
import { SetupContext } from "@/app/contexts/setup";

export default function useAudio(audio) {
  const {
    setup: { isAutoPlayAudio: isAutoPlay },
  } = useContext(SetupContext);

  useEffect(() => {
    if (!isAutoPlay) return;

    audio.play();

    return () => audio.pause();
  }, [audio, isAutoPlay]);
}

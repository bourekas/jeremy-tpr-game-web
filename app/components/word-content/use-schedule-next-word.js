import { useEffect, useRef } from "react";

export default function useScheduleNextWord({ next, isPlaying, displayTime }) {
  const timeoutIdRef = useRef();

  useEffect(() => {
    if (!isPlaying) return;

    timeoutIdRef.current = setTimeout(next, displayTime * 1000);

    return () => clearTimeout(timeoutIdRef.current);
  }, [next, isPlaying, displayTime]);
}

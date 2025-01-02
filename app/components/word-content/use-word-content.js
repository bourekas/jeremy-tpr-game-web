import { useContext } from "react";
import { WordPlaybackContext } from "@/app/contexts/word-playback";
import { GameSetupContext } from "@/app/contexts";
import useAutoPlayAudio from "./use-auto-play-audio";
import useScheduleNextWord from "./use-schedule-next-word";

export default function useWordContent() {
  const {
    word,
    isPlaying,
    controls: { next },
  } = useContext(WordPlaybackContext);
  const { displayTime, isAutoPlayAudio } = useContext(GameSetupContext);

  useAutoPlayAudio(word.audio, isAutoPlayAudio);
  useScheduleNextWord({ next, isPlaying, displayTime });

  return word;
}

import { useContext } from "react";
import { WordPlaybackContext } from "@/app/contexts/word-playback";
import { SetupContext } from "@/app/contexts/setup";
import useAutoPlayAudio from "./use-auto-play-audio";
import useScheduleNextWord from "./use-schedule-next-word";

export default function useWordContent() {
  const { word, scheduleNextWord, cancelNextWord } =
    useContext(WordPlaybackContext);
  const { setup } = useContext(SetupContext);

  useAutoPlayAudio(word.audio, setup.isAutoPlayAudio);
  useScheduleNextWord(scheduleNextWord, cancelNextWord);

  return word;
}

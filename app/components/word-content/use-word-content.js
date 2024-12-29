import { useContext } from "react";
import { WordPlaybackContext } from "@/app/contexts/word-playback";
import { SetupContext } from "@/app/contexts/setup";
import useAutoPlayAudio from "./use-auto-play-audio";

export default function useWordContent() {
  const { word } = useContext(WordPlaybackContext);
  const { setup } = useContext(SetupContext);

  useAutoPlayAudio(word.audio, setup.isAutoPlayAudio);

  return word;
}

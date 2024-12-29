import { useContext } from "react";
import { WordPlaybackContext } from "@/app/contexts/word-playback";
import { SetupContext } from "@/app/contexts/setup";
import useAudio from "./use-audio";

export default function useWordContent() {
  const { word } = useContext(WordPlaybackContext);
  const { setup } = useContext(SetupContext);

  useAudio(word.audio, setup.isAutoPlayAudio);

  return word;
}

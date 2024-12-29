import { useContext } from "react";
import { WordPlaybackContext } from "@/app/contexts/word-playback";
import useAudio from "./use-audio";

export default function useWordContent() {
  const { word } = useContext(WordPlaybackContext);
  useAudio(word.audio);

  return word;
}

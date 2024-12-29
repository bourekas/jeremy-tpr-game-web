import { useEffect } from "react";

export default function useScheduleNextWord(scheduleNextWord, cancelNextWord) {
  useEffect(() => {
    scheduleNextWord();

    return cancelNextWord;
  }, [scheduleNextWord, cancelNextWord]);
}

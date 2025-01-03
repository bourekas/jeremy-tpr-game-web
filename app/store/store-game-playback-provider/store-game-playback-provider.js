import { GamePlaybackContext } from "@/app/contexts";
import { useSelector } from "@/lib/hooks";

export default function StoreGamePlaybackProvider({ children }) {
  const index = useSelector((state) => state.game.playback.index);
  const isPlaying = useSelector((state) => state.game.playback.isPlaying);

  return (
    <GamePlaybackContext.Provider value={{ index, isPlaying }}>
      {children}
    </GamePlaybackContext.Provider>
  );
}

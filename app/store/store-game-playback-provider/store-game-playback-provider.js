import { GamePlaybackContext } from "@/app/contexts";
import { gameSlice } from "@/lib/game-slice";
import { useDispatch, useSelector } from "@/lib/hooks";

export default function StoreGamePlaybackProvider({ children }) {
  const index = useSelector((state) => state.game.playback.index);
  const isPlaying = useSelector((state) => state.game.playback.isPlaying);
  const dispatch = useDispatch();
  const controls = Object.fromEntries(
    Object.entries(gameSlice.actions).map(([actionName, action]) => [
      actionName,
      () => dispatch(action()),
    ]),
  );

  return (
    <GamePlaybackContext.Provider value={{ index, isPlaying, controls }}>
      {children}
    </GamePlaybackContext.Provider>
  );
}

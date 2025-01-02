import { useContext } from "react";
import { GameSetupContext, GameStatusContext } from "@/app/contexts";

export default function useSetupMenu() {
  const setup = useContext(GameSetupContext);
  const { startGame } = useContext(GameStatusContext);

  return { ...setup, startGame };
}

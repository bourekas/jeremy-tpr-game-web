import { useContext } from "react";
import { SetupContext } from "@/app/contexts/setup";
import { SetupChangeContext } from "@/app/contexts/setup";
import { GameDisplayContext } from "@/app/contexts/game-display";

export default function useSetupMenu() {
  const { setup } = useContext(SetupContext);
  const setupChange = useContext(SetupChangeContext);
  const { onStart: start } = useContext(GameDisplayContext);

  return { setup, ...setupChange, start };
}

import { useContext } from "react";
import { SetupContext } from "@/app/contexts/setup";
import { useDispatch } from "@/lib/hooks";
import { startGame } from "@/lib/game-slice";

export default function useSetupMenu() {
  const setup = useContext(SetupContext);
  const dispatch = useDispatch();

  const start = () => {
    dispatch(startGame());
  };

  return { ...setup, start };
}

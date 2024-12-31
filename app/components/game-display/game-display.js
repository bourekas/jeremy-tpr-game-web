"use client";

import { useSelector } from "@/lib/hooks";

export default function GameDisplay({ setup, words }) {
  const isGameStarted = useSelector((state) => state.game.isGameStarted);

  return isGameStarted ? words : setup;
}

"use client";

import { useIsGameStarted } from "@/lib/hooks";

export default function GameDisplay({ setup, words }) {
  const isGameStarted = useIsGameStarted();

  return isGameStarted ? words : setup;
}

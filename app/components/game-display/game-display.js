"use client";

import { GameStatusContext } from "@/app/contexts";
import { useContext } from "react";

export default function GameDisplay({ setup, words }) {
  const { isGameStarted } = useContext(GameStatusContext);

  return isGameStarted ? words : setup;
}

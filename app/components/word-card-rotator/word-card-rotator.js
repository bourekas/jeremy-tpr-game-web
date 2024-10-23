"use client";

import { useEffect, useState } from "react";
import WordCard from "@/app/components/word-card/word-card";

function randomCard(cards) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

function useRandomCard(cards, intervalSeconds) {
  const [card, setCard] = useState(() => randomCard(cards));

  useEffect(() => {
    const intervalId = setInterval(
      () => setCard(randomCard(cards)),
      intervalSeconds * 1000,
    );
    return () => clearInterval(intervalId);
  }, [cards, intervalSeconds]);

  return card;
}

export default function WordCardRotator({ cards, intervalSeconds }) {
  const currentCard = useRandomCard(cards, intervalSeconds);
  return <WordCard {...currentCard} />;
}

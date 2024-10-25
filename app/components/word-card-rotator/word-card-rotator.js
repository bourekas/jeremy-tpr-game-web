"use client";

import { useEffect, useRef, useState } from "react";
import WordCard from "@/app/components/word-card/word-card";

function useCardRotation(cards, intervalSeconds) {
  const [cardIndex, setCardIndex] = useState(0);
  const card = cards[cardIndex];
  const intervalRef = useRef();

  const setNextCardIndex = () => setCardIndex((i) => (i + 1) % cards.length);
  const clearRotationInterval = () => clearInterval(intervalRef.current);
  const setRotationInterval = () =>
    (intervalRef.current = setInterval(
      setNextCardIndex,
      intervalSeconds * 1000,
    ));

  useEffect(() => {
    clearRotationInterval();
    setRotationInterval();

    return clearRotationInterval;
  }, [cards, intervalSeconds]);

  const handleClickNext = () => {
    clearRotationInterval();
    setNextCardIndex();
    setRotationInterval();
  };

  return { card, handleClickNext };
}

export default function WordCardRotator({ cards, intervalSeconds }) {
  const { card, handleClickNext } = useCardRotation(cards, intervalSeconds);

  return <WordCard {...card} onClickNext={handleClickNext} />;
}

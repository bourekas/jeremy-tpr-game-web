import { render } from "@testing-library/react";
import { GameWordsContext } from "@/app/contexts";
import ShuffleWordPlayer from "./shuffle-word-player";
import { useContext } from "react";

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];

const shuffledWords = [
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
];

it("forwards the provided words to the shuffle function", () => {
  const shuffle = jest.fn();

  render(
    <GameWordsContext.Provider value={words}>
      <ShuffleWordPlayer shuffle={shuffle} />
    </GameWordsContext.Provider>,
  );

  expect(shuffle).toHaveBeenCalledWith(words);
});

it("provides the shuffled words instead of the original words", () => {
  const shuffle = jest.fn().mockReturnValue(shuffledWords);

  let providedWords = null;

  const WordsConsumer = () => {
    providedWords = useContext(GameWordsContext);

    return <div />;
  };

  render(
    <ShuffleWordPlayer shuffle={shuffle}>
      <WordsConsumer />
    </ShuffleWordPlayer>,
  );

  expect(providedWords).toEqual(shuffledWords);
});

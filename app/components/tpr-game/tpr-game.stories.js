import TprGame from "./tpr-game";

export default {
  component: TprGame,
};

export const GameLoad = {
  args: {
    useWordPlayer: () => ({}),
  },
};

export const GameStart = {
  args: {
    useWordPlayer: () => ({
      word: {
        word: "לָגַעַת",
        imageSrc: "word-card/to-touch.jpg",
        audio: new Audio("word-card/to-touch.mp3"),
      },
    }),
  },
};

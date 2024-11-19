import WordCard from "./word-card";

export default {
  component: WordCard,
};

export const Medialess = {
  args: {
    word: "לָגַעַת",
  },
};

export const ToTouch = {
  args: {
    word: "לָגַעַת",
    imageSrc: "word-card/to-touch.jpg",
    audio: new Audio("word-card/to-touch.mp3"),
  },
};

export const toCall = {
  args: {
    word: "לְהִתְקַשֵּׁר",
    imageSrc: "word-card/to-call.jpg",
    audio: new Audio("word-card/to-call.mp3"),
  },
};

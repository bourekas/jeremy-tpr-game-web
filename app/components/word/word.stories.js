import Word from "./word";

export default {
  component: Word,
};

export const Medialess = {
  args: {
    word: "לָגַעַת",
  },
};

export const ToTouch = {
  args: {
    word: "לָגַעַת",
    imageSrc: "word/to-touch.jpg",
    audio: new Audio("word/to-touch.mp3"),
  },
};

export const toCall = {
  args: {
    word: "לְהִתְקַשֵּׁר",
    imageSrc: "word/to-call.jpg",
    audio: new Audio("word/to-call.mp3"),
  },
};

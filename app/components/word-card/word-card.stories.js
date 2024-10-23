import WordCard from "./word-card";

export default {
  component: WordCard,
};

export const Default = {
  args: {
    text: "לָגַעַת",
    imageSrc: "/word-card/first.jpg",
    audioSrc: "/word-card/first.mp3",
  },
};

export const Second = {
  args: {
    text: "לְהִתְקַשֵּׁר",
    imageSrc: "/word-card/second.jpg",
    audioSrc: "/word-card/second.mp3",
  },
};

import WordCardRotator from "./components/word-card-rotator/word-card-rotator";

const cards = [
  {
    text: "לָגַעַת",
    imageSrc: "/words/לָגַעַת.jpg",
    audioSrc: "/words/לָגַעַת.mp3",
  },
  {
    text: "לְהַפְסִיק",
    imageSrc: "/words/לְהַפְסִיק.jpg",
    audioSrc: "/words/לְהַפְסִיק.mp3",
  },
  {
    text: "לְהַקְשִׁיב",
    imageSrc: "/words/לְהַקְשִׁיב.jpg",
    audioSrc: "/words/לְהַקְשִׁיב.mp3",
  },
  {
    text: "לְהַתְחִיל",
    imageSrc: "/words/לְהַתְחִיל.jpg",
    audioSrc: "/words/לְהַתְחִיל.mp3",
  },
  {
    text: "לְהִתְקַשֵּׁר",
    imageSrc: "/words/לְהִתְקַשֵּׁר.jpg",
    audioSrc: "/words/לְהִתְקַשֵּׁר.mp3",
  },
  {
    text: "לָזוּז",
    imageSrc: "/words/לָזוּז.jpg",
    audioSrc: "/words/לָזוּז.mp3",
  },
];

export default function Home() {
  return <WordCardRotator cards={cards} intervalSeconds={5} />;
}

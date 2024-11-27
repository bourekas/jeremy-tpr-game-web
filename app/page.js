import Box from "@mui/material/Box";
import TprGame from "./components/tpr-game/tpr-game";

const words = [
  {
    word: "לָגַעַת",
    imageSrc: "/words/לָגַעַת.jpg",
    audioSrc: "/words/לָגַעַת.mp3",
  },
  {
    word: "לְהַפְסִיק",
    imageSrc: "/words/לְהַפְסִיק.jpg",
    audioSrc: "/words/לְהַפְסִיק.mp3",
  },
  {
    word: "לְהַקְשִׁיב",
    imageSrc: "/words/לְהַקְשִׁיב.jpg",
    audioSrc: "/words/לְהַקְשִׁיב.mp3",
  },
  {
    word: "לְהַתְחִיל",
    imageSrc: "/words/לְהַתְחִיל.jpg",
    audioSrc: "/words/לְהַתְחִיל.mp3",
  },
  {
    word: "לְהִתְקַשֵּׁר",
    imageSrc: "/words/לְהִתְקַשֵּׁר.jpg",
    audioSrc: "/words/לְהִתְקַשֵּׁר.mp3",
  },
  {
    word: "לָזוּז",
    imageSrc: "/words/לָזוּז.jpg",
    audioSrc: "/words/לָזוּז.mp3",
  },
];

export default function Home() {
  return (
    <Box sx={{ padding: { xs: 1, sm: 1.5 } }}>
      <TprGame words={words} />
    </Box>
  );
}

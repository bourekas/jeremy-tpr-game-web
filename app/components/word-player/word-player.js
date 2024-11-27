import defaultUseWordPlayer from "./use-word-player";
import DefaultWordCard from "../word-card/word-card";

export default function WordPlayer({
  words,
  displayTime,
  onBackToSetup,
  useWordPlayer = defaultUseWordPlayer,
  WordCard = DefaultWordCard,
}) {
  const { word, isPlaying, play, pause, reset, next } = useWordPlayer(
    words,
    displayTime,
    true,
  );

  const audio = word?.audioSrc && new Audio(word.audioSrc);
  const handleBackToSetup = () => {
    reset();
    onBackToSetup();
  };

  return (
    <WordCard
      key={word.word}
      word={word.word}
      imageSrc={word.imageSrc}
      audio={audio}
      isPlaying={isPlaying}
      onPlay={play}
      onPause={pause}
      onBackToSetup={handleBackToSetup}
      onNextWord={next}
    />
  );
}

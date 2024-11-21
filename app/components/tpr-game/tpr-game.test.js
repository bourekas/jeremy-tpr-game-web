import { render, screen } from "@testing-library/react";
import TprGame from "./tpr-game";

it("renders setup-menu component when initially loaded", () => {
  const SetupMenu = jest.fn().mockReturnValue(<div data-testid="setup-menu" />);

  renderTprGame({ SetupMenu });

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
});

it("calls word-rotation hook with the words prop", () => {
  const words = [mockWord];
  const useWordRotation = jest.fn().mockReturnValue({});

  renderTprGame({ words, useWordRotation });

  expect(useWordRotation).toHaveBeenCalledWith(words);
});

it("calls the start function when start callback is called by setup-menu component", () => {
  const SetupMenu = jest.fn();
  const start = jest.fn();
  const useWordRotation = jest.fn().mockReturnValue({ start });

  renderTprGame({ SetupMenu, useWordRotation });

  // simulate setup-menu component calling the start callback
  const { onStart } = SetupMenu.mock.lastCall[0];
  onStart({ displayTime: 5 });

  expect(start).toHaveBeenCalledTimes(1);
});

it("renders word-card component per returned word from word-rotation hook", () => {
  const WordCard = jest.fn().mockReturnValue(<div data-testid="word-card" />);
  const useWordRotation = jest.fn().mockReturnValue({ word: mockWord });

  renderTprGame({ WordCard, useWordRotation });

  expect(screen.getByTestId("word-card")).toBeInTheDocument();

  // assert that it was called with the correct props
  const wordCardProps = WordCard.mock.lastCall[0];
  expect(wordCardProps).toEqual(expect.objectContaining(mockWord));
});

it("calls the stop function when back-to-setup callback is called by word-card component", () => {
  const WordCard = jest.fn();
  const stop = jest.fn();
  const useWordRotation = jest.fn().mockReturnValue({ word: mockWord, stop });

  renderTprGame({ WordCard, useWordRotation });

  // simulate word-card component calling the back-to-setup callback
  const { onBackToSetup } = WordCard.mock.lastCall[0];
  onBackToSetup();

  expect(stop).toHaveBeenCalledTimes(1);
});

it("calls the next function when next-word callback is called by word-card component", () => {
  const WordCard = jest.fn();
  const next = jest.fn();
  const useWordRotation = jest.fn().mockReturnValue({ word: mockWord, next });

  renderTprGame({ WordCard, useWordRotation });

  // simulate word-card component calling the next-word callback
  const { onNextWord } = WordCard.mock.lastCall[0];
  onNextWord();

  expect(next).toHaveBeenCalledTimes(1);
});

// A mock word that can be used in tests, it has no special significance
const mockWord = {
  word: "לגעת",
  imageSrc: "לגעת.jpg",
  audio: new Audio("לגעת.mp3"),
};

// renders with default mocked dependencies which can be overriden
function renderTprGame(props) {
  render(
    <TprGame
      SetupMenu={jest.fn()}
      WordCard={jest.fn()}
      useWordRotation={jest.fn().mockReturnValue({})}
      {...props}
    />,
  );
}

import { act } from "react";
import { render, screen } from "@testing-library/react";
import TprGame from "./tpr-game";

const sourceWord = {
  word: "לגעת",
  imageSrc: "לגעת.jpg",
  audioSrc: "לגעת.mp3",
};

it("renders setup-menu component when initially loaded", () => {
  const { SetupMenu } = renderTprGame();

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
  expect(SetupMenu.mock.lastCall[0]).toEqual({
    displayTime: expect.any(Number),
    onDisplayTimeChange: expect.any(Function),
    onStart: expect.any(Function),
  });
});

it("renders word-player when setup-menu component calls start callback", () => {
  const words = [sourceWord];
  const { SetupMenu, WordPlayer } = renderTprGame({ words });

  // simulate setup-menu component calling the start callback
  act(() => SetupMenu.mock.lastCall[0].onStart());

  expect(screen.getByTestId("word-player")).toBeInTheDocument();
  expect(WordPlayer.mock.lastCall[0]).toEqual({
    words,
    displayTime: expect.any(Number),
    onBackToSetup: expect.any(Function),
  });
});

it("renders word-player when initial has-started is true", () => {
  renderTprGame({ initialHasStarted: true });

  expect(screen.getByTestId("word-player")).toBeInTheDocument();
});

it("renders setup-menu component when word-player calls back-to-setup callback", () => {
  const { WordPlayer } = renderTprGame({ initialHasStarted: true });

  expect(screen.getByTestId("word-player")).toBeInTheDocument();
  // simulate word-player component calling the back-to-setup callback
  act(() => WordPlayer.mock.lastCall[0].onBackToSetup());
  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
});

// renders with default mocked dependencies which can be overriden
function renderTprGame(props) {
  const SetupMenu = jest.fn().mockReturnValue(<div data-testid="setup-menu" />);
  const WordPlayer = jest
    .fn()
    .mockReturnValue(<div data-testid="word-player" />);

  render(<TprGame SetupMenu={SetupMenu} WordPlayer={WordPlayer} {...props} />);

  return { SetupMenu, WordPlayer };
}

import { act } from "react";
import { render, screen } from "@testing-library/react";
import TprGame from "./tpr-game";

const sourceWord = {
  word: "לגעת",
  imageSrc: "לגעת.jpg",
  audioSrc: "לגעת.mp3",
};

it("renders setup menu with the initial setup", () => {
  const setup = { displayTime: 3, isAutoPlayAudio: false };
  const { SetupMenu } = renderTprGame({ initialSetup: setup });

  expect(screen.getByTestId("setup-menu")).toBeInTheDocument();
  expect(SetupMenu.mock.lastCall[0]).toEqual({
    setup,
    onSetupChange: expect.any(Function),
    onStart: expect.any(Function),
  });
});

it("renders word-player with the configured setup when starting game", () => {
  const words = [sourceWord];
  const initialSetup = { displayTime: 10, isAutoPlayAudio: false };
  const { SetupMenu, WordPlayer } = renderTprGame({ words, initialSetup });

  // simulate setup-menu component calling the start callback
  act(() => {
    const setupMenuProps = SetupMenu.mock.lastCall[0];
    setupMenuProps.onStart();
  });

  const wordPlayerProps = WordPlayer.mock.lastCall[0];
  expect(screen.getByTestId("word-player")).toBeInTheDocument();
  expect(wordPlayerProps).toEqual({
    words,
    setup: initialSetup,
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

it("renders word-player with the updated setup", () => {
  const initialSetup = { displayTime: 3, isAutoPlayAudio: false };
  const updatedSetup = { displayTime: 4, isAutoPlayAudio: true };

  const { SetupMenu, WordPlayer } = renderTprGame({ initialSetup });

  // simulate setup menu component updating setup and starting game
  act(() => {
    const setupMenuProps = SetupMenu.mock.lastCall[0];
    setupMenuProps.onSetupChange(updatedSetup);
    setupMenuProps.onStart();
  });

  const wordPlayerProps = WordPlayer.mock.lastCall[0];
  expect(wordPlayerProps.setup).not.toEqual(initialSetup);
  expect(wordPlayerProps.setup).toEqual(updatedSetup);
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

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordControls from "./word-controls";
import { WordPlaybackContext } from "@/app/contexts/word-playback";

const playButtonName = "Play";
const pauseButtonName = "Pause";

it("calls playAudio when clicking play audio button", async () => {
  const { clickButton, playAudio } = renderWordControls();

  await clickButton("Play audio");
  expect(playAudio).toHaveBeenCalledTimes(1);
});

it("calls play when clicking play button", async () => {
  const { clickButton, play } = renderWordControls({ isPlaying: false });

  await clickButton(playButtonName);
  expect(play).toHaveBeenCalledTimes(1);
});

it("calls pause when clicking pause button", async () => {
  const { clickButton, pause } = renderWordControls({ isPlaying: true });

  await clickButton(pauseButtonName);
  expect(pause).toHaveBeenCalledTimes(1);
});

it("calls previous when clicking previous button", async () => {
  const { clickButton, previous } = renderWordControls();

  await clickButton("Go to previous word");
  expect(previous).toHaveBeenCalledTimes(1);
});

it("calls next when clicking next button", async () => {
  const { clickButton, next } = renderWordControls();

  await clickButton("Go to next word");
  expect(next).toHaveBeenCalledTimes(1);
});

it("calls stop when clicking stop button", async () => {
  const { clickButton, stop } = renderWordControls();

  await clickButton("Stop game");
  expect(stop).toHaveBeenCalledTimes(1);
});

it("renders play button but not pause button when isPlaying is false", () => {
  renderWordControls({ isPlaying: false });

  expect(
    screen.getByRole("button", { name: playButtonName }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: pauseButtonName }),
  ).not.toBeInTheDocument();
});

it("renders pause button but not play button when isPlaying is true", () => {
  renderWordControls({ isPlaying: true });

  expect(
    screen.getByRole("button", { name: pauseButtonName }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: playButtonName }),
  ).not.toBeInTheDocument();
});

function renderWordControls({ isPlaying } = {}) {
  const user = userEvent.setup();
  const controls = {
    playAudio: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
    stop: jest.fn(),
  };

  render(
    <WordPlaybackContext.Provider value={{ controls, isPlaying }}>
      <WordControls />
    </WordPlaybackContext.Provider>,
  );

  const clickButton = (name) =>
    user.click(screen.getByRole("button", { name }));

  return { clickButton, ...controls };
}

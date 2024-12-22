import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordControls from "./word-controls";

const playButtonName = "Play";
const pauseButtonName = "Pause";

it("calls onPlayAudio when clicking play audio button", async () => {
  const { clickButton, onPlayAudio } = renderWordControls();

  await clickButton("Play audio");
  expect(onPlayAudio).toHaveBeenCalledTimes(1);
});

it("calls onPlay when clicking play button", async () => {
  const { clickButton, onPlay } = renderWordControls({ isPlaying: false });

  await clickButton(playButtonName);
  expect(onPlay).toHaveBeenCalledTimes(1);
});

it("calls onPause when clicking pause button", async () => {
  const { clickButton, onPause } = renderWordControls({ isPlaying: true });

  await clickButton(pauseButtonName);
  expect(onPause).toHaveBeenCalledTimes(1);
});

it("calls onPrevious when clicking previous button", async () => {
  const { clickButton, onPrevious } = renderWordControls();

  await clickButton("Go to previous word");
  expect(onPrevious).toHaveBeenCalledTimes(1);
});

it("calls onNext when clicking next button", async () => {
  const { clickButton, onNext } = renderWordControls();

  await clickButton("Go to next word");
  expect(onNext).toHaveBeenCalledTimes(1);
});

it("calls onStop when clicking stop button", async () => {
  const { clickButton, onStop } = renderWordControls();

  await clickButton("Stop game");
  expect(onStop).toHaveBeenCalledTimes(1);
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

function renderWordControls(props) {
  const user = userEvent.setup();
  const controlHandlers = {
    onPlayAudio: jest.fn(),
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onStop: jest.fn(),
  };

  render(<WordControls controlHandlers={controlHandlers} {...props} />);

  const clickButton = (name) =>
    user.click(screen.getByRole("button", { name }));

  return { clickButton, ...controlHandlers };
}

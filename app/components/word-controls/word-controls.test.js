import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  PlayAudioButton,
  BackToSetupButton,
  PreviousWordButton,
  PlayPauseButton,
  NextWordButton,
  StopButton,
} from "./word-controls";
import WordControls from "./word-controls";

it.each([
  ["Play audio", PlayAudioButton],
  ["Back to setup menu", BackToSetupButton],
  ["Go to previous word", PreviousWordButton],
  ["Go to next word", NextWordButton],
  ["Stop game", StopButton],
])("calls onClick when clicking '%s' button", async (name, Button) => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} />);

  const button = screen.getByRole("button", { name });
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("calls onClick when clicking play/pause and playing", async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<PlayPauseButton isPlaying={true} onClick={handleClick} />);

  const button = screen.getByRole("button", { name: "Pause" });
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("calls onClick when clicking play/pause and not playing", async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<PlayPauseButton isPlaying={false} onClick={handleClick} />);

  const button = screen.getByRole("button", { name: "Play" });
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

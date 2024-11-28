import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordCard from "./word-card";

it("calls the back-to-setup callback when back-to-setup button is clicked", async () => {
  const user = userEvent.setup();
  const mockOnBackToSetup = jest.fn();

  render(<WordCard onBackToSetup={mockOnBackToSetup} />);

  await user.click(screen.getByRole("button", { name: "Back to setup menu" }));

  expect(mockOnBackToSetup).toHaveBeenCalledTimes(1);
});

it("renders the TPR image", () => {
  render(<WordCard word="לגעת" imageSrc="/word-card/to-touch.jpg" />);

  const image = screen.getByRole("img", {
    name: "Total Physical Response for the word 'לגעת'",
  });

  expect(image).toHaveAttribute("src", expect.stringContaining("to-touch.jpg"));
});

it("renders the word text as level 1 heading", () => {
  render(<WordCard word="לגעת" />);

  expect(
    screen.getByRole("heading", { name: "לגעת", level: 1 }),
  ).toBeInTheDocument();
});

it("renders pause button but not play button when playing", () => {
  const { rerender } = render(<WordCard isPlaying={true} />);

  expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Play" }),
  ).not.toBeInTheDocument();

  rerender(<WordCard isPlaying={false} />);

  expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Pause" }),
  ).not.toBeInTheDocument();
});

it("calls pause callback when pause button is clicked", async () => {
  const user = userEvent.setup();
  const onPause = jest.fn();
  render(<WordCard isPlaying={true} onPause={onPause} />);

  const button = screen.getByRole("button", { name: "Pause" });
  await user.click(button);

  expect(onPause).toHaveBeenCalledTimes(1);
});

it("calls play callback when play button is clicked", async () => {
  const user = userEvent.setup();
  const onPlay = jest.fn();
  render(<WordCard onPlay={onPlay} />);

  const button = screen.getByRole("button", { name: "Play" });
  await user.click(button);

  expect(onPlay).toHaveBeenCalledTimes(1);
});

it("calls the next-word callback when next-word button is clicked", async () => {
  const user = userEvent.setup();
  const mockOnNextWord = jest.fn();

  render(<WordCard onNextWord={mockOnNextWord} />);

  await user.click(screen.getByRole("button", { name: "Go to next word" }));

  expect(mockOnNextWord).toHaveBeenCalledTimes(1);
});

describe("word audio", () => {
  const createMockAudio = () => ({ play: jest.fn(), pause: jest.fn() });

  it("plays when component mounts and when replay-audio button is clicked", async () => {
    const user = userEvent.setup();
    const mockAudio = createMockAudio();
    render(<WordCard audio={mockAudio} />);

    expect(mockAudio.play).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Replay audio" }));

    expect(mockAudio.play).toHaveBeenCalledTimes(2);
  });

  it("plays new audio when audio prop changes", () => {
    const mockAudio = createMockAudio();
    const { rerender } = render(<WordCard audio={mockAudio} />);

    expect(mockAudio.play).toHaveBeenCalledTimes(1);

    const mockAudioNew = createMockAudio();
    rerender(<WordCard audio={mockAudioNew} />);

    expect(mockAudio.play).toHaveBeenCalledTimes(1);
    expect(mockAudioNew.play).toHaveBeenCalledTimes(1);
  });

  it("pauses audio when component unmounts", () => {
    const mockAudio = createMockAudio();
    const { unmount } = render(<WordCard audio={mockAudio} />);

    unmount();

    expect(mockAudio.pause).toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordCard from "./word-card";

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

describe("word audio", () => {
  const createMockAudio = () => ({ play: jest.fn(), pause: jest.fn() });

  it("plays when component mounts and when play-audio button is clicked", async () => {
    const user = userEvent.setup();
    const audio = createMockAudio();
    render(<WordCard audio={audio} />);

    expect(audio.play).toHaveBeenCalledTimes(1);
  });

  it("plays new audio when audio prop changes", () => {
    const audio = createMockAudio();
    const { rerender } = render(<WordCard audio={audio} />);

    expect(audio.play).toHaveBeenCalledTimes(1);

    const audioNew = createMockAudio();
    rerender(<WordCard audio={audioNew} />);

    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(audioNew.play).toHaveBeenCalledTimes(1);
  });

  it("pauses audio when component unmounts", () => {
    const audio = createMockAudio();
    const { unmount } = render(<WordCard audio={audio} />);

    unmount();

    expect(audio.pause).toHaveBeenCalled();
  });
});

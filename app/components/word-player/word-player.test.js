import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createWordPlayerComponent } from "./word-player";

const setup = {
  displayTime: 3,
};

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];

it("calls onBackToSetup when clicking back-to-setup button", async () => {
  const { onBackToSetup, user } = renderWordPlayer();

  const backToSetupButton = screen.getByRole("button", {
    name: "Back to setup menu",
  });
  await user.click(backToSetupButton);

  expect(onBackToSetup).toHaveBeenCalled();
});

function renderWordPlayer(props = {}) {
  const onBackToSetup = jest.fn();
  const Audio = jest.fn(() => ({ play: jest.fn(), pause: jest.fn() }));
  const user = userEvent.setup({ delay: null });

  const useWordPlayer = jest
    .fn()
    .mockReturnValue({ word: {}, controls: { reset: jest.fn() } });
  const WordContent = jest.fn();
  const WordControls = jest.fn();
  const WordPlayer = createWordPlayerComponent(
    useWordPlayer,
    WordContent,
    WordControls,
  );

  render(
    <WordPlayer
      setup={setup}
      words={words}
      onBackToSetup={onBackToSetup}
      Audio={Audio}
      processWords={(words) => words}
      {...props}
    />,
  );

  return {
    onBackToSetup,
    Audio,
    user,
  };
}

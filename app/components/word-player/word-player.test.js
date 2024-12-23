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

it("calls onBackToSetup when clicking back to setup button", async () => {
  const { onBackToSetup, clickBackToSetupButton } = renderWordPlayer();

  await clickBackToSetupButton();
  expect(onBackToSetup).toHaveBeenCalled();
});

function renderWordPlayer(props = {}) {
  const onBackToSetup = jest.fn();
  const user = userEvent.setup();

  const clickBackToSetupButton = () =>
    user.click(screen.getByRole("button", "Back to setup menu"));

  const useWordPlayer = jest
    .fn()
    .mockReturnValue({ word: words[0], controls: { stop: jest.fn() } });
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
      {...props}
    />,
  );

  return {
    useWordPlayer,
    WordContent,
    WordControls,
    onBackToSetup,
    user,
    clickBackToSetupButton,
  };
}

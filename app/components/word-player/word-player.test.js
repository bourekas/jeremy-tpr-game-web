import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordPlayer from "./word-player";

const setup = {
  displayTime: 3,
};

const words = [
  { word: "a", imageSrc: "a.webp", audioSrc: "a.mp3" },
  { word: "b", imageSrc: "b.webp", audioSrc: "b.mp3" },
];

jest.useFakeTimers();

it("calls onBackToSetup when clicking stop button", async () => {
  const { onBackToSetup, clickStopButton } = renderWordPlayer();

  await clickStopButton();
  expect(onBackToSetup).toHaveBeenCalled();
});

it("calls onBackToSetup when clicking back-to-setup button", async () => {
  const { onBackToSetup, user } = renderWordPlayer();

  const backToSetupButton = screen.getByRole("button", {
    name: "Back to setup menu",
  });
  await user.click(backToSetupButton);

  expect(onBackToSetup).toHaveBeenCalled();
});

function renderWordPlayer(props = {}) {
  const renderWord = jest.fn();
  const onBackToSetup = jest.fn();
  const Audio = jest.fn(() => ({ play: jest.fn(), pause: jest.fn() }));
  const user = userEvent.setup({ delay: null });

  const clickButton = (name) => async () => {
    const button = screen.getByRole("button", { name });
    await user.click(button);
  };
  const clickPreviousButton = clickButton("Go to previous word");
  const clickNextButton = clickButton("Go to next word");
  const clickPlayButton = clickButton("Play");
  const clickPauseButton = clickButton("Pause");
  const clickStopButton = clickButton("Stop game");

  render(
    <WordPlayer
      setup={setup}
      words={words}
      renderWord={renderWord}
      onBackToSetup={onBackToSetup}
      Audio={Audio}
      processWords={(words) => words}
      {...props}
    />,
  );

  return {
    renderWord,
    onBackToSetup,
    Audio,
    user,
    clickPreviousButton,
    clickNextButton,
    clickPlayButton,
    clickPauseButton,
    clickStopButton,
  };
}

expect.extend({
  toHaveReceivedWord(renderWord, { word, imageSrc }) {
    const [keyArg, wordArg, imageSrcArg] = renderWord.mock.lastCall;

    const expected = { key: word, word, imageSrc };
    const received = { key: keyArg, word: wordArg, imageSrc: imageSrcArg };

    const pass = this.equals(received, expected);

    const titleMessage = "Received unexpected word";
    const expectedMessage = `\nExpected: ${this.utils.printExpected(expected)}`;
    const receivedMessage = `\nReceived: ${this.utils.printReceived(received)}`;

    const message = pass
      ? () => titleMessage + receivedMessage
      : () => titleMessage + expectedMessage + receivedMessage;

    return { message, pass };
  },
});

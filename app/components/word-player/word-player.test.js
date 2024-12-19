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

it("initializes with the first word by default", () => {
  const { renderWord } = renderWordPlayer();

  expect(renderWord).toHaveReceivedWord(words[0]);
});

it("initializes with the given initialWordIndex", () => {
  const { renderWord } = renderWordPlayer({ initialWordIndex: 1 });

  expect(renderWord).toHaveReceivedWord(words[1]);
});

it("switches to the next word when clicking next button", async () => {
  const { renderWord, clickNextButton } = renderWordPlayer();

  await clickNextButton();
  expect(renderWord).toHaveReceivedWord(words[1]);
});

it("does not automatically switch to the next word when not playing", async () => {
  const { renderWord, clickNextButton } = renderWordPlayer({
    initialIsPlaying: false,
  });

  act(() => jest.advanceTimersByTime(3000));
  expect(renderWord).toHaveReceivedWord(words[0]);

  await clickNextButton();
  expect(renderWord).toHaveReceivedWord(words[1]);

  act(() => jest.advanceTimersByTime(3000));
  expect(renderWord).toHaveReceivedWord(words[1]);
});

it("continues playing from the middle when clicking play button", async () => {
  const { renderWord, clickPlayButton } = renderWordPlayer({
    initialWordIndex: 1,
    initialIsPlaying: false,
  });

  await clickPlayButton();
  act(() => jest.advanceTimersByTime(3000));

  expect(renderWord).toHaveReceivedWord(words[0]);
});

it("does not switch to the next word before the specified time when clicking play button", async () => {
  const { renderWord, clickPlayButton } = renderWordPlayer({
    initialIsPlaying: false,
  });

  await clickPlayButton();
  act(() => jest.advanceTimersByTime(2999));

  expect(renderWord).toHaveReceivedWord(words[0]);
});

it("switches to the next word at the specified time when clicking play button", async () => {
  const { renderWord, clickPlayButton } = renderWordPlayer({
    initialIsPlaying: false,
  });

  await clickPlayButton();
  act(() => jest.advanceTimersByTime(3000));

  expect(renderWord).toHaveReceivedWord(words[1]);
});

it("stops and resets to the first word when clicking stop button", async () => {
  const { renderWord, clickStopButton } = renderWordPlayer({
    initialWordIndex: 1,
    initialIsPlaying: true,
  });

  await clickStopButton();
  expect(renderWord).toHaveReceivedWord(words[0]);

  act(() => jest.advanceTimersByTime(3000));
  expect(renderWord).toHaveReceivedWord(words[0]);
});

it("reschedules the next word when clicking next button", async () => {
  const { renderWord, clickNextButton } = renderWordPlayer();

  act(() => jest.advanceTimersByTime(2999));
  // manually going to the next index just before scheduling is due
  await clickNextButton();
  expect(renderWord).toHaveReceivedWord(words[1]);

  // still at the same index due to canceling of the previous scheduling
  act(() => jest.advanceTimersByTime(2999));
  expect(renderWord).toHaveReceivedWord(words[1]);

  // the new scheduling switches to the next index
  act(() => jest.advanceTimersByTime(1));
  expect(renderWord).toHaveReceivedWord(words[0]);
});

it("unschedules the next word when clicking stop button", async () => {
  const { renderWord, clickPlayButton, clickStopButton } = renderWordPlayer({
    initialIsPlaying: false,
  });

  await clickPlayButton();
  await clickStopButton();
  act(() => jest.advanceTimersByTime(3000));

  expect(renderWord).toHaveReceivedWord(words[0]);
});

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

it("cancels word scheduling when clicking pause button", async () => {
  const { renderWord, clickPauseButton } = renderWordPlayer();

  await clickPauseButton();
  act(() => jest.advanceTimersByTime(3000));

  expect(renderWord).toHaveReceivedWord(words[0]);
});

it("goes back to previous word when clicking previous button", async () => {
  const { renderWord, clickPreviousButton } = renderWordPlayer({
    initialWordIndex: 1,
  });

  await clickPreviousButton();
  expect(renderWord).toHaveReceivedWord(words[0]);

  await clickPreviousButton();
  expect(renderWord).toHaveReceivedWord(words[1]);
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

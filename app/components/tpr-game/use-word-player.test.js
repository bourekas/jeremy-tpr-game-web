import { act } from "react";
import { renderHook } from "@testing-library/react";
import useWordPlayer from "./use-word-player";

// Words fixture
const words = [
  { word: "לגעת", imageSrc: "לגעת.jpg", audioSrc: "לגעת.mp3" },
  { word: "להתקשר", imageSrc: "להתקשר.jpg", audioSrc: "להתקשר.mp3" },
];

// All tests use fake timers and have isolated state, no need to cleanup
jest.useFakeTimers();

it("initializes with a falsy word by default", () => {
  const { result } = renderHook(() => useWordPlayer(words));
  expect(result.current.word).toBeFalsy();
});

it("initializes with the specified word when an initial word index is provided", () => {
  const { result } = renderHook(() => useWordPlayer(words, null, 1));

  expect(result.current.word).toBe(words[1]);
});

it("return false for isPlay when initalizes", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  expect(result.current.isPlaying).toBe(false);
});

it("switches to the next word when calling next callback", () => {
  const { result } = renderHook(() => useWordPlayer(words));

  act(() => result.current.next());
  expect(result.current.word).toBe(words[0]);

  act(() => result.current.next());
  expect(result.current.word).toBe(words[1]);

  // finished traversing all words, goes back to the terminated state
  act(() => result.current.next());
  expect(result.current.word).toBeFalsy();

  // continues back from the start
  act(() => result.current.next());
  expect(result.current.word).toBe(words[0]);
});

it("does not automatically switch to another word when not playing", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  expect(result.current.word).toBeFalsy();
  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBeFalsy();

  act(() => result.current.next());

  expect(result.current.word).toBe(words[0]);
  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBe(words[0]);
});

it("returns true for isPlaying when calling play callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());
  expect(result.current.isPlaying).toBe(true);
});

it("switches immediately to the first word when calling play from terminated state", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());
  expect(result.current.word).toBe(words[0]);
});

it("does not switch to next word immediately when calling play from the middle", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3, 0));

  expect(result.current.word).toBe(words[0]);
  act(() => result.current.play());
  expect(result.current.word).toBe(words[0]);
});

it("does not switch to the next word before the specified time when calling play", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());

  expect(result.current.word).toBe(words[0]);
  act(() => jest.advanceTimersByTime(2999));
  expect(result.current.word).toBe(words[0]);
});

it("switches to the next word at the specified time when calling play", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());
  expect(result.current.word).toBe(words[0]);

  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBe(words[1]);
});

it("terminates and remains terminated after traversing all words when playing", () => {
  const { result } = renderHook(() => useWordPlayer([words[0]], 3));

  act(() => result.current.play());
  act(() => jest.advanceTimersByTime(3000));
  // switches to the terminated state
  expect(result.current.word).toBeFalsy();

  act(() => jest.advanceTimersByTime(3000));
  // remains at the terminated state
  expect(result.current.word).toBeFalsy();
});

it("plays back from the start when calling play again after first play terminates", () => {
  const { result } = renderHook(() => useWordPlayer([words[0]], 3));

  act(() => result.current.play());
  act(() => jest.advanceTimersByTime(3000));
  // switches to the terminated state
  expect(result.current.word).toBeFalsy();

  // play is called a second time and plays from the start
  act(() => result.current.play());
  expect(result.current.word).toBe(words[0]);
});

it("terminates and resets back to the start when calling reset callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3, 1));

  // back to the initial state
  act(() => result.current.reset());
  expect(result.current.word).toBeFalsy();

  // working as expected from the initial state
  act(() => result.current.next());
  expect(result.current.word).toBe(words[0]);
});

it("reschedules the next word when calling next callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());
  act(() => jest.advanceTimersByTime(2999));

  // manually going to the next word just before scheduling is due
  act(() => result.current.next());
  expect(result.current.word).toBe(words[1]);

  // still at the same word due to canceling of the previous scheduling
  act(() => jest.advanceTimersByTime(2999));
  expect(result.current.word).toBe(words[1]);

  // the new scheduling switches to the next word
  act(() => jest.advanceTimersByTime(1));
  expect(result.current.word).toBeFalsy();
});

it("unschedules the next word when calling reset callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => {
    // calling play and immediately resetting to cancel the scheduling of the next word
    result.current.play();
    result.current.reset();
  });
  act(() => jest.advanceTimersByTime(3000));

  // still at the terminated state
  expect(result.current.word).toBeFalsy();
});

it("stops playing when finished playing one cycle", () => {
  const { result } = renderHook(() => useWordPlayer([words[0]], 3));

  act(() => {
    result.current.play();
    result.current.next();
  });
  act(() => jest.advanceTimersByTime(3000));

  expect(result.current.word).toBeFalsy();
});

it("returns false for isPlaying and cancels word scheduling when calling pause", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());
  expect(result.current.word).toBe(words[0]);
  expect(result.current.isPlaying).toBe(true);

  act(() => result.current.pause());
  expect(result.current.isPlaying).toBe(false);

  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBe(words[0]);
});

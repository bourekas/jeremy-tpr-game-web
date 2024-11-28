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

it("initializes with the first word by default", () => {
  const { result } = renderHook(() => useWordPlayer(words));
  expect(result.current.word).toBe(words[0]);
});

it("initializes with the specified word when an initial word index is provided", () => {
  const { result } = renderHook(() => useWordPlayer(words, null, false, 1));

  expect(result.current.word).toBe(words[1]);
});

it("returns false for isPlay by default when initializes", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  expect(result.current.isPlaying).toBe(false);
});

it("switches to the next word when calling next callback", () => {
  const { result } = renderHook(() => useWordPlayer(words));

  act(() => result.current.next());
  expect(result.current.word).toBe(words[1]);

  // continues back from the start
  act(() => result.current.next());
  expect(result.current.word).toBe(words[0]);
});

it("does not automatically switch to another word when not playing", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  expect(result.current.word).toBe(words[0]);
  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBe(words[0]);

  act(() => result.current.next());

  expect(result.current.word).toBe(words[1]);
  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBe(words[1]);
});

it("returns true for isPlaying when calling play callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());
  expect(result.current.isPlaying).toBe(true);
});

it("continues playing from the middle when calling play", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3, false, 1));

  expect(result.current.word).toBe(words[1]);

  act(() => result.current.play());
  act(() => jest.advanceTimersByTime(3000));
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

it("terminates and resets back to the start when calling reset callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3, false, 1));

  expect(result.current.word).toBe(words[1]);
  act(() => result.current.reset());
  expect(result.current.word).toBe(words[0]);

  // working as expected from the initial state
  act(() => result.current.next());
  expect(result.current.word).toBe(words[1]);
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
  expect(result.current.word).toBe(words[0]);
});

it("unschedules the next word when calling reset callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => {
    // calling play and immediately resetting to cancel the scheduling of the next word
    result.current.play();
    result.current.reset();
  });
  act(() => jest.advanceTimersByTime(3000));

  expect(result.current.word).toBe(words[0]);
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

it("schedules words with the new display time when display time changes", () => {
  const { rerender, result } = renderHook(
    ({ displayTime }) => useWordPlayer(words, displayTime),
    { initialProps: { displayTime: 3 } },
  );

  act(() => result.current.play());

  rerender({ displayTime: 5 });
  act(() => jest.advanceTimersByTime(3000));

  expect(result.current.word).toBe(words[0]);
});

it("plays when initially loaded and provided with initialIsPlaying true", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3, true, 0));

  expect(result.current.isPlaying).toBe(true);
});

it("returns an audio object", () => {
  const { result } = renderHook(() => useWordPlayer(words));
  const audio = new Audio(words[0].audioSrc);

  expect(result.current.audio).toEqual(audio);
});

it("returns the same audio object when rerendering", () => {
  let { result, rerender } = renderHook(() => useWordPlayer(words));
  const audio = result.current.audio;

  rerender();
  expect(result.current.audio).toBe(audio);
});

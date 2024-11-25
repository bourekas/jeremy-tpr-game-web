import { act } from "react";
import { renderHook } from "@testing-library/react";
import useWordPlayer from "./use-word-player";

// Mock words for the tests
const words = [
  { word: "לגעת", imageSrc: "לגעת.jpg", audioSrc: "לגעת.mp3" },
  { word: "להתקשר", imageSrc: "להתקשר.jpg", audioSrc: "להתקשר.mp3" },
];

// All tests use fake timers and isolated state, no need for cleanup
jest.useFakeTimers();

it("initializes with a falsy word by default", () => {
  const { result } = renderHook(() => useWordPlayer(words));

  expect(result.current.word).toBeFalsy();
});

it("initializes with the specified word when initial word index is provided", () => {
  const { result } = renderHook(() => useWordPlayer(words, 1));

  expect(result.current.word).toBe(words[1]);
});

it("schedules words at the specified time when calling play callback", () => {
  const { result } = renderHook(() => useWordPlayer(words));

  act(() => result.current.play(3));
  expect(result.current.word).toBe(words[0]);

  act(() => jest.advanceTimersByTime(2999));
  expect(result.current.word).toBe(words[0]);

  act(() => jest.advanceTimersByTime(1));
  expect(result.current.word).toBe(words[1]);

  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBeFalsy();
});

it("goes to the next word when calling next callback", () => {
  const { result } = renderHook(() => useWordPlayer(words));

  // initial state
  expect(result.current.word).toBeFalsy();

  act(() => result.current.next());
  expect(result.current.word).toBe(words[0]);

  act(() => result.current.next());
  expect(result.current.word).toBe(words[1]);

  // finished all words, now at the end
  act(() => result.current.next());
  expect(result.current.word).toBeFalsy();

  // subsequent calls do nothing
  act(() => result.current.next());
  expect(result.current.word).toBeFalsy();
});

it("reschedules the next word when calling next callback", () => {
  const { result } = renderHook(() => useWordPlayer(words));

  act(() => {
    result.current.play(3);
    jest.advanceTimersByTime(2999);
    // manually going to the next word just before scheduling is due
    result.current.next();
  });

  // advancing by one word because of calling next
  expect(result.current.word).toBe(words[1]);

  // still at the same word due to rescheduling
  act(() => jest.advanceTimersByTime(2999));
  expect(result.current.word).toBe(words[1]);

  // the rescheduling is working as expected
  act(() => jest.advanceTimersByTime(1));
  expect(result.current.word).toBeFalsy();
});

it("resets to the initial state when calling reset callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 1));

  // back to the initial state
  act(() => result.current.reset());
  expect(result.current.word).toBeFalsy();

  // working as expected from the initial state
  act(() => result.current.next());
  expect(result.current.word).toBe(words[0]);
});

it("unschedules the next word when calling reset callback", () => {
  const { result } = renderHook(() => useWordPlayer(words));

  act(() => {
    // calling play and immediately resetting to cancel the scheduling of the next word
    result.current.play(3);
    result.current.reset();
    jest.advanceTimersByTime(3000);
  });

  // still at the initial state
  expect(result.current.word).toBeFalsy();
});

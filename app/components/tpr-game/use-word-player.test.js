import { act } from "react";
import { renderHook } from "@testing-library/react";
import useWordPlayer from "./use-word-player";

// Default mock words for the tests
const words = [
  { word: "לגעת", imageSrc: "לגעת.jpg", audioSrc: "לגעת.mp3" },
  { word: "להתקשר", imageSrc: "להתקשר.jpg", audioSrc: "להתקשר.mp3" },
];

// All tests use fake timers and isolated state, no need for cleanup
jest.useFakeTimers();

it("initializes with a falsy word by default", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  expect(result.current.word).toBeFalsy();
});

it("initializes with the specified word when initial word index is provided", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3, 1));

  expect(result.current.word).toBe(words[1]);
});

it("switches immediately to the first word when calling play", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => result.current.play());

  expect(result.current.word).toBe(words[0]);
});

it("does not switch to the next word before the specified time when calling play", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => {
    result.current.play();
    jest.advanceTimersByTime(2999);
  });

  expect(result.current.word).toBe(words[0]);
});

it("switches to the next word at the specified time when calling play", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => {
    result.current.play();
    jest.advanceTimersByTime(3000);
  });

  expect(result.current.word).toBe(words[1]);
});

it("switches to a falsy word and terminates after traversing all words when calling play", () => {
  const { result } = renderHook(() => useWordPlayer([words[0]], 3));

  // switches to the terminated state
  act(() => {
    result.current.play();
    jest.advanceTimersByTime(3000);
  });
  expect(result.current.word).toBeFalsy();

  // remains at the terminated state
  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.word).toBeFalsy();
});

it("plays back from the start when calling play again after first play terminates", () => {
  const { result } = renderHook(() => useWordPlayer([words[0]], 3));

  // switches to the terminated state
  act(() => {
    result.current.play();
    jest.advanceTimersByTime(3000);
  });

  // play is called a second time and plays from the start
  act(() => result.current.play());
  expect(result.current.word).toBe(words[0]);
});

it("goes to the next word when calling next callback", () => {
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

it("resets to the initial state when calling reset callback", () => {
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

  act(() => {
    result.current.play();
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

it("unschedules the next word when calling reset callback", () => {
  const { result } = renderHook(() => useWordPlayer(words, 3));

  act(() => {
    // calling play and immediately resetting to cancel the scheduling of the next word
    result.current.play();
    result.current.reset();
    jest.advanceTimersByTime(3000);
  });

  // still at the initial state
  expect(result.current.word).toBeFalsy();
});

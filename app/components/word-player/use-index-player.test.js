import { act } from "react";
import { renderHook } from "@testing-library/react";
import useIndexPlayer from "./use-index-player";

// All tests use fake timers and have isolated state, no need to cleanup
jest.useFakeTimers();

it("initializes with the first index by default", () => {
  const { result } = renderHook(() => useIndexPlayer({ length: 2 }));
  expect(result.current.index).toBe(0);
});

it("initializes with the specified index when an initial index is provided", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, initialIndex: 1 }),
  );

  expect(result.current.index).toBe(1);
});

it("returns true for isPlay by default when initializes", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3 }),
  );

  expect(result.current.isPlaying).toBe(true);
});

it("switches to the next index when calling next callback", () => {
  const { result } = renderHook(() => useIndexPlayer({ length: 2 }));

  act(() => result.current.controls.next());
  expect(result.current.index).toBe(1);

  // continues back from the start
  act(() => result.current.controls.next());
  expect(result.current.index).toBe(0);
});

it("does not automatically switch to next index when not playing", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3 }),
  );

  expect(result.current.index).toBe(0);
  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.index).toBe(0);

  act(() => result.current.controls.next());

  expect(result.current.index).toBe(1);
  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.index).toBe(1);
});

it("returns true for isPlaying when calling play callback", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3 }),
  );

  act(() => result.current.controls.play());
  expect(result.current.isPlaying).toBe(true);
});

it("does not switch to the next index before the specified time when calling play", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3 }),
  );

  act(() => result.current.controls.play());

  expect(result.current.index).toBe(0);
  act(() => jest.advanceTimersByTime(2999));
  expect(result.current.index).toBe(0);
});

it("stops and goes back to the start when calling stop", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3, initialIndex: 1 }),
  );

  expect(result.current.index).toBe(1);
  act(() => result.current.controls.stop());
  expect(result.current.index).toBe(0);

  // working as expected from the initial state
  act(() => result.current.controls.next());
  expect(result.current.index).toBe(1);
});

it("unschedules the next index when calling stop", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3 }),
  );

  act(() => {
    // calling play and immediately stopping to cancel the scheduling of the next index
    result.current.controls.play();
    result.current.controls.stop();
  });
  act(() => jest.advanceTimersByTime(3000));

  expect(result.current.index).toBe(0);
});

it("returns false for isPlaying and cancels index scheduling when calling pause", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3 }),
  );

  act(() => result.current.controls.play());
  expect(result.current.index).toBe(0);
  expect(result.current.isPlaying).toBe(true);

  act(() => result.current.controls.pause());
  expect(result.current.isPlaying).toBe(false);

  act(() => jest.advanceTimersByTime(3000));
  expect(result.current.index).toBe(0);
});

it("schedules indexes with the new display time when display time changes", () => {
  const { rerender, result } = renderHook(
    ({ displayTime }) => useIndexPlayer({ length: 2, displayTime }),
    { initialProps: { displayTime: 3 } },
  );

  act(() => result.current.controls.play());

  rerender({ displayTime: 5 });
  act(() => jest.advanceTimersByTime(3000));

  expect(result.current.index).toBe(0);
});

it("plays when initially loaded and provided with initialIsPlaying true", () => {
  const { result } = renderHook(() =>
    useIndexPlayer({ length: 2, displayTime: 3, initialIsPlaying: true }),
  );

  expect(result.current.isPlaying).toBe(true);
});

it("goes back to previous index when calling previous", () => {
  const { result } = renderHook(() => useIndexPlayer({ length: 2 }));
  expect(result.current.index).toBe(0);

  act(() => result.current.controls.next());
  expect(result.current.index).toBe(1);

  act(() => result.current.controls.previous());
  expect(result.current.index).toBe(0);

  act(() => result.current.controls.previous());
  expect(result.current.index).toBe(1);
});

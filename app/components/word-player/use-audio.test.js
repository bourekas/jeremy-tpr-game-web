import { act } from "react";
import { renderHook } from "@testing-library/react";
import useAudio from "./use-audio";

beforeEach(spyOnAudio);

it("returns an audio object matching the given audio source", () => {
  const initialProps = { audioSrc: "foo.mp3" };
  const { result, rerender } = renderHook(
    ({ audioSrc }) => useAudio(audioSrc),
    { initialProps },
  );
  expect(result.current.audioSrc).toBe("foo.mp3");

  rerender({ audioSrc: "bar.mp3" });
  expect(result.current.audioSrc).toBe("bar.mp3");
});

it("returns the exact same audio object when rerendering with the same audio source", () => {
  const { result, rerender } = renderHook(() => useAudio("foo.mp3"));

  const originalAudio = result.current;
  rerender();
  const newAudio = result.current;

  expect(newAudio).toBe(originalAudio);
});

it("plays audio once when loading", () => {
  const { result } = renderHook(() => useAudio("foo.mp3"));

  expect(result.current.play).toHaveBeenCalledTimes(1);
});

it("does not play the same audio again when it finished playing to the end", () => {
  const { result, rerender } = renderHook(() => useAudio("foo.mp3"));
  expect(result.current.play).toHaveBeenCalledTimes(1);

  act(() => result.current.onended()); // simulate audio play ended

  rerender();
  expect(result.current.play).toHaveBeenCalledTimes(1);
});

it("does not pause audio when rerendering with the same audio source", () => {
  const { result, rerender } = renderHook(() => useAudio("foo.mp3"));
  expect(result.current.play).toHaveBeenCalledTimes(1);

  rerender();
  expect(result.current.pause).not.toHaveBeenCalled();
});

it("plays new audio even if finished playing last audio", () => {
  const initialProps = { audioSrc: "foo.mp3" };
  const { result, rerender } = renderHook(
    ({ audioSrc }) => useAudio(audioSrc),
    { initialProps },
  );
  const firstAudio = result.current;

  expect(firstAudio.play).toHaveBeenCalledTimes(1);

  act(() => result.current.onended());
  rerender({ audioSrc: "bar.mp3" });
  const secondAudio = result.current;

  expect(secondAudio.play).toHaveBeenCalledTimes(1);
});

it("pauses when unmounting", () => {
  const { result, unmount } = renderHook(() => useAudio("foo.mp3"));
  expect(result.current.pause).not.toHaveBeenCalled();

  unmount();
  expect(result.current.pause).toHaveBeenCalledTimes(1);
});

function spyOnAudio() {
  return jest.spyOn(window, "Audio").mockImplementation((audioSrc) => ({
    audioSrc,
    play: jest.fn(),
    pause: jest.fn(),
  }));
}

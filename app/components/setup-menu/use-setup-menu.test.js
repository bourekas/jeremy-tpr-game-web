import { renderHook } from "@testing-library/react";
import useSetupMenu from "./use-setup-menu";
import { SetupContext } from "@/app/contexts/setup";
import { GameDisplayContext } from "@/app/contexts/game-display";

it("returns the provided setup state", () => {
  const setup = { displayTime: 4, isAutoPlayAudio: false };
  const { result } = renderSetupMenuHook({ setup });

  expect(result.current.setup).toEqual(setup);
});

it("returns the provided setDisplayTime handler", () => {
  const setDisplayTime = jest.fn();
  const { result } = renderSetupMenuHook({ setDisplayTime });

  expect(result.current.setDisplayTime).toBe(setDisplayTime);
});

it("returns the provided setIsAutoPlayAudio handler", () => {
  const setIsAutoPlayAudio = jest.fn();
  const { result } = renderSetupMenuHook({ setIsAutoPlayAudio });

  expect(result.current.setIsAutoPlayAudio).toBe(setIsAutoPlayAudio);
});

it("returns the provided start handler", () => {
  const start = jest.fn();
  const { result } = renderSetupMenuHook({ start });

  expect(result.current.start).toBe(start);
});

function renderSetupMenuHook({
  setup,
  setDisplayTime,
  setIsAutoPlayAudio,
  start,
}) {
  const wrapper = ({ children }) => (
    <SetupContext.Provider
      value={{ setup, setDisplayTime, setIsAutoPlayAudio }}
    >
      <GameDisplayContext.Provider value={{ onStart: start }}>
        {children}
      </GameDisplayContext.Provider>
    </SetupContext.Provider>
  );

  return renderHook(() => useSetupMenu(), { wrapper });
}

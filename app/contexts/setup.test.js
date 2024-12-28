import { renderHook } from "@testing-library/react";
import { SetupContext, SetupProvider } from "./setup";
import { useContext } from "react";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

it("returns the default setup when used without a provider", () => {
  const { result } = renderHook(() => useContext(SetupContext));

  expect(result.current.setup).toEqual(defaultSetup);
});

it("returns the default setup as the initial setup by default", () => {
  const { result } = renderHook(() => useContext(SetupContext), {
    wrapper: SetupProvider,
  });

  expect(result.current.setup).toEqual(defaultSetup);
});

it("returns the given initial setup when provided", () => {
  const initialSetup = { displayTime: 1, isAutoPlayAudio: false };
  const wrapper = ({ children }) => (
    <SetupProvider initialSetup={initialSetup}>{children}</SetupProvider>
  );
  const { result } = renderHook(() => useContext(SetupContext), { wrapper });

  expect(result.current.setup).toEqual(initialSetup);
});

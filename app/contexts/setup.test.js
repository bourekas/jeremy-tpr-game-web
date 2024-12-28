import { renderHook } from "@testing-library/react";
import { SetupProvider, useSetup, useSetupChange } from "./setup";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

it("returns the default setup when used without a provider", () => {
  const { result } = renderHook(() => useSetup());

  expect(result.current).toEqual(defaultSetup);
});

it("returns the default setup as the initial setup by default", () => {
  const { result } = renderHook(() => useSetup(), { wrapper: SetupProvider });

  expect(result.current).toEqual(defaultSetup);
});

it("returns the given initial setup when provided", () => {
  const initialSetup = { displayTime: 1, isAutoPlayAudio: false };
  const wrapper = ({ children }) => (
    <SetupProvider initialSetup={initialSetup}>{children}</SetupProvider>
  );
  const { result } = renderHook(() => useSetup(), { wrapper });

  expect(result.current).toEqual(initialSetup);
});

it("changes the setup when calling the setup change callback", () => {
  const newSetup = { displayTime: 1, isAutoPlayAudio: false };
  const { result } = renderHook(
    () => {
      const onSetupChange = useSetupChange();
      onSetupChange(newSetup);

      return useSetup();
    },
    { wrapper: SetupProvider },
  );

  expect(result.current).toEqual(newSetup);
});

it("throws an error when using useSetupChange without a setup provider", () => {
  expect(() => renderHook(() => useSetupChange())).toThrow(
    "Used useSetupChange without a SetupProvider",
  );
});

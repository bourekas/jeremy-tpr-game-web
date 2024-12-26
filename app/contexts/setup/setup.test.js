import { renderHook } from "@testing-library/react";
import { SetupProvider, useSetup, useSetupChange } from "./setup";

const defaultSetup = { displayTime: 5, isAutoPlayAudio: true };

it("returns the default setup when setup is not provided", () => {
  const { result } = renderHook(() => useSetup());

  expect(result.current).toEqual(defaultSetup);
});

it("returns the default setup as the initial setup when provided", () => {
  const { result } = renderHook(() => useSetup(), { wrapper: SetupProvider });

  expect(result.current).toEqual(defaultSetup);
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

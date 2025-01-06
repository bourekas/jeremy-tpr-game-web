import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import BackToSetupButton from "./back-to-setup-button";
import { GamePlaybackContext } from "@/app/contexts";

it("calls the click handler when clicked", async () => {
  const handleClick = jest.fn();
  const user = userEvent.setup();
  render(<BackToSetupButton onClick={handleClick} />);

  const button = screen.getByRole("button", { name: "Go back to setup" });
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("calls the provided stop control when provided", async () => {
  const stop = jest.fn();
  const user = userEvent.setup();
  const wrapper = ({ children }) => (
    <GamePlaybackContext.Provider value={{ controls: { stop } }}>
      {children}
    </GamePlaybackContext.Provider>
  );
  render(<BackToSetupButton />, { wrapper });

  const button = screen.getByRole("button", { name: "Go back to setup" });
  await user.click(button);

  expect(stop).toHaveBeenCalledTimes(1);
});

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ActionButton from "./action-button";

it("calls onClick when clicking button", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<ActionButton name="Some action" onClick={onClick} />);

  const button = screen.getByRole("button", { name: "Some action" });
  await user.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});

it("renders the given children", () => {
  render(
    <ActionButton>
      <div data-testid="action-button-child" />
    </ActionButton>,
  );

  expect(screen.getByTestId("action-button-child")).toBeInTheDocument();
});

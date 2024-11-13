import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SetupMenu from "./setup-menu";
import { expect } from "@storybook/test";

describe("TPR Game Setup heading", () => {
  const getGameSetupHeading = (level) =>
    screen.getByRole("heading", { name: "TPR Game Setup", level });

  it("renders with level 1 heading by default", () => {
    render(<SetupMenu />);

    expect(getGameSetupHeading(1)).toBeInTheDocument();
  });

  it("renders with specified heading level", () => {
    const level = 3;
    render(<SetupMenu headingLevel={level} />);

    expect(getGameSetupHeading(level)).toBeInTheDocument();
  });
});

it("updates the display time interval when slider value changes", () => {
  const user = userEvent.setup();
  render(<SetupMenu />);

  const slider = screen.getByRole("slider", { name: "Display time" });
  expect(slider).toBeInTheDocument();
});

it("calls the start callback with setup values when the start button is clicked", async () => {
  const user = userEvent.setup();
  const setup = { displayTime: 10 };
  const mockOnStart = jest.fn();

  render(<SetupMenu setup={setup} onStart={mockOnStart} />);

  const button = screen.getByRole("button", { name: "Start" });
  expect(button).toBeInTheDocument();

  await user.click(button);
  expect(mockOnStart).toHaveBeenCalledWith(setup);
});

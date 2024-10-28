import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as stories from "./setup-menu.stories";

const { Default } = composeStories(stories);

it("has a heading", () => {
  render(<Default />);
  const heading = screen.getByRole("heading", {
    name: "TPR Game Setup",
    level: 1,
  });
  expect(heading).toBeInTheDocument();
});

it("has a display time slider", () => {
  render(<Default />);
  const slider = screen.getByRole("slider", { name: "Display time" });
  expect(slider).toBeInTheDocument();
});

it("has a start button", async () => {
  const user = userEvent.setup();
  const onStartMock = jest.fn();
  render(<Default onStart={onStartMock} />);

  const button = screen.getByRole("button", { name: "Start" });
  expect(button).toBeInTheDocument();

  await user.click(button);
  expect(onStartMock).toHaveBeenCalledTimes(1);
  expect(onStartMock).toHaveBeenCalledWith({
    displayTime: Default.args.displayTime,
  });
});

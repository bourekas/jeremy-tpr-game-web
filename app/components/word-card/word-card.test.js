import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { composeStories } from "@storybook/react";
import * as stories from "./word-card.stories";
import { expect } from "@storybook/test";

const { Default } = composeStories(stories);

it("has card", () => {
  render(<Default />);
  const card = screen.getByRole("article");
  expect(card).toBeInTheDocument();
});

it("has text", () => {
  render(<Default />);
  const content = screen.getByText(Default.args.text);
  expect(content).toBeInTheDocument();
});

it("has image", () => {
  render(<Default />);
  const image = screen.getByRole("img", { name: Default.args.text });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", Default.args.imageSrc);
});

it("has replay button", async () => {
  const user = userEvent.setup();
  render(<Default />);

  const button = screen.getByRole("button", { name: "Replay" });
  expect(button).toBeInTheDocument();

  expect(screen.queryByText("Replay")).not.toBeInTheDocument();
  await user.hover(button);
  const tooltip = await screen.findByText("Replay");
  expect(tooltip).toBeInTheDocument();
});

it("has next button", async () => {
  const user = userEvent.setup();
  const onClickNextMock = jest.fn();
  render(<Default onClickNext={onClickNextMock} />);

  const button = screen.getByRole("button", { name: "Next word" });
  expect(button).toBeInTheDocument();

  expect(screen.queryByText("Next word")).not.toBeInTheDocument();
  await user.hover(button);
  const tooltip = await screen.findByText("Next word");
  expect(tooltip).toBeInTheDocument();

  await user.click(button);
  expect(onClickNextMock).toHaveBeenCalledOnce();
});

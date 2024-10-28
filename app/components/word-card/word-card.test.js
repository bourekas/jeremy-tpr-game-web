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

it("has replay audio button", async () => {
  const user = userEvent.setup();
  render(<Default />);

  const button = screen.getByRole("button", { name: "Replay audio" });
  expect(button).toBeInTheDocument();

  expect(screen.queryByText("Replay audio")).not.toBeInTheDocument();
  await user.hover(button);
  const tooltip = await screen.findByText("Replay audio");
  expect(tooltip).toBeInTheDocument();
});

it("has next button", async () => {
  const user = userEvent.setup();
  const onClickNextMock = jest.fn();
  render(<Default onClickNext={onClickNextMock} />);

  const button = screen.getByRole("button", { name: "Go to the next word" });
  expect(button).toBeInTheDocument();

  expect(screen.queryByText("Go to the next word")).not.toBeInTheDocument();
  await user.hover(button);
  const tooltip = await screen.findByText("Go to the next word");
  expect(tooltip).toBeInTheDocument();

  await user.click(button);
  expect(onClickNextMock).toHaveBeenCalledOnce();
});

it("has back to setting button", async () => {
  const user = userEvent.setup();
  const onClickBackToSetupMock = jest.fn();
  render(<Default onClickBackToSetup={onClickBackToSetupMock} />);

  const button = screen.getByRole("button", { name: "Back to setup menu" });
  expect(button).toBeInTheDocument();

  expect(screen.queryByText("Back to setup menu")).not.toBeInTheDocument();
  await user.hover(button);
  expect(screen.getByText("Back to setup menu")).toBeInTheDocument();

  await user.click(button);
  expect(onClickBackToSetupMock).toHaveBeenCalledTimes(1);
});

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WordCard from "./word-card";

it("has card", () => {
  render(<WordCard />);
  const card = screen.getByRole("article");
  expect(card).toBeInTheDocument();
});

it("has text", () => {
  render(<WordCard text="hello" />);
  const content = screen.getByText("hello");
  expect(content).toBeInTheDocument();
});

it("has image", () => {
  render(<WordCard imageSrc="/word-card/first.jpg" />);
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
});

it("has replay audio button", async () => {
  const user = userEvent.setup();
  render(<WordCard />);

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
  render(<WordCard onClickNext={onClickNextMock} />);

  const button = screen.getByRole("button", { name: "Go to the next word" });
  expect(button).toBeInTheDocument();

  expect(screen.queryByText("Go to the next word")).not.toBeInTheDocument();
  await user.hover(button);
  const tooltip = await screen.findByText("Go to the next word");
  expect(tooltip).toBeInTheDocument();

  await user.click(button);
  expect(onClickNextMock).toHaveBeenCalledTimes(1);
});

it("has back to setting button", async () => {
  const user = userEvent.setup();
  const onClickBackToSetupMock = jest.fn();
  render(<WordCard onClickBackToSetup={onClickBackToSetupMock} />);

  const button = screen.getByRole("button", { name: "Back to setup menu" });
  expect(button).toBeInTheDocument();

  expect(screen.queryByText("Back to setup menu")).not.toBeInTheDocument();
  await user.hover(button);
  expect(screen.getByText("Back to setup menu")).toBeInTheDocument();

  await user.click(button);
  expect(onClickBackToSetupMock).toHaveBeenCalledTimes(1);
});

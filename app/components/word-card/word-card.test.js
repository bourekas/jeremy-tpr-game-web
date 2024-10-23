import { render, screen, within } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "./word-card.stories";

const { Default } = composeStories(stories);

let card;

beforeEach(() => {
  render(<Default />);
  card = screen.getByRole("article");
});

it("has card", () => {
  expect(card).toBeInTheDocument();
});

it("has text", () => {
  expect(card).toHaveTextContent(Default.args.text);
});

it("has image", () => {
  const image = within(card).getByRole("img", { name: Default.args.text });
  expect(image).toHaveAttribute("src", Default.args.imageSrc);
});

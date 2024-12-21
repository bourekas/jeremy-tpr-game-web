import { render, screen } from "@testing-library/react";
import WordContent from "./word-content";

it("renders the TPR image", () => {
  render(<WordContent word="לגעת" imageSrc="/word/to-touch.jpg" />);

  const image = screen.getByRole("img", {
    name: "Total Physical Response for the word 'לגעת'",
  });

  expect(image).toHaveAttribute("src", expect.stringContaining("to-touch.jpg"));
});

it("renders the word text as level 1 heading", () => {
  render(<WordContent word="לגעת" />);

  expect(
    screen.getByRole("heading", { name: "לגעת", level: 1 }),
  ).toBeInTheDocument();
});

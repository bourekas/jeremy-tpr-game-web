import { render, screen } from "@testing-library/react";
import Home from "./page";

it("renders the main heading", () => {
  render(<Home />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("TPR Game");
});

import { render, screen } from "@testing-library/react";
import GamePanel from "./game-panel";

it("renders its children", () => {
  render(
    <GamePanel>
      <div data-testid="child" />
    </GamePanel>,
  );

  expect(screen.getByTestId("child")).toBeInTheDocument();
});

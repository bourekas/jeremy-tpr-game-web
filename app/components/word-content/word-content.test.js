import { render, screen } from "@testing-library/react";
import WordContent from "./word-content";
import { GamePlaybackContext } from "@/app/contexts";
import { GameSetupContext } from "@/app/contexts";

it("renders the TPR image", () => {
  renderWordContent();

  const image = screen.getByRole("img", {
    name: "Total Physical Response for the word 'לגעת'",
  });

  expect(image).toHaveAttribute("src", expect.stringContaining("to-touch.jpg"));
});

it("renders the word text as level 1 heading", () => {
  renderWordContent();

  expect(
    screen.getByRole("heading", { name: "לגעת", level: 1 }),
  ).toBeInTheDocument();
});

function renderWordContent() {
  render(
    <GameSetupContext.Provider value={{}}>
      <GamePlaybackContext.Provider
        value={{
          word: {
            word: "לגעת",
            imageSrc: "/word/to-touch.jpg",
            audio: new Audio("/word/to-touch.mp3"),
          },
          scheduleNextWord: jest.fn(),
          cancelNextWord: jest.fn(),
          controls: { next: jest.fn() },
        }}
      >
        <WordContent />
      </GamePlaybackContext.Provider>
      ,
    </GameSetupContext.Provider>,
  );
}

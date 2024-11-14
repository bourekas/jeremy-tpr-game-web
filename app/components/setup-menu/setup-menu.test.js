import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SetupMenu from "./setup-menu";

describe("TPR Game Setup heading", () => {
  const getGameSetupHeading = (level) =>
    screen.getByRole("heading", { name: "TPR Game Setup", level });

  it("renders with level 1 heading by default", () => {
    render(<SetupMenu />);
    expect(getGameSetupHeading(1)).toBeInTheDocument();
  });

  it("renders with specified heading level", () => {
    render(<SetupMenu headingLevel={3} />);
    expect(getGameSetupHeading(3)).toBeInTheDocument();
  });
});

describe("display time option", () => {
  it("renders slider with the initial display time value", () => {
    render(<SetupMenu initialDisplayTime={3} />);
    const slider = getDisplayTimeSlider();

    expect(slider).toHaveValue("3");
  });

  it("does not increment slider value above max value", () => {
    render(<SetupMenu initialDisplayTime={10} />);
    const slider = getDisplayTimeSlider();

    incrementDisplayTimeSlider(slider);

    expect(slider).toHaveValue("10");
  });

  it("does not decrement slider value below min value", () => {
    render(<SetupMenu initialDisplayTime={1} />);
    const slider = getDisplayTimeSlider();

    decrementDisplayTimeSlider(slider);

    expect(slider).toHaveValue("1");
  });

  it("renders the latest display time value text", async () => {
    render(<SetupMenu initialDisplayTime={5} />);

    expect(
      screen.getByText("Display time for each word: 5 second(s)"),
    ).toBeInTheDocument();

    incrementDisplayTimeSlider();

    expect(screen.queryByText(/5 second\(s\)/)).not.toBeInTheDocument();
    expect(screen.getByText(/6 second\(s\)/)).toBeInTheDocument();
  });
});

it("calls start callback with latest display time value when start button is clicked", async () => {
  const user = userEvent.setup();
  const mockOnStart = jest.fn();

  render(<SetupMenu initialDisplayTime={5} onStart={mockOnStart} />);

  const startButton = screen.getByRole("button", { name: "Start" });

  await user.click(startButton);

  expect(mockOnStart).toHaveBeenLastCalledWith({ displayTime: 5 });

  incrementDisplayTimeSlider();
  await user.click(startButton);

  expect(mockOnStart).toHaveBeenLastCalledWith({ displayTime: 6 });
});

function incrementDisplayTimeSlider(slider) {
  changeDisplayTimeSlider(slider, true);
}

function decrementDisplayTimeSlider(slider) {
  changeDisplayTimeSlider(slider, false);
}

// Can only increment/decrement by 1 at a time. Changing by more than 1 won't work.
function changeDisplayTimeSlider(slider = getDisplayTimeSlider(), increment) {
  const delta = increment ? 1 : -1;
  fireEvent.change(slider, { target: { value: +slider.value + delta } });
}

function getDisplayTimeSlider() {
  return screen.getByRole("slider", { name: "Display time" });
}

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
    render(<SetupMenu setup={{ displayTime: 3 }} />);
    const slider = getDisplayTimeSlider();

    expect(slider).toHaveValue("3");
  });

  it("does not increment slider value above max value", () => {
    render(<SetupMenu setup={{ displayTime: 10 }} />);
    const slider = getDisplayTimeSlider();

    incrementDisplayTimeSlider(slider);

    expect(slider).toHaveValue("10");
  });

  it("does not decrement slider value below min value", () => {
    render(<SetupMenu setup={{ displayTime: 1 }} />);
    const slider = getDisplayTimeSlider();

    decrementDisplayTimeSlider(slider);

    expect(slider).toHaveValue("1");
  });

  it("renders the latest display time value text", async () => {
    const onSetupChange = jest.fn();
    render(
      <SetupMenu setup={{ displayTime: 5 }} onSetupChange={onSetupChange} />,
    );

    expect(
      screen.getByText("Display time for each word: 5 second(s)"),
    ).toBeInTheDocument();

    incrementDisplayTimeSlider();
    expect(onSetupChange).toHaveBeenCalledWith({ displayTime: 6 });
  });
});

describe("auto-play audio option", () => {
  it("renders switch button", () => {
    render(<SetupMenu />);
    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });

    expect(checkbox).toBeInTheDocument();
  });

  it("is enabled when isAutoPlayAudio is true", () => {
    render(<SetupMenu setup={{ isAutoPlayAudio: true }} />);
    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });

    expect(checkbox).toBeChecked();
  });

  it("is disabled when isAutoPlayAudio is false", () => {
    render(<SetupMenu setup={{ isAutoPlayAudio: false }} />);
    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });

    expect(checkbox).not.toBeChecked();
  });

  it("calls onSetupChange with isAutoPlayAudio false when disabling auto audio", async () => {
    const user = userEvent.setup();
    const onSetupChange = jest.fn();

    render(
      <SetupMenu
        setup={{ isAutoPlayAudio: true }}
        onSetupChange={onSetupChange}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });
    await user.click(checkbox);

    expect(onSetupChange).toHaveBeenCalledWith({ isAutoPlayAudio: false });
  });

  it("calls onSetupChange with isAutoPlayAudio true when enabling auto audio", async () => {
    const user = userEvent.setup();
    const onSetupChange = jest.fn();

    render(
      <SetupMenu
        setup={{ isAutoPlayAudio: false }}
        onSetupChange={onSetupChange}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });
    await user.click(checkbox);

    expect(onSetupChange).toHaveBeenCalledWith({ isAutoPlayAudio: true });
  });
});

it("calls start callback when start button is clicked", async () => {
  const user = userEvent.setup();
  const onStart = jest.fn();

  render(<SetupMenu setup={{ displayTime: 5 }} onStart={onStart} />);

  const startButton = screen.getByRole("button", { name: "Start" });
  await user.click(startButton);

  expect(onStart).toHaveBeenCalled();
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

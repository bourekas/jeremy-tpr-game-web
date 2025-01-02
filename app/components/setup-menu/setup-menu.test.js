import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SetupMenu from "./setup-menu";
import { GameStatusContext, GameSetupContext } from "@/app/contexts";

const setup = { displayTime: 4, isAutoPlayAudio: false };

describe("TPR Game Setup heading", () => {
  const getGameSetupHeading = (level) =>
    screen.getByRole("heading", { name: "TPR Game Setup", level });

  it("renders with level 1 heading by default", () => {
    renderSetupMenu();
    expect(getGameSetupHeading(1)).toBeInTheDocument();
  });

  it("renders with specified heading level", () => {
    renderSetupMenu({ headingLevel: 3 });
    expect(getGameSetupHeading(3)).toBeInTheDocument();
  });
});

describe("display time option", () => {
  it("renders slider with the initial display time value", () => {
    renderSetupMenu({ setup: { displayTime: 3 } });
    const slider = getDisplayTimeSlider();

    expect(slider).toHaveValue("3");
  });

  it("does not increment slider value above max value", () => {
    renderSetupMenu({ setup: { displayTime: 10 } });
    const slider = getDisplayTimeSlider();

    incrementDisplayTimeSlider(slider);

    expect(slider).toHaveValue("10");
  });

  it("does not decrement slider value below min value", () => {
    renderSetupMenu({ setup: { displayTime: 1 } });
    const slider = getDisplayTimeSlider();

    decrementDisplayTimeSlider(slider);

    expect(slider).toHaveValue("1");
  });

  it("renders the latest display time value text", async () => {
    const { setDisplayTime } = renderSetupMenu({
      setup: { displayTime: 5 },
    });

    expect(
      screen.getByText("Display time for each word: 5 second(s)"),
    ).toBeInTheDocument();

    incrementDisplayTimeSlider();
    expect(setDisplayTime).toHaveBeenCalledWith(6);
  });
});

describe("auto-play audio option", () => {
  it("renders switch button", () => {
    renderSetupMenu();
    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });

    expect(checkbox).toBeInTheDocument();
  });

  it("is enabled when isAutoPlayAudio is true", () => {
    renderSetupMenu({ setup: { isAutoPlayAudio: true } });
    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });

    expect(checkbox).toBeChecked();
  });

  it("is disabled when isAutoPlayAudio is false", () => {
    renderSetupMenu({ setup: { isAutoPlayAudio: false } });
    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });

    expect(checkbox).not.toBeChecked();
  });

  it("calls setIsAutoPlayAudio with isAutoPlayAudio false when disabling auto audio", async () => {
    const { user, setIsAutoPlayAudio } = renderSetupMenu({
      setup: { isAutoPlayAudio: true },
    });

    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });
    await user.click(checkbox);

    expect(setIsAutoPlayAudio).toHaveBeenCalledWith(false);
  });

  it("calls setIsAutoPlayAudio with true when enabling auto audio", async () => {
    const { user, setIsAutoPlayAudio } = renderSetupMenu({
      setup: { isAutoPlayAudio: false },
    });

    const checkbox = screen.getByRole("checkbox", { name: "Auto-Play Audio" });
    await user.click(checkbox);

    expect(setIsAutoPlayAudio).toHaveBeenCalledWith(true);
  });
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

function renderSetupMenu(props = {}) {
  const user = userEvent.setup();
  const setDisplayTime = jest.fn();
  const setIsAutoPlayAudio = jest.fn();
  const startGame = jest.fn();

  render(
    <GameSetupContext.Provider
      value={{
        ...(props.setup || setup),
        setDisplayTime,
        setIsAutoPlayAudio,
      }}
    >
      <GameStatusContext.Provider value={{ startGame }}>
        <SetupMenu {...props} />
      </GameStatusContext.Provider>
    </GameSetupContext.Provider>,
  );

  return { user, setDisplayTime, setIsAutoPlayAudio, onStart: startGame };
}

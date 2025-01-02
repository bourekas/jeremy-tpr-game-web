import { GameSetupContext, GameStatusContext } from "@/app/contexts";
import SetupMenu from "./setup-menu";

const meta = {
  component: SetupMenu,
  decorators: [
    (Story, { args: { displayTime, isAutoPlayAudio } }) => (
      <GameSetupContext.Provider value={{ displayTime, isAutoPlayAudio }}>
        <GameStatusContext.Provider value={{}}>
          <Story />
        </GameStatusContext.Provider>
      </GameSetupContext.Provider>
    ),
  ],
};
export default meta;

export const Default = {
  args: {
    displayTime: 5,
    isAutoPlayAudio: false,
  },
};

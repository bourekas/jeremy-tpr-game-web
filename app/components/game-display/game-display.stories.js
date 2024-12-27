import { SetupProvider } from "@/app/contexts/setup/setup";
import SetupMenuComponent from "@/app/components/setup-menu/setup-menu";
import { createWordPlayerComponent } from "@/app/components/word-player/word-player";
import { createGameDisplayComponent } from "./game-display";
import WordContent from "../word-content/word-content";

const WordPlayerComponent = createWordPlayerComponent(WordContent);

const GameDisplay = createGameDisplayComponent(
  SetupMenuComponent,
  WordPlayerComponent,
);

const meta = {
  component: GameDisplay,
  decorators: [
    (Story) => (
      <SetupProvider>
        <Story />
      </SetupProvider>
    ),
  ],
};
export default meta;

export const SetupMenu = {
  args: {
    initialIsGameStarted: false,
  },
};

export const WordPlayer = {
  args: {
    initialIsGameStarted: true,
  },
};

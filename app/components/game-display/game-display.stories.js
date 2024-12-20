import GameDisplay from "./game-display";

const meta = {
  component: GameDisplay,
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

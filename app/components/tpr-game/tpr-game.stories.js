import TprGame from "./tpr-game";

const meta = {
  component: TprGame,
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

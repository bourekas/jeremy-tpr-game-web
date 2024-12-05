import TprGame from "./tpr-game";

export default meta = {
  component: TprGame,
};

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

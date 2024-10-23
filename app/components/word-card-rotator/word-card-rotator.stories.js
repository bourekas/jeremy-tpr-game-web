import WordCardRotator from "./word-card-rotator";
import { Default as First, Second } from "../word-card/word-card.stories";

export default {
  component: WordCardRotator,
};

export const Default = {
  args: {
    cards: [First.args, Second.args],
    intervalSeconds: 3,
  },
};

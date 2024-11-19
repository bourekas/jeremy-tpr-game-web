import WordCardRotator from "./word-card-rotator";
import { ToTouch } from "../word-card/word-card.stories";

export default {
  component: WordCardRotator,
};

export const Default = {
  args: {
    cards: [ToTouch.args],
    intervalSeconds: 3,
  },
};

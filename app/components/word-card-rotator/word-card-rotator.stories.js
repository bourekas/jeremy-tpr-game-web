import WordCardRotator from "./word-card-rotator";
import { ToTouch, ToCall } from "../word-card/word-card.stories";

export default {
  component: WordCardRotator,
};

export const Default = {
  args: {
    cards: [ToTouch.args, ToCall.args],
    intervalSeconds: 3,
  },
};

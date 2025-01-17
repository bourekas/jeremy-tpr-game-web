import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: [],
  setup: { displayTime: 5, isAutoPlayAudio: true },
  isGameStarted: false,
  playback: { index: 0, isPlaying: true },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload;
    },
    setDisplayTime: (state, action) => {
      state.setup.displayTime = action.payload;
    },
    setIsAutoPlayAudio: (state, action) => {
      state.setup.isAutoPlayAudio = action.payload;
    },
    startGame: (state) => {
      state.isGameStarted = true;
    },
    backToSetup: (state) => {
      state.isGameStarted = false;
    },
    play: (state) => {
      state.playback.isPlaying = true;
    },
    pause: (state) => {
      state.playback.isPlaying = false;
    },
    previous: (state) => {
      if (state.playback.index) {
        state.playback.index = state.playback.index - 1;
      } else if (state.words) {
        state.playback.index = state.words.length - 1;
      }
    },
    next: (state) => {
      state.playback.index = (state.playback.index + 1) % state.words.length;
    },
    stop: (state) => {
      state.playback = initialState.playback;
      state.isGameStarted = false;
    },
  },
  selectors: {
    selectIsGameStarted: (state) => state.isGameStarted,
    selectSetup: (state) => state.setup,
  },
});

export const {
  setWords,
  setDisplayTime,
  setIsAutoPlayAudio,
  startGame,
  backToSetup,
  play,
  pause,
  previous,
  next,
  stop,
} = gameSlice.actions;

export const { selectIsGameStarted, selectSetup } = gameSlice.selectors;

export default gameSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomWord } from "utils/data";

export type GameIs = "playing" | "won" | "lost";

export interface GameState {
  word: string;
  words: string[];
  gameIs: GameIs;
}

const initialState: GameState = {
  word: "",
  words: [],
  gameIs: "playing",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    setGameIs: (state, action: PayloadAction<GameIs>) => {
      state.gameIs = action.payload;
    },
    restartGame: (state) => {
      state.word = getRandomWord(state.words);
      state.gameIs = "playing";
    },
    setWords: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload;
    },
  },
});

export const { setWord, setGameIs, restartGame, setWords } = gameSlice.actions;

export default gameSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomWord } from "data";

export type GameIs = "playing" | "won" | "lost";

export interface GameState {
  word: string;
  gameIs: GameIs;
}

const initialState: GameState = {
  word: getRandomWord(),
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
      state.word = getRandomWord();
      state.gameIs = "playing";
    },
  },
});

export const { setWord, setGameIs, restartGame } = gameSlice.actions;

export default gameSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface GameState {
  word: string;
  finished: boolean;
  didPlayerWin: boolean;
  didPlayerLose: boolean;
  gameOver: boolean;
}

const initialState: GameState = {
  word: "",
  finished: false,
  didPlayerWin: false,
  didPlayerLose: false,
  gameOver: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    setFinished: (state, action: PayloadAction<boolean>) => {
      state.finished = action.payload;
    },
    setDidPlayerWin: (state, action: PayloadAction<boolean>) => {
      state.didPlayerWin = action.payload;
    },
    setDidPlayerLose: (state, action: PayloadAction<boolean>) => {
      state.didPlayerLose = action.payload;
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.gameOver = action.payload;
    },
  },
});

export const { setWord, setFinished, setDidPlayerWin, setDidPlayerLose, setGameOver } = gameSlice.actions;

export const selectWord = (state: RootState) => state.game.word;
export const selectIsFinished = (state: RootState) => state.game.finished;
export const selectDidPlayerWin = (state: RootState) => state.game.didPlayerWin;
export const selectDidPlayerLose = (state: RootState) => state.game.didPlayerLose;
export const selectIsGameOver = (state: RootState) => state.game.gameOver;

export default gameSlice.reducer;

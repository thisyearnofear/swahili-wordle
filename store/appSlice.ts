import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetGame } from "utils/reset-game";
import { createInitialState, createSetState, restartGameAction, RootState } from "utils/store";

export const appSlice = createSlice({
  name: "app",
  initialState: createInitialState(),
  reducers: {
    startGame: (state, action: PayloadAction<string[]>) => {
      return restartGameAction(state, action.payload);
    },
    setNumberOfLetter: (state, action: PayloadAction<number>) => {
      resetGame();
      return restartGameAction(state, state.words, action.payload);
    },
    restartGame: (state) => restartGameAction(state),
    setCurrentKeys: createSetState("keys", true),
    setModal: createSetState("modal", true),
    setBackspace: createSetState("backspace"),
    setCurrentRow: createSetState("currentRow"),
    setEnter: createSetState("enter"),
    setGameIs: createSetState("gameIs"),
    setSettingsActive: createSetState("isSettingsActive"),
    setNumberOfLetters: createSetState("numberOfLetters"),
  },
});

export const {
  restartGame,
  setCurrentKeys,
  setModal,
  setBackspace,
  setCurrentRow,
  setEnter,
  setGameIs,
  startGame,
  setSettingsActive,
  setNumberOfLetter,
  setNumberOfLetters,
} = appSlice.actions;

export const letterSelector = ({ currentRow, word, words, numberOfLetters }: RootState) => ({
  currentRow,
  word,
  words,
  numberOfLetters,
});

export const panelSelector = ({ gameIs, keys, modal }: RootState) => ({ gameIs, keys, modal });

export const stateSelector = ({ gameIs, word }: RootState) => ({ gameIs, word });

export const gameSelector = ({ backspace, enter }: RootState) => ({ backspace, enter });

export const gameHookSelector = ({ backspace, currentRow, enter, gameIs, keys, words, numberOfLetters }: RootState) => {
  return { backspace, currentRow, enter, keys, isFinished: gameIs !== "playing", words, numberOfLetters };
};

export const settingsSelector = ({ isSettingsActive, numberOfLetters }: RootState) => ({
  isSettingsActive,
  numberOfLetters,
});

export default appSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetGame } from "utils/reset-game";
import { createInitialState, createSetState, restartGameAction, RootState } from "utils/store";

export const appSlice = createSlice({
  name: "app",
  initialState: createInitialState(),
  reducers: {
    startGame: (state, action: PayloadAction<{ words: string[]; encodedChallengeModeWord?: string }>) => {
      const { words, encodedChallengeModeWord } = action.payload;
      return restartGameAction(state, { words, encodedChallengeModeWord });
    },
    setNumberOfLetter: (state, action: PayloadAction<number>) => {
      resetGame();
      return restartGameAction(state, { numberOfLetters: action.payload });
    },
    restartGame: (state, action: PayloadAction<number | undefined>) => {
      return restartGameAction(state, { numberOfLetters: action.payload });
    },
    setCurrentKeys: createSetState("keys", true),
    setModal: createSetState("modal", true),
    setBackspace: createSetState("backspace"),
    setCurrentRow: createSetState("currentRow"),
    setEnter: createSetState("enter"),
    setGameIs: createSetState("gameIs"),
    setSettingsActive: createSetState("isSettingsActive"),
    setLanguagesActive: createSetState("isLanguagesActive"),
    setChallengeActive: createSetState("isChallengeActive"),
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
  setLanguagesActive,
  setChallengeActive,
  setNumberOfLetter,
  setNumberOfLetters,
} = appSlice.actions;

export const letterSelector = ({ currentRow, word, words, numberOfLetters }: RootState) => ({
  currentRow,
  word,
  words,
  numberOfLetters,
});

export const panelSelector = ({ gameIs, keys, modal, isChallengeMode }: RootState) => ({
  gameIs,
  keys,
  modal,
  isChallengeMode,
});

export const stateSelector = ({ gameIs, word, isChallengeMode }: RootState) => ({ gameIs, word, isChallengeMode });

export const gameSelector = ({ backspace, enter }: RootState) => ({ backspace, enter });

export const gameHookSelector = ({
  backspace,
  currentRow,
  enter,
  gameIs,
  keys,
  words,
  numberOfLetters,
  isChallengeActive,
  isSettingsActive,
}: RootState) => {
  return {
    backspace,
    currentRow,
    enter,
    keys,
    isFinished: gameIs !== "playing",
    words,
    numberOfLetters,
    isChallengeActive,
    isSettingsActive,
  };
};

export const settingsSelector = ({ isChallengeMode, isSettingsActive, numberOfLetters }: RootState) => ({
  isChallengeMode,
  isSettingsActive,
  numberOfLetters,
});

export default appSlice.reducer;

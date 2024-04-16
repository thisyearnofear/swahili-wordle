import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { resetGame } from "utils/reset-game";
import { createInitialState, createSetState, restartGameAction, type RootState } from "utils/store";

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

const defaultSelector = <T>(state: T) => state;

export const letterSelector = createSelector(
  ({ currentRow, word, words, numberOfLetters }: RootState) => ({
    currentRow,
    word,
    words,
    numberOfLetters,
  }),
  defaultSelector,
);

export const panelSelector = createSelector(
  ({ gameIs, keys, modal, isChallengeMode }: RootState) => ({
    gameIs,
    keys,
    modal,
    isChallengeMode,
  }),
  defaultSelector,
);

export const stateSelector = createSelector(
  ({ gameIs, word, isChallengeMode }: RootState) => ({ gameIs, word, isChallengeMode }),
  defaultSelector,
);

export const gameSelector = createSelector(
  ({ backspace, enter }: RootState) => ({ backspace, enter }),
  defaultSelector,
);

export const gameHookSelector = createSelector(
  ({
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
      gameIs,
      words,
      numberOfLetters,
      isChallengeActive,
      isSettingsActive,
    };
  },
  (state) => ({ ...state, isFinished: state.gameIs !== "playing" }),
);

export const settingsSelector = createSelector(
  ({ isChallengeMode, isSettingsActive, numberOfLetters }: RootState) => ({
    isChallengeMode,
    isSettingsActive,
    numberOfLetters,
  }),
  defaultSelector,
);

export const challengeSelector = createSelector(
  ({ isChallengeActive, words }: RootState) => ({ isChallengeActive, words }),
  defaultSelector,
);

export default appSlice.reducer;

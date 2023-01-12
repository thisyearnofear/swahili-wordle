import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomWord } from "utils/data";
import { DEFAULT_NUMBER_OF_LETTERS } from "utils/numbers-of-letters";
import { resetGame } from "utils/reset-game";

interface AppState {
  isSettingsActive: boolean;
  numberOfLetters: number;
  backspace: boolean;
  currentRow: number;
  enter: boolean;
  gameIs: "playing" | "won" | "lost";
  keys: Record<number, string[]>;
  modal: { content: string; isOpen: boolean; showButton: boolean };
  word: string;
  words: string[];
}

const initialState: AppState = {
  isSettingsActive: false,
  numberOfLetters: DEFAULT_NUMBER_OF_LETTERS,
  backspace: false,
  currentRow: 0,
  enter: false,
  gameIs: "playing",
  keys: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] },
  modal: { isOpen: false, content: "", showButton: false },
  word: "",
  words: [],
};

const createSetState =
  <T extends keyof AppState>(property: T) =>
  (state: AppState, action: PayloadAction<AppState[T]>) => {
    state[property] = action.payload;
  };

const getWords = (words: string[], length: number) => {
  return words.filter((word): word is string => typeof word === "string" && word.length === length);
};

const restartGameAction = (state: AppState, words?: string[], numberOfLetters?: number): AppState => {
  const wordsWithNumberOfLetters = getWords(words ?? state.words, numberOfLetters ?? state.numberOfLetters);

  return {
    ...initialState,
    numberOfLetters: numberOfLetters ?? state.numberOfLetters,
    words: words ?? state.words,
    word: getRandomWord(wordsWithNumberOfLetters),
    gameIs: "playing",
  };
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startGame: (
      state,
      { payload: { numberOfLetters, words } }: PayloadAction<{ words: string[]; numberOfLetters: number }>
    ) => {
      return restartGameAction(state, words, numberOfLetters);
    },
    restartGame: (state) => restartGameAction(state),
    setCurrentKeys: (state, action: PayloadAction<Record<number, string[]>>) => {
      state.keys = { ...state.keys, ...action.payload };
    },
    setModal: (state, action: PayloadAction<Partial<AppState["modal"]>>) => {
      state.modal = { ...state.modal, ...action.payload };
    },
    setBackspace: createSetState("backspace"),
    setCurrentRow: createSetState("currentRow"),
    setEnter: createSetState("enter"),
    setGameIs: createSetState("gameIs"),
    setSettingsActive: createSetState("isSettingsActive"),
    setNumberOfLetter: (state, action: PayloadAction<number>) => {
      resetGame();
      return restartGameAction(state, state.words, action.payload);
    },
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
} = appSlice.actions;

export const letterSelector = ({ currentRow, word, words, numberOfLetters }: AppState) => ({
  currentRow,
  word,
  words,
  numberOfLetters,
});

export const panelSelector = ({ gameIs, keys, modal }: AppState) => ({ gameIs, keys, modal });

export const stateSelector = ({ gameIs, word }: AppState) => ({ gameIs, word });

export const gameSelector = ({ backspace, enter }: AppState) => ({ backspace, enter });

export const gameHookSelector = ({ backspace, currentRow, enter, gameIs, keys, words, numberOfLetters }: AppState) => {
  return { backspace, currentRow, enter, keys, isFinished: gameIs !== "playing", words, numberOfLetters };
};

export const settingsSelector = ({ isSettingsActive, numberOfLetters }: AppState) => ({
  isSettingsActive,
  numberOfLetters,
});

export default appSlice.reducer;

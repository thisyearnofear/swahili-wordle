import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomWord } from "utils/data";

interface AppState {
  isSettingsActive: boolean;
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

const getWords = (words: string[], length: number = 5) => {
  return words.filter((word): word is string => typeof word === "string" && word.length === length);
};

const restartGameAction = (state: AppState, words?: string[]): AppState => {
  const wordsWithNumberOfLetters = getWords(words ?? state.words);

  return {
    ...initialState,
    words: words ?? state.words,
    word: getRandomWord(wordsWithNumberOfLetters),
    gameIs: "playing",
  };
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<string[]>) => {
      return restartGameAction(state, action.payload);
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
} = appSlice.actions;

export const letterSelector = ({ currentRow, word, words }: AppState) => ({
  currentRow,
  word,
  words,
});

export const panelSelector = ({ gameIs, keys, modal }: AppState) => ({ gameIs, keys, modal });

export const stateSelector = ({ gameIs, word }: AppState) => ({ gameIs, word });

export const gameSelector = ({ backspace, enter }: AppState) => ({ backspace, enter });

export const gameHookSelector = ({ backspace, currentRow, enter, gameIs, keys, words }: AppState) => {
  return { backspace, currentRow, enter, keys, isFinished: gameIs !== "playing", words };
};

export const settingsSelector = ({ isSettingsActive }: AppState) => ({
  isSettingsActive,
});

export default appSlice.reducer;

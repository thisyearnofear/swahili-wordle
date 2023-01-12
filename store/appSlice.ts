import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomWord } from "utils/data";

type Keys = Record<0 | 1 | 2 | 3 | 4 | 5, string[]>;

interface AppState {
  backspace: boolean;
  currentRow: keyof Keys | 6;
  enter: boolean;
  gameIs: "playing" | "won" | "lost";
  keys: Keys;
  modal: { content: string; isOpen: boolean; showButton: boolean };
  word: string;
  words: string[];
}

const initialState: AppState = {
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

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload;
      state.word = getRandomWord(action.payload);
    },
    restartGame: (state) => {
      return {
        ...initialState,
        words: state.words,
        word: getRandomWord(state.words),
        gameIs: "playing",
      };
    },
    setCurrentKeys: (state, action: PayloadAction<Partial<Keys>>) => {
      state.keys = { ...state.keys, ...action.payload };
    },
    setModal: (state, action: PayloadAction<Partial<AppState["modal"]>>) => {
      state.modal = { ...state.modal, ...action.payload };
    },
    setBackspace: createSetState("backspace"),
    setCurrentRow: createSetState("currentRow"),
    setEnter: createSetState("enter"),
    setGameIs: createSetState("gameIs"),
  },
});

export const { restartGame, setCurrentKeys, setModal, setBackspace, setCurrentRow, setEnter, setGameIs, startGame } =
  appSlice.actions;

export const letterSelector = ({ currentRow, word, words }: AppState) => ({ currentRow, word, words });

export const panelSelector = ({ gameIs, keys, modal }: AppState) => ({ gameIs, keys, modal });

export const stateSelector = ({ gameIs, word }: AppState) => ({ gameIs, word });

export const gameSelector = ({ backspace, enter }: AppState) => ({ backspace, enter });

export const gameHookSelector = ({ backspace, currentRow, enter, gameIs, keys, words }: AppState) => {
  return { backspace, currentRow, enter, keys, isFinished: gameIs !== "playing", words };
};

export default appSlice.reducer;

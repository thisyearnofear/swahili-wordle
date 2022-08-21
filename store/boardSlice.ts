import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Keys = Record<0 | 1 | 2 | 3 | 4 | 5, string[]>;

export type Rows = Record<keyof Keys, boolean>;

export type CurrentRow = keyof Keys | 6;

export interface BoardState {
  currentRow: CurrentRow;
  keys: Keys;
  backspace: boolean;
  enter: boolean;
}

const initialState: BoardState = {
  currentRow: 0,
  keys: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] },
  backspace: false,
  enter: false,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentRow: (state, action: PayloadAction<CurrentRow>) => {
      state.currentRow = action.payload;
    },
    setCurrentKeys: (state, action: PayloadAction<Partial<Keys>>) => {
      state.keys = { ...state.keys, ...action.payload };
    },
    setBackspace: (state, action: PayloadAction<boolean>) => {
      state.backspace = action.payload;
    },
    setEnter: (state, action: PayloadAction<boolean>) => {
      state.enter = action.payload;
    },
    restartBoard: () => initialState,
  },
});

export const { setCurrentRow, setCurrentKeys, setBackspace, setEnter, restartBoard } = boardSlice.actions;

export default boardSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BoardState {
	currentRow: number;
	currentKeys: string[];
	backspace: boolean;
	enter: boolean;
}

const initialState: BoardState = {
	currentRow: 0,
	currentKeys: [],
	backspace: false,
	enter: false,
};

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		setCurrentRow: (state, action: PayloadAction<number>) => {
			state.currentRow = action.payload;
		},
		setCurrentKeys: (state, action: PayloadAction<string[]>) => {
			state.currentKeys = action.payload;
		},
		setBackspace: (state, action: PayloadAction<boolean>) => {
			state.backspace = action.payload;
		},
		setEnter: (state, action: PayloadAction<boolean>) => {
			state.enter = action.payload;
		},
	},
});

export const { setCurrentRow, setCurrentKeys, setBackspace, setEnter } = boardSlice.actions;

export const selectCurrentRow = (state: RootState) => state.board.currentRow;
export const selectCurrentKeys = (state: RootState) => state.board.currentKeys;
export const selectBackspace = (state: RootState) => state.board.backspace;
export const selectEnter = (state: RootState) => state.board.enter;

export default boardSlice.reducer;

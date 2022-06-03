import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Keys = {
	0: string[];
	1: string[];
	2: string[];
	3: string[];
	4: string[];
	5: string[];
};

export type Rows = Record<keyof Keys, boolean>;

export type CurrentRow = keyof Keys | 6;

export interface BoardState {
	currentRow: CurrentRow;
	keys: Keys;
	backspace: boolean;
	enter: boolean;
	rows: Rows;
}

const initialState: BoardState = {
	currentRow: 0,
	keys: {
		0: [] as string[],
		1: [] as string[],
		2: [] as string[],
		3: [] as string[],
		4: [] as string[],
		5: [] as string[],
	},
	backspace: false,
	enter: false,
	rows: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
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
		setRows: (state, action: PayloadAction<Partial<Rows>>) => {
			state.rows = { ...state.rows, ...action.payload };
		},
	},
});

export const { setCurrentRow, setCurrentKeys, setBackspace, setEnter, setRows } = boardSlice.actions;

export const selectCurrentRow = (state: RootState) => state.board.currentRow;
export const selectCurrentKeys = (state: RootState) => state.board.keys;
export const selectBackspace = (state: RootState) => state.board.backspace;
export const selectEnter = (state: RootState) => state.board.enter;
export const selectRows = (state: RootState) => state.board.rows;

export default boardSlice.reducer;

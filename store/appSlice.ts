import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AppState {
	showModal: boolean;
	modalContent: any;
}

const initialState: AppState = {
	showModal: false,
	modalContent: null,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setShowModal: (state, action: PayloadAction<boolean>) => {
			state.showModal = action.payload;
		},
		setModalContent: (state, action: PayloadAction<any>) => {
			state.modalContent = action.payload;
		},
	},
});

export const { setShowModal, setModalContent } = appSlice.actions;

export const selectIsModalShown = (state: RootState) => state.app.showModal;
export const selectModalContent = (state: RootState) => state.app.modalContent;

export default appSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AppState {
  modal: {
    isOpen: boolean;
    content: string;
    showButton: boolean;
  };
}

const initialState: AppState = {
  modal: {
    isOpen: false,
    content: "",
    showButton: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<Partial<AppState["modal"]>>) => {
      state.modal = { ...state.modal, ...action.payload };
    },
  },
});

export const { setModal } = appSlice.actions;

export const selectModal = (state: RootState) => state.app.modal;

export default appSlice.reducer;

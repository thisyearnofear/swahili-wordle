import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import boardReducer from "./boardSlice";
import gameReducer from "./gameSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    board: boardReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

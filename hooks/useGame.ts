import { useCallback } from "react";
import {
	selectBackspace,
	selectCurrentKeys,
	selectCurrentRow,
	selectEnter,
	setBackspace,
	setCurrentKeys as setKeys,
	setCurrentRow,
	setEnter,
} from "store/boardSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export function useGame(a: boolean = false) {
	const dispatch = useAppDispatch();
	const backspace = useAppSelector(selectBackspace);
	const enter = useAppSelector(selectEnter);
	const currentRow = useAppSelector(selectCurrentRow);
	const keys = useAppSelector(selectCurrentKeys);

	const deleteLastLetter = useCallback(() => {
		if (currentRow !== 6 && keys[currentRow].length) {
			dispatch(setKeys({ [currentRow]: keys[currentRow].slice(0, -1) }));
		}
		if (backspace) dispatch(setBackspace(false));
	}, [backspace, currentRow, keys, dispatch]);

	const passToNextRow = useCallback(() => {
		if (currentRow !== 6 && keys[currentRow].length >= 5) {
			dispatch(setCurrentRow((currentRow + 1) as keyof typeof keys));
		}
		if (enter) dispatch(setEnter(false));
	}, [enter, currentRow, keys, dispatch]);

	const addNewKey = useCallback(
		(key: string) => {
			if (currentRow !== 6 && keys[currentRow].length !== 5) {
				dispatch(setKeys({ [currentRow]: [...keys[currentRow], key] }));
			}
		},
		[currentRow, keys, dispatch]
	);

	const addNewKeyWithEvent = useCallback(
		(e: WindowEventMap["keydown"]) => {
			const key = e.key.toLowerCase();
			if (/* isFinished || */ currentRow === 6 || e.altKey || e.ctrlKey || e.metaKey) return;
			if (key === "backspace") return dispatch(setBackspace(true));
			if (key === "enter") return dispatch(setEnter(true));
			if (key.length !== 1 || !key.match(/[a-z]|ñ/gi) || keys[currentRow].length === 5) return;
			dispatch(setKeys({ [currentRow]: [...keys[currentRow], key] }));
		},
		[currentRow, keys, dispatch]
	);

	return {
		deleteLastLetter,
		passToNextRow,
		addNewKey,
		addNewKeyWithEvent,
	};
}

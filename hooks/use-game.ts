import { existsWord } from "utils/data";
import { useCallback } from "react";
import { setModal, setBackspace, setCurrentKeys, setCurrentRow, setEnter, gameHookSelector } from "store/appSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const MAX_ROW_NUMBER = 6;

export function useGame() {
  const dispatch = useAppDispatch();

  const { isFinished, backspace, enter, currentRow, keys, words, numberOfLetters } = useAppSelector(gameHookSelector);

  const activeModal = useCallback(
    (content: string, time = 400) => {
      dispatch(setModal({ content, isOpen: true }));
      setTimeout(() => dispatch(setModal({ isOpen: false })), time);
    },
    [dispatch]
  );

  const deleteLastLetter = useCallback(() => {
    if (currentRow !== MAX_ROW_NUMBER && keys[currentRow].length)
      dispatch(setCurrentKeys({ [currentRow]: keys[currentRow].slice(0, -1) }));
    if (backspace) dispatch(setBackspace(false));
  }, [backspace, currentRow, keys, dispatch]);

  const passToNextRow = useCallback(() => {
    if (enter) dispatch(setEnter(false));
    if (currentRow === MAX_ROW_NUMBER) return;
    if (keys[currentRow].length < numberOfLetters) return activeModal("Too short");
    const exists = existsWord(keys[currentRow].join(""), words);
    if (!exists) return activeModal("Word not found");
    dispatch(setCurrentRow(currentRow + 1));
  }, [numberOfLetters, enter, currentRow, keys, dispatch, activeModal, words]);

  const addNewKey = useCallback(
    (key: string) => {
      if (currentRow !== MAX_ROW_NUMBER && keys[currentRow].length !== numberOfLetters)
        dispatch(setCurrentKeys({ [currentRow]: [...keys[currentRow], key] }));
    },
    [currentRow, keys, dispatch, numberOfLetters]
  );

  const addNewKeyWithEvent = useCallback(
    (e: WindowEventMap["keydown"]) => {
      const key = e.key.toLowerCase();
      if (isFinished || currentRow === MAX_ROW_NUMBER || e.altKey || e.ctrlKey || e.metaKey) return;
      if (key === "backspace") return dispatch(setBackspace(true));
      if (key === "enter") return dispatch(setEnter(true));
      if ((key && key.length !== 1) || !key.match(/[a-z]|ñ/gi) || keys[currentRow].length === numberOfLetters) return;
      dispatch(setCurrentKeys({ [currentRow]: [...keys[currentRow], key] }));
    },
    [currentRow, isFinished, keys, dispatch, numberOfLetters]
  );

  return {
    deleteLastLetter,
    passToNextRow,
    addNewKey,
    addNewKeyWithEvent,
    activeModal,
  };
}

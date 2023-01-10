import { existsWord } from "utils/data";
import { useCallback } from "react";
import { setModal } from "store/appSlice";
import { setBackspace, setCurrentKeys as setKeys, setCurrentRow, setEnter } from "store/boardSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export function useGame() {
  const dispatch = useAppDispatch();

  const { isFinished, backspace, enter, currentRow, keys, words } = useAppSelector(
    ({ board: { backspace, currentRow, keys, enter }, game: { gameIs, words } }) => {
      return { backspace, currentRow, keys, enter, isFinished: gameIs !== "playing", words };
    }
  );

  const activeModal = useCallback(
    (content: string, time = 400) => {
      dispatch(setModal({ content, isOpen: true }));
      setTimeout(() => dispatch(setModal({ isOpen: false })), time);
    },
    [dispatch]
  );

  const deleteLastLetter = useCallback(() => {
    if (currentRow !== 6 && keys[currentRow].length) dispatch(setKeys({ [currentRow]: keys[currentRow].slice(0, -1) }));
    if (backspace) dispatch(setBackspace(false));
  }, [backspace, currentRow, keys, dispatch]);

  const passToNextRow = useCallback(() => {
    if (enter) dispatch(setEnter(false));
    if (currentRow === 6) return;
    if (keys[currentRow].length < 5) return activeModal("Too short");
    const exists = existsWord(keys[currentRow].join(""), words);
    if (!exists) return activeModal("Word not found");
    dispatch(setCurrentRow((currentRow + 1) as keyof typeof keys));
  }, [enter, currentRow, keys, dispatch, activeModal, words]);

  const addNewKey = useCallback(
    (key: string) => {
      if (currentRow !== 6 && keys[currentRow].length !== 5)
        dispatch(setKeys({ [currentRow]: [...keys[currentRow], key] }));
    },
    [currentRow, keys, dispatch]
  );

  const addNewKeyWithEvent = useCallback(
    (e: WindowEventMap["keydown"]) => {
      const key = e.key.toLowerCase();
      if (isFinished || currentRow === 6 || e.altKey || e.ctrlKey || e.metaKey) return;
      if (key === "backspace") return dispatch(setBackspace(true));
      if (key === "enter") return dispatch(setEnter(true));
      if (key.length !== 1 || !key.match(/[a-z]|ñ/gi) || keys[currentRow].length === 5) return;
      dispatch(setKeys({ [currentRow]: [...keys[currentRow], key] }));
    },
    [currentRow, isFinished, keys, dispatch]
  );

  return {
    deleteLastLetter,
    passToNextRow,
    addNewKey,
    addNewKeyWithEvent,
    activeModal,
  };
}

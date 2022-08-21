import { existsWord } from "data";
import { useCallback } from "react";
import { setModal } from "store/appSlice";
import { setBackspace, setCurrentKeys as setKeys, setCurrentRow, setEnter } from "store/boardSlice";
import { setWord } from "store/gameSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export function useGame() {
  const dispatch = useAppDispatch();

  const { isFinished, backspace, enter, currentRow, keys } = useAppSelector(
    ({ board: { backspace, currentRow, keys, enter }, game: { gameIs } }) => {
      return { backspace, currentRow, keys, enter, isFinished: gameIs !== "playing" };
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
    const exists = existsWord(keys[currentRow].join(""));
    if (!exists) return activeModal("Word not found");
    dispatch(setCurrentRow((currentRow + 1) as keyof typeof keys));
  }, [enter, currentRow, keys, dispatch, activeModal]);

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

  const setWordToGuess = useCallback((word: string) => dispatch(setWord(word)), [dispatch]);

  const animateKey = useCallback(
    ({ element, className, time }: { element: HTMLDivElement; className: string; time: number }) => {
      element.classList.add(className);
      element.setAttribute("data-animation", "flip-in");
      setTimeout(() => element.setAttribute("data-animation", "flip-out"), time / 2);
    },
    []
  );

  const resetGame = useCallback(() => {
    const remover = (key: Element) => {
      key.setAttribute("data-animation", "none");
      key.classList.remove("letter-correct", "letter-elsewhere", "letter-absent", "selected");
    };
    const keys = document.querySelectorAll(".Game-keyboard-button");
    const letters = document.querySelectorAll(".Row-letter");
    keys.forEach(remover);
    letters.forEach(remover);
  }, []);

  return {
    deleteLastLetter,
    passToNextRow,
    addNewKey,
    addNewKeyWithEvent,
    setWordToGuess,
    animateKey,
    resetGame,
    activeModal,
  };
}

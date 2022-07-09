import { existsWord } from "api/api";
import { useCallback } from "react";
import { setModalContent, setShowModal } from "store/appSlice";
import {
  selectBackspace,
  selectCurrentKeys,
  selectCurrentRow,
  selectEnter,
  setBackspace,
  setCurrentKeys as setKeys,
  setCurrentRow,
  setEnter,
  setRows,
} from "store/boardSlice";
import { selectIsFinished, setWord } from "store/gameSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export function useGame(a: boolean = false) {
  const dispatch = useAppDispatch();
  const isFinished = useAppSelector(selectIsFinished);
  const backspace = useAppSelector(selectBackspace);
  const enter = useAppSelector(selectEnter);
  const currentRow = useAppSelector(selectCurrentRow);
  const keys = useAppSelector(selectCurrentKeys);

  const activeModal = useCallback(
    (content: string, showButton = false, timeout = true) => {
      dispatch(setModalContent({ content, showButton }));
      dispatch(setShowModal(true));
      timeout &&
        setTimeout(() => {
          dispatch(setShowModal(false));
          dispatch(setModalContent(null));
        }, 400);
    },
    [dispatch]
  );

  const deleteLastLetter = useCallback(() => {
    if (currentRow !== 6 && keys[currentRow].length) {
      dispatch(setKeys({ [currentRow]: keys[currentRow].slice(0, -1) }));
    }
    if (backspace) dispatch(setBackspace(false));
  }, [backspace, currentRow, keys, dispatch]);

  const passToNextRow = useCallback(async () => {
    if (currentRow !== 6 && keys[currentRow].length >= 5) {
      const { exists } = await existsWord(keys[currentRow].join(""));
      if (exists) {
        dispatch(setCurrentRow((currentRow + 1) as keyof typeof keys));
        dispatch(setRows({ [currentRow]: true }));
      } else console.log("Does not exist");
    } else activeModal("Una palabra demasiado corta");
    if (enter) dispatch(setEnter(false));
  }, [enter, currentRow, keys, dispatch, activeModal]);

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
      if (isFinished || currentRow === 6 || e.altKey || e.ctrlKey || e.metaKey) return;
      if (key === "backspace") return dispatch(setBackspace(true));
      if (key === "enter") return dispatch(setEnter(true));
      if (key.length !== 1 || !key.match(/[a-z]|ñ/gi) || keys[currentRow].length === 5) return;
      dispatch(setKeys({ [currentRow]: [...keys[currentRow], key] }));
    },
    [currentRow, isFinished, keys, dispatch]
  );

  const setWordToGuess = useCallback(
    (word: string) => {
      dispatch(setWord(word));
    },
    [dispatch]
  );

  const animateKey = useCallback(
    ({ element, className, time }: { element: HTMLDivElement; className: string; time: number }) => {
      element.classList.add(className);
      element.setAttribute("data-animation", "flip-in");
      setTimeout(() => element.setAttribute("data-animation", "flip-out"), time / 2);
    },
    []
  );

  const resetKeys = useCallback(() => {
    const keys = document.querySelectorAll(".Game-keyboard-button");
    keys.forEach((key) => {
      key.setAttribute("data-animation", "none");
      key.classList.remove("letter-correct", "letter-elsewhere", "letter-absent");
    });
  }, []);

  return {
    deleteLastLetter,
    passToNextRow,
    addNewKey,
    addNewKeyWithEvent,
    setWordToGuess,
    animateKey,
    resetKeys,
    activeModal,
  };
}

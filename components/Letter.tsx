import { checkWord } from "utils/data";
import { useEffect, useMemo, useRef } from "react";
import { setGameIs } from "store/gameSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { animateKey } from "utils/animate-key";

export interface LetterRowProps extends React.HTMLProps<HTMLDivElement> {
  rowId: number;
  keys: string[];
}

export function LetterRow({ rowId, keys, className = "", ...props }: LetterRowProps) {
  const dispatch = useAppDispatch();
  const { word, currentRow } = useAppSelector(({ game: { word }, board: { currentRow } }) => ({ word, currentRow }));
  const shouldCheck = rowId === currentRow - 1;

  const firstLetter = useRef<HTMLDivElement>(null);
  const secondLetter = useRef<HTMLDivElement>(null);
  const thirdLetter = useRef<HTMLDivElement>(null);
  const fourthLetter = useRef<HTMLDivElement>(null);
  const fifthLetter = useRef<HTMLDivElement>(null);

  const letters = useMemo(() => {
    return [firstLetter, secondLetter, thirdLetter, fourthLetter, fifthLetter];
  }, [firstLetter, secondLetter, thirdLetter, fourthLetter, fifthLetter]);

  useEffect(() => {
    letters.forEach((letter, i) => {
      const el = letter.current;
      if (!el) return;
      const key = keys[i];
      el.classList[key ? "add" : "remove"]("selected");
      el.setAttribute("data-animation", key ? "pop" : "none");
    });
  }, [letters, keys]);

  useEffect(() => {
    if (!shouldCheck) return;
    const check = checkWord(word, keys.join(""));
    if (!check.exists) return;
    const didPlayerWin = check.keys.every((k) => k.class === "letter-correct");
    const time = 300;
    letters.forEach((letter, i) => {
      const element = letter.current;
      if (!element) return;
      setTimeout(() => animateKey({ element, className: check.keys[i].class, time }), time * i);
    });
    setTimeout(() => {
      check.keys.forEach((item) => {
        const keyboardRow = document.querySelector(`.Game-keyboard-button[data-key="${item.key.toLowerCase()}"]`);
        if (!keyboardRow) return;
        if (keyboardRow.classList.contains("letter-correct")) return;
        if (keyboardRow.classList.contains(item.class)) return;
        animateKey({ element: keyboardRow, className: item.class, time });
      });
      if (didPlayerWin) dispatch(setGameIs("won"));
      else if (rowId === 5) dispatch(setGameIs("lost"));
    }, time * letters.length + 1);
  }, [letters, shouldCheck, keys, word, dispatch, rowId]);

  return (
    <div className={`Row ${className}`} {...props}>
      {[...Array(5)].map((_, i) => (
        <div key={i} ref={letters[i]} className="Row-letter" data-animation="none">
          {keys[i] ?? ""}
        </div>
      ))}
    </div>
  );
}

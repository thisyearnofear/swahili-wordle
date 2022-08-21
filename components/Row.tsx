import { checkWord } from "data";
import { useGame } from "hooks/use-game";
import { useEffect, useMemo, useRef } from "react";
import { setGameIs } from "store/gameSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export interface GameRowProps extends React.HTMLProps<HTMLDivElement> {
  rowId: number;
  keys: string[];
}

export default function GameRow({ rowId, keys, className = "", ...props }: GameRowProps) {
  const dispatch = useAppDispatch();
  const { animateKey } = useGame();
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
      const keyboardKeys = document.querySelectorAll<HTMLDivElement>(".Game-keyboard-button");
      keyboardKeys.forEach((key) => {
        const ketAttr = check.keys.findIndex((k) => k.key.toLowerCase() === key.textContent?.toLowerCase());
        if (ketAttr === -1) return;
        const k = check.keys.splice(ketAttr, 1)[0];
        if (key.classList.contains("letter-correct")) return;
        if (key.classList.contains(k.class)) return;
        animateKey({ element: key, className: k.class, time });
      });
      if (didPlayerWin) dispatch(setGameIs("won"));
      else if (rowId === 5) dispatch(setGameIs("lost"));
    }, time * letters.length + 1);
  }, [letters, shouldCheck, keys, word, animateKey, dispatch, rowId]);

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

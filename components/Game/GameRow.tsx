import { checkWord } from "data";
import { useGame } from "hooks/useGame";
import { useEffect, useRef } from "react";
import { setDidPlayerWin, setFinished } from "store/gameSlice";
import { useAppDispatch } from "store/hooks";

export interface GameRowProps {
  rowId: number;
  keys: string[];
  wordToGuess: string;
  shouldCheck: boolean;
}

export default function GameRow({
  rowId,
  keys,
  className = "",
  shouldCheck,
  wordToGuess,
  ...props
}: GameRowProps & React.HTMLProps<HTMLDivElement>) {
  const dispatch = useAppDispatch();
  const { animateKey } = useGame();

  const rowLetter1 = useRef<HTMLDivElement>(null);
  const rowLetter2 = useRef<HTMLDivElement>(null);
  const rowLetter3 = useRef<HTMLDivElement>(null);
  const rowLetter4 = useRef<HTMLDivElement>(null);
  const rowLetter5 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = [rowLetter1, rowLetter2, rowLetter3, rowLetter4, rowLetter5];
    letters.forEach((letter, i) => {
      const el = letter.current;
      if (!el) return;
      if (keys[i]) {
        el.classList.add("selected");
        el.setAttribute("data-animation", "pop");
      } else {
        el.classList.remove("selected");
        el.setAttribute("data-animation", "none");
      }
    });
  }, [keys]);

  useEffect(() => {
    (async () => {
      if (!shouldCheck) return;
      const letters = [rowLetter1, rowLetter2, rowLetter3, rowLetter4, rowLetter5];
      const check = await checkWord(wordToGuess, keys.join(""));
      if (!check.exists) return;
      if (check.keys.every((k) => k.class === "letter-correct")) {
        dispatch(setFinished(true));
        dispatch(setDidPlayerWin(true));
      }
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
      }, time * letters.length + 1);
    })();
  }, [shouldCheck, keys, wordToGuess, animateKey, dispatch]);

  return (
    <div className={`Row ${className}`} {...props}>
      <div ref={rowLetter1} className="Row-letter" data-animation="none">
        {keys[0] ?? ""}
      </div>
      <div ref={rowLetter2} className="Row-letter" data-animation="none">
        {keys[1] ?? ""}
      </div>
      <div ref={rowLetter3} className="Row-letter" data-animation="none">
        {keys[2] ?? ""}
      </div>
      <div ref={rowLetter4} className="Row-letter" data-animation="none">
        {keys[3] ?? ""}
      </div>
      <div ref={rowLetter5} className="Row-letter" data-animation="none">
        {keys[4] ?? ""}
      </div>
    </div>
  );
}

import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { decodeWord } from "utils/data";
import { resetGame } from "utils/reset-game";
import { restartBoard } from "store/boardSlice";
import { restartGame } from "store/gameSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export function GameState() {
  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { gameIs, word } = useAppSelector((state) => ({ gameIs: state.game.gameIs, word: state.game.word }));

  const wordToGuess = decodeWord(word);

  return (
    <div ref={modalRef} className={`modal_finish${gameIs !== "playing" ? " active" : ""}`}>
      <div className={`top${gameIs !== "playing" ? ` ${gameIs}` : ""}`}>
        You {gameIs}!{gameIs === "won" && " 🏆"}
      </div>
      <div className="data">
        <div className="cont">
          <div className="desc">The answer was:</div>
          <div className="word">
            <span>{gameIs !== "playing" && wordToGuess}</span>
          </div>
          {gameIs !== "playing" && (
            <a
              className="definition"
              target="_blank"
              rel="noreferrer"
              href={`https://wordlegame.org/dictionary?q=${wordToGuess}+definition`}
            >
              What does this word mean?
            </a>
          )}
          <div className="restart_btn">
            <button
              type="button"
              onClick={() => {
                dispatch(restartGame());
                dispatch(restartBoard());
                resetGame();
                modalRef.current?.classList?.remove("active");
              }}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="close"
        onClick={() => {
          if (!modalRef.current) return;
          modalRef.current.classList.remove("active");
        }}
      >
        <XMarkIcon />
      </button>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { keyboard } from "utils/keyboard";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useWindowEvent } from "hooks/use-window-event";
import { useGame } from "hooks/use-game";
import LetterRow from "components/Letter";
import KeyboardRow from "components/Key";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { decodeWord } from "utils/data";
import { restartBoard } from "store/boardSlice";
import { restartGame } from "store/gameSlice";
import { resetGame } from "utils/reset-game";

const Game = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { deleteLastLetter, passToNextRow, addNewKeyWithEvent, activeModal } = useGame();

  const { backspace, enter, keys, gameIs, modal, word } = useAppSelector(
    ({ app: { modal }, board: { backspace, enter, keys }, game: { gameIs, word } }) => {
      return { backspace, enter, keys, gameIs, modal, word };
    }
  );

  const wordToGuess = decodeWord(word);

  useEffect(() => {
    if (backspace) deleteLastLetter();
  }, [backspace, deleteLastLetter]);

  useEffect(() => {
    if (enter) passToNextRow();
  }, [enter, passToNextRow]);

  useWindowEvent("keydown", addNewKeyWithEvent);

  useEffect(() => activeModal("Guess the first word!", 1500), [activeModal]);

  return (
    <div className="Game">
      <div className="Game-Rows">
        {[...Array(6)].map((_, i) => {
          const key = i as keyof typeof keys;
          return <LetterRow rowId={i} keys={keys[key]} key={i} />;
        })}
      </div>
      {gameIs !== "playing" && (
        <div className="message">
          <b>You {gameIs}!</b>
        </div>
      )}
      <div className="Game-keyboard">
        {keyboard.map((keys, i) => (
          <KeyboardRow key={i} keys={keys} />
        ))}
      </div>
      {modal.isOpen && gameIs === "playing" && (
        <div className="alert" style={{ display: "block" }}>
          {modal.content}
        </div>
      )}
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
    </div>
  );
};

export default Game;

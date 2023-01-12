import { decodeWord } from "utils/data";
import { resetGame } from "utils/reset-game";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { restartGame, stateSelector } from "store/appSlice";
import { Modal } from "./Modal";

export function GameState() {
  const dispatch = useAppDispatch();
  const { gameIs, word } = useAppSelector(stateSelector);
  const wordToGuess = decodeWord(word);

  return (
    <Modal active={gameIs !== "playing"} title={`You ${gameIs}!${gameIs === "won" ? " 🏆" : ""}`} titleClass={gameIs}>
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
              resetGame();
            }}
          >
            Restart
          </button>
        </div>
      </div>
    </Modal>
  );
}

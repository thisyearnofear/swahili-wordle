import { decodeWord } from "utils/check-word";
import { resetGame } from "utils/reset-game";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { restartGame, stateSelector } from "store/appSlice";
import { Modal } from "./Modal";
import { getCookie } from "cookies-next";
import { getNumberOfLetters, NUMBER_OF_LETTERS_KEY } from "utils/numbers-of-letters";
import { useRouter } from "next/router";

export function GameState() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { gameIs, word, isChallengeMode } = useAppSelector(stateSelector);
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
              if (isChallengeMode) void router.push("/");

              const numberOfLettersCookie = getCookie(NUMBER_OF_LETTERS_KEY);
              const numberOfLetters = getNumberOfLetters(numberOfLettersCookie);

              dispatch(restartGame(numberOfLetters));
              resetGame();
            }}
          >
            {isChallengeMode ? "New Game" : "Restart"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

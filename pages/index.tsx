import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useWindowEvent } from "hooks/use-window-event";
import { useGame } from "hooks/use-game";
import { GamePanel } from "components/Game/Panel";
import { GameState } from "components/Game/State";
import { Header } from "components/Header";
import { getWords } from "utils/get-words";
import { getRandomWord } from "utils/data";
import { setWord, setWords } from "store/gameSlice";

export default function Game({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const dispatch = useAppDispatch();

  const { deleteLastLetter, passToNextRow, addNewKeyWithEvent, activeModal } = useGame();

  const { backspace, enter } = useAppSelector(({ board: { backspace, enter }, game: { gameIs } }) => {
    return { backspace, enter, gameIs };
  });

  useEffect(() => {
    if (backspace) deleteLastLetter();
  }, [backspace, deleteLastLetter]);

  useEffect(() => {
    if (enter) passToNextRow();
  }, [enter, passToNextRow]);

  useWindowEvent("keydown", addNewKeyWithEvent);

  useEffect(() => {
    const startGame = async () => {
      const words = await getWords();
      const randomWord = getRandomWord(words);
      dispatch(setWords(words));
      dispatch(setWord(randomWord));
      activeModal("Guess the first word!", 1500);
    };
    startGame().catch(() => {
      activeModal("Something went wrong, reload the page and try again", 10000);
    });
  }, [activeModal, dispatch]);

  return (
    <div className="App-container">
      <div className="Game">
        <Header colorScheme={colorScheme} />
        <div className="Game">
          <GamePanel />
          <GameState />
        </div>
      </div>
    </div>
  );
}

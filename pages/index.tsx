import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useWindowEvent } from "hooks/use-window-event";
import { useGame } from "hooks/use-game";
import { GamePanel } from "components/Game/Panel";
import { GameState } from "components/Game/State";
import { Header } from "components/Header";
import { getWords } from "utils/get-words";
import { gameSelector, startGame } from "store/appSlice";
import { resetGame } from "utils/reset-game";
import { Settings } from "components/Settings";
import { Challenge } from "components/Challenge";

export default function Game({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const dispatch = useAppDispatch();

  const { deleteLastLetter, passToNextRow, addNewKeyWithEvent, activeModal } = useGame();

  const { backspace, enter } = useAppSelector(gameSelector);

  useEffect(() => {
    if (backspace) deleteLastLetter();
  }, [backspace, deleteLastLetter]);

  useEffect(() => {
    if (enter) passToNextRow();
  }, [enter, passToNextRow]);

  useEffect(() => {
    const start = async () => {
      const words = await getWords();
      dispatch(startGame(words));
      resetGame();
      activeModal("Guess the first word!", 1500);
    };
    start().catch(() => {
      activeModal("Something went wrong, reload the page and try again", 10000);
    });
  }, [activeModal, dispatch]);

  useWindowEvent("keydown", addNewKeyWithEvent);

  return (
    <>
      <div className="App-container">
        <div className="Game">
          <Header colorScheme={colorScheme} />
          <div className="Game">
            <GamePanel />
            <GameState />
          </div>
        </div>
      </div>
      <Settings />
      <Challenge />
    </>
  );
}

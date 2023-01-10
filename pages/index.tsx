import { useEffect } from "react";
import { useAppSelector } from "store/hooks";
import { useWindowEvent } from "hooks/use-window-event";
import { useGame } from "hooks/use-game";
import { GamePanel } from "components/Game/Panel";
import { GameState } from "components/Game/State";
import { Header } from "components/Header";

export default function Game({ colorScheme }: { colorScheme: "light" | "dark" }) {
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

  useEffect(() => activeModal("Guess the first word!", 1500), [activeModal]);

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

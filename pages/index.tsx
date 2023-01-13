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
import { useRouter } from "next/router";

export default function Game({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const router = useRouter();
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
      const challenge = router.query.challenge;
      const encodedChallengeModeWord = typeof challenge === "string" ? challenge : undefined;

      dispatch(startGame({ words, encodedChallengeModeWord }));
      resetGame();
      activeModal("Guess the first word!", 1500);
    };
    start().catch(() => {
      activeModal("Something went wrong, reload the page and try again", 10000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

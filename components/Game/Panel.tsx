import { keyboard } from "utils/keyboard";
import { KeyboardRow } from "components/Key";
import { LetterRow } from "components/Letter";
import { useAppSelector } from "store/hooks";
import { panelSelector } from "store/appSlice";
import { MAX_ROW_NUMBER } from "hooks/use-game";

export function GamePanel() {
  const { gameIs, keys, modal } = useAppSelector(panelSelector);

  return (
    <div>
      <div className="Game-Rows">
        {[...Array(MAX_ROW_NUMBER)].map((_, i) => {
          const key = i;
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
    </div>
  );
}

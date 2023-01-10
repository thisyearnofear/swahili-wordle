import { keyboard } from "utils/keyboard";
import { KeyboardRow } from "components/Key";
import { LetterRow } from "components/Letter";
import { useAppSelector } from "store/hooks";

export function GamePanel() {
  const { keys, gameIs, modal } = useAppSelector(({ app: { modal }, board: { keys }, game: { gameIs } }) => {
    return { keys, gameIs, modal };
  });

  return (
    <>
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
    </>
  );
}

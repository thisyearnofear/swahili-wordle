import { useGame } from "hooks/use-game";

export interface Key {
  key: string;
  className: string;
  label: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface KeyRowProps extends React.HTMLProps<HTMLDivElement> {
  keys: Array<string | Key>;
}

export function KeyboardRow({ keys }: KeyRowProps) {
  const { addNewKey, deleteLastLetter, passToNextRow } = useGame();

  return (
    <div className="Game-keyboard-row">
      {keys.map((item) => {
        const isString = typeof item === "string";

        return (
          <div
            key={isString ? item : item.key}
            tabIndex={-1}
            className={`Game-keyboard-button ${isString ? "" : item.className}`}
            onClick={() => {
              const key = (isString ? item : item.key).toLowerCase();
              if (key === "enter") return passToNextRow();
              if (key === "backspace") return deleteLastLetter();
              addNewKey(key);
            }}
            data-key={isString ? item : item.key}
          >
            {isString ? item : item.icon ? <item.icon width="22" height="22" /> : item.label}
          </div>
        );
      })}
    </div>
  );
}

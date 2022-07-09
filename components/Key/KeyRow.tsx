import { useGame } from "hooks/useGame";

export type Key = {
  key: string;
  className: string;
  label: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export interface KeyRowProps {
  keys: (string | Key)[];
}

export default function KeyRow({ keys, className = "", ...props }: KeyRowProps & React.HTMLProps<HTMLDivElement>) {
  const { addNewKey, deleteLastLetter, passToNextRow } = useGame();

  return (
    <div className={`Game-keyboard-row ${className}`} {...props}>
      {keys.map((key) => {
        const isString = typeof key === "string";

        return (
          <div
            key={isString ? key : key.key}
            tabIndex={-1}
            className={`Game-keyboard-button ${isString ? "" : key.className}`}
            onClick={() => {
              const k = (isString ? key : key.key).toLowerCase();
              if (k === "enter") return passToNextRow();
              if (k === "backspace") return deleteLastLetter();
              addNewKey(k);
            }}
          >
            {isString ? key : key.icon ? <key.icon width="22" height="22" /> : key.label}
          </div>
        );
      })}
    </div>
  );
}

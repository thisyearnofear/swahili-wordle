import { BackspaceIcon } from "@heroicons/react/solid";
import { Key } from "components/Key/KeyRow";

const keysRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keysRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keysRow3: (string | Key)[] = [
  { className: "Game-keyboard-button-wide", key: "backspace", label: "Backspace", icon: BackspaceIcon },
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  { className: "Game-keyboard-button-wide", key: "enter", label: "Enter" },
];

export const keyboard = [keysRow1, keysRow2, keysRow3];

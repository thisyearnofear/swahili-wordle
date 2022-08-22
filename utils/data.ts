import words from "./words.json";
import { encode, decode } from "js-base64";

export type Class = "letter-correct" | "letter-elsewhere" | "letter-absent";

export interface Word {
  key: string;
  class: Class;
}

export type Letters = Record<string, number>;

function getLetters(letters: string[]): Letters {
  const ltrs: Letters = {};
  letters.forEach((ltr) => (ltrs[ltr] = (ltrs[ltr] || 0) + 1));
  return ltrs;
}

export function getRandomWord() {
  return encode(words[Math.floor(Math.random() * words.length)]);
}

export function existsWord(word: string) {
  return words.includes(word.toLowerCase());
}

export function getKeys(word: string, letters: string[]): Word[] {
  const _word = word.toUpperCase();
  const _letters = letters.map((str) => str.toUpperCase());

  if (_word === _letters.join("")) return _letters.map((letter) => ({ key: letter, class: "letter-correct" }));

  const lettersCounter = getLetters(_word.split(""));
  const result: Word[] = [];

  _letters.forEach((letter, i) => {
    if (letter === _word[i]) {
      result[i] = { key: letter, class: "letter-correct" };
      lettersCounter[letter]--;
    }
  });

  _letters.forEach((letter, i) => {
    if (letter === _word[i]) return;

    if (!lettersCounter[letter]) return (result[i] = { key: letter, class: "letter-absent" });

    if (lettersCounter[letter] > 0) {
      result[i] = { key: letter, class: "letter-elsewhere" };
      lettersCounter[letter]--;
    }
  });

  return result;
}

export const checkWord = (word: string, check: string): { exists: false } | { exists: true; keys: Word[] } => {
  const _word = decode(word);
  const isValidQueryWord = existsWord(_word.toLowerCase());
  const isValidQueryCheck = existsWord(check.toLowerCase());
  if (!isValidQueryCheck || !isValidQueryWord) return { exists: false };

  const keys = getKeys(_word.toLowerCase(), check.toLowerCase().split(""));
  return { exists: true, keys };
};

export const decodeWord = (word: string) => {
  return decode(word);
};

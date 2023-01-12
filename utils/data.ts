import { encode, decode } from "js-base64";

type Class = "letter-correct" | "letter-elsewhere" | "letter-absent";

interface Word {
  key: string;
  class: Class;
}

type Letters = Record<string, number>;

function getLetters(letters: string[]): Letters {
  const ltrs: Letters = {};
  letters.forEach((ltr) => (ltrs[ltr] = (ltrs[ltr] || 0) + 1));
  return ltrs;
}

export function getRandomWord(words: string[]) {
  return encode(words[Math.floor(Math.random() * words.length)]);
}

export function existsWord(word: string, words: string[]) {
  return words.includes(word.toLowerCase());
}

function getKeys(word: string, check: string): Word[] {
  const letters = check.toUpperCase().split("");

  if (word === check) return letters.map((letter) => ({ key: letter, class: "letter-correct" }));

  const lettersCounter = getLetters(word.split(""));
  const result: Word[] = [];

  letters.forEach((letter, i) => {
    if (letter === word[i]) {
      result[i] = { key: letter, class: "letter-correct" };
      lettersCounter[letter]--;
    }
  });

  letters.forEach((letter, i) => {
    if (letter === word[i]) return;
    if (!lettersCounter[letter]) return (result[i] = { key: letter, class: "letter-absent" });
    if (lettersCounter[letter] > 0) {
      result[i] = { key: letter, class: "letter-elsewhere" };
      lettersCounter[letter]--;
    }
  });

  return result;
}

export const checkWord = (
  word: string,
  check: string,
  words: string[]
): { exists: false } | { exists: true; keys: Word[] } => {
  const _word = decode(word);
  const isValidQueryWord = existsWord(_word.toLowerCase(), words);
  const isValidQueryCheck = existsWord(check.toLowerCase(), words);
  if (!isValidQueryCheck || !isValidQueryWord) return { exists: false };

  const keys = getKeys(_word.toUpperCase(), check.toUpperCase());
  return { exists: true, keys };
};

export const decodeWord = (word: string) => {
  return decode(word);
};

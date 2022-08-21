import { encode, decode } from "js-base64";
import { getRandomWord as randomWord, checkWord as getKeys, existsWord, Word } from "./words";

export const getRandomWord = () => encode(randomWord());

export const checkWord = (word: string, check: string): { exists: false } | { exists: true; keys: Word[] } => {
  const w = decode(word);
  const isValidQueryWord = existsWord(w.toLowerCase());
  const isValidQueryCheck = existsWord(check.toLowerCase());
  if (!isValidQueryCheck || !isValidQueryWord) return { exists: false };
  const keys = getKeys(w.toLowerCase(), check.toLowerCase().split(""));
  return { exists: true, keys };
};

export const decodeWord = (word: string) => {
  const w = decode(word);
  if (!existsWord(w.toLowerCase())) return { exists: false, word: "" };
  return { exists: true, word: w };
};

export { existsWord };

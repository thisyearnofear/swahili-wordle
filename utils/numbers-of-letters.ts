export const NUMBER_OF_LETTERS_KEY = "number-of-letters";

export const NUMBERS_OF_LETTERS = [4, 5, 6, 7, 8, 9, 10, 11];

export const DEFAULT_NUMBER_OF_LETTERS = 5;

export function isValidNumberOfLetter(n: number) {
  return !isNaN(n) && n > (NUMBERS_OF_LETTERS.at(0) as number) && n < (NUMBERS_OF_LETTERS.at(-1) as number);
}

export function getNumberOfLetters(numberOfLetters: any): number {
  return +(numberOfLetters ?? 0) || DEFAULT_NUMBER_OF_LETTERS;
}

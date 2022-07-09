import type { NextApiRequest, NextApiResponse } from "next";
import { checkLength } from "utils/check-length";
import { checkWord, existsWord, Word } from "utils/words";
import { decode } from "js-base64";

export type Data = {
  exists: boolean;
  keys: Word[];
};

export type Error = {
  error: string;
  exists?: boolean;
  message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const { word: w, check } = req.query;
  if (!w) return res.status(400).json({ error: "Missing query parameter: word" });
  if (!check) return res.status(400).json({ error: "Missing query parameter: check" });
  const word = decode(w as string);
  const invalidWordLength = checkLength(word, "length");
  const invalidCheckLength = checkLength(check, "length");
  if (invalidWordLength) return res.status(invalidWordLength.status).json({ error: invalidWordLength.error });
  if (invalidCheckLength) return res.status(invalidCheckLength.status).json({ error: invalidCheckLength.error });
  if (word.length !== check.length) return res.status(400).json({ error: "Word and check must be the same length" });
  const isValidQueryWord = existsWord(word.toLowerCase());
  const isValidQueryCheck = existsWord((check as string).toLowerCase());
  if (!isValidQueryCheck || !isValidQueryWord)
    return res.status(400).json({ exists: false, error: "Word does not exist" });
  const keys = checkWord(word.toLowerCase(), (check as string).toLowerCase().split(""));
  return res.status(200).json({ exists: true, keys });
}

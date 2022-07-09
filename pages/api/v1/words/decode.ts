import type { NextApiRequest, NextApiResponse } from "next";
import { checkLength } from "utils/check-length";
import { existsWord } from "utils/words";
import { decode } from "js-base64";

export type Data = {
  word: string;
};

export type Error = {
  error: string;
  message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const { word: w } = req.query;
  if (!w) return res.status(400).json({ error: "Missing query parameter: word" });
  const word = decode(w as string);
  const invalidLength = checkLength(word, "length");
  if (invalidLength) return res.status(invalidLength.status).json({ error: invalidLength.error });
  const exists = existsWord(word);
  if (!exists) return res.status(400).json({ error: "Word does not exist" });
  return res.status(200).json({ word });
}

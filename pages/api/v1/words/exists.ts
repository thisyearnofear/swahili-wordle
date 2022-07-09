import type { NextApiRequest, NextApiResponse } from "next";
import { checkLength } from "utils/check-length";
import { existsWord } from "utils/words";

export type Data = {
  exists: boolean;
};

export type Error = {
  error: string;
  message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const { word } = req.query;
  if (!word) return res.status(400).json({ error: "Missing query parameter: word" });
  const invalidLength = checkLength(word, "length");
  if (invalidLength) return res.status(invalidLength.status).json({ error: invalidLength.error });
  const exists = existsWord(word as string);
  return res.status(200).json({ exists });
}

import type { NextApiRequest, NextApiResponse } from "next";
import { checkLength } from "utils/check-length";
import { randomWord } from "utils/words";
import { encodeURL as encode } from "js-base64";

type Data = {
	word: string;
};

type Error = {
	error: string;
	message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
	const { length } = req.query;
	if (!length) return res.status(400).json({ error: "Missing query parameter: length" });
	const invalidLength = checkLength(length);
	if (invalidLength) return res.status(invalidLength.status).json({ error: invalidLength.error });
	const word = randomWord(+length);
	if (!word) return res.status(500).json({ error: "Could not generate a random word" });
	return res.status(200).json({ word: encode(word) });
}

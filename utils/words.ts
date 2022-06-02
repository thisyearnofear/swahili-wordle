import words from "data";

export type Letters = { [key: string]: number };

export type Word = {
	key: string;
	class: Class;
};

export type Class = "letter-correct" | "letter-elsewhere" | "letter-absent";

function getWords(word: number): string[] {
	return words[word as keyof typeof words];
}

function getLetters(letters: string[]): Letters {
	const l: Letters = {};
	return letters.forEach((lt) => (l[lt] = (l[lt] || 0) + 1)), l;
}

export function randomWord(length: number): string {
	const words = getWords(length);
	return words[Math.floor(Math.random() * words.length)];
}

export function existsWord(word: string): boolean {
	const words = getWords(word.length);
	return words.includes(word.toLowerCase());
}

export function checkWord(word: string, letters: string[]): Word[] {
	const w = word.toUpperCase();
	const l = letters.join("").toUpperCase().split("");
	if (w === l.join("")) return l.map((lt) => ({ key: lt, class: "letter-correct" }));
	const lts = getLetters(w.split(""));
	const result: Word[] = [];
	l.forEach((letter, i) => {
		if (letter === w[i]) {
			result[i] = { key: letter, class: "letter-correct" };
			lts[letter]--;
		}
	});
	l.forEach((letter, i) => {
		if (letter === w[i]) return;
		if (lts[letter] && lts[letter] > 0) {
			result[i] = { key: letter, class: "letter-elsewhere" };
			lts[letter]--;
		} else if (!lts[letter]) {
			result[i] = { key: letter, class: "letter-absent" };
		}
	});
	return result;
}

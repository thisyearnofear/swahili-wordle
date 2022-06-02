export type LengthError = {
	status: number;
	message?: string;
	error: string;
};

export function checkLength(word: any, property?: string): LengthError | null {
	const length = property ? word[property] : word;
	const res: LengthError = { status: 400, error: "" };
	if (Number.isNaN(Number(length))) res.error = "Length must be a number";
	else if (length?.match?.(/[^0-9]/)) res.error = "Invalid length";
	else if (Number(length) > 10) res.error = "Length must be less than or equal to 10";
	else if (Number(length) < 5) res.error = "Length must be greater than or equal to 5";
	return res.error ? res : null;
}

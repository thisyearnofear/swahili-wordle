interface Options {
  length?: number;
  filter?: boolean;
}

export async function getWords(options: Options = {}): Promise<string[]> {
  const { filter = true, length = 5 } = options;

  const wordsJson = await fetch("/words.json").then((res) => (res.ok ? res.json() : Promise.reject(res)));

  if (!Array.isArray(wordsJson)) throw Error("Invalid data");

  if (!filter) return wordsJson;

  const words = wordsJson.filter((word): word is string => typeof word === "string" && word.length === length);

  return words;
}

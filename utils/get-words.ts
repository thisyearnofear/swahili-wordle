export async function getWords(locale: string): Promise<string[]> {
  const wordsJson = await fetch(`/words_${locale}.json`).then((res) => (res.ok ? res.json() : Promise.reject(res)));

  if (!Array.isArray(wordsJson)) throw Error("Invalid data");

  return wordsJson;
}

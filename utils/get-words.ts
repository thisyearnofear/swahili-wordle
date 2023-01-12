export async function getWords(): Promise<string[]> {
  const wordsJson = await fetch("/words.json").then((res) => (res.ok ? res.json() : Promise.reject(res)));

  if (!Array.isArray(wordsJson)) throw Error("Invalid data");

  return wordsJson;
}

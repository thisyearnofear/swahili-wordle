import axios, { Response } from "redaxios";
import type { Data as CheckData } from "pages/api/v1/words/check";
import type { Data as DecodeData } from "pages/api/v1/words/decode";
import type { Data as ExistsData } from "pages/api/v1/words/exists";
import type { Data as RandomData } from "pages/api/v1/words/random";

class Api {
	private api;
	constructor(url?: string) {
		this.api = axios.create({ baseURL: url });
	}
	private async apiCall<T>(request: () => Promise<Response<T>>): Promise<T> {
		try {
			return (await request()).data;
		} catch (e: any) {
			return e.data;
		}
	}
	getRandomWord(length = 5) {
		return this.apiCall<RandomData>(() => this.api.get(`/random?length=${length}`));
	}
	existsWord(word: string) {
		return this.apiCall<ExistsData>(() => this.api.get(`/exists?word=${word}`));
	}
	checkWord(word: string, check: string) {
		return this.apiCall<CheckData>(() => this.api.get(`/check?word=${word}&check=${check}`));
	}
	decodeWord(word: string) {
		return this.apiCall<DecodeData>(() => this.api.get(`/decode?word=${word}`));
	}
}

const api = new Api(process.env.NEXT_PUBLIC_API_URL);

export const getRandomWord = api.getRandomWord.bind(api);

export const checkWord = api.checkWord(word, check).bind(api);

export const existsWord = api.existsWord(word).bind(api);

export const decodeWord = api.decodeWord(word).bind(api);

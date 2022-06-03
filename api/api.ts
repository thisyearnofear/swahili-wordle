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
	async getRandomWord(length = 5) {
		return await this.apiCall<RandomData>(() => this.api.get(`/random?length=${length}`));
	}
	async existsWord(word: string) {
		return await this.apiCall<ExistsData>(() => this.api.get(`/exists?word=${word}`));
	}
	async checkWord(word: string, check: string) {
		return await this.apiCall<CheckData>(() => this.api.get(`/check?word=${word}&check=${check}`));
	}
	async decodeWord(word: string) {
		return await this.apiCall<DecodeData>(() => this.api.get(`/decode?word=${word}`));
	}
}

const api = new Api(process.env.NEXT_PUBLIC_API_URL);

export const getRandomWord = async (length: number = 5) => await api.getRandomWord(length);

export const checkWord = async (word: string, check: string) => await api.checkWord(word, check);

export const existsWord = (word: string) => api.existsWord(word);

export const decodeWord = (word: string) => api.decodeWord(word);

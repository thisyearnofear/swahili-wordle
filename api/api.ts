import axios, { Response } from "redaxios";

class Api {
	private api;
	constructor(url?: string) {
		this.api = axios.create({ baseURL: url });
	}
	private async apiCall(request: () => Promise<Response<any>>) {
		try {
			return (await request()).data;
		} catch (e: any) {
			return e.data;
		}
	}
	async getRandomWord(length = 5) {
		return await this.apiCall(() => this.api.get(`/random?length=${length}`));
	}
	async existsWord(word: string) {
		return await this.apiCall(() => this.api.get(`/exists?word=${word}`));
	}
	async checkWord(word: string, check: string) {
		return await this.apiCall(() => this.api.get(`/check?word=${word}&check=${check}`));
	}
	async decodeWord(word: string) {
		return await this.apiCall(() => this.api.get(`/decode?word=${word}`));
	}
}

const api = new Api(process.env.NEXT_PUBLIC_API_URL);

export const getRandomWord = async (length: number = 5) => await api.getRandomWord(length);

export const checkWord = async (word: string, check: string) => await api.checkWord(word, check);

export const existsWord = (word: string) => api.existsWord(word);

export const decodeWord = (word: string) => api.decodeWord(word);

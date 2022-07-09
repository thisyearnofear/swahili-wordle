import axios, { Response } from "redaxios";
import type { Data as CheckData } from "pages/api/v1/words/check";
import type { Data as DecodeData } from "pages/api/v1/words/decode";
import type { Data as ExistsData } from "pages/api/v1/words/exists";
import type { Data as RandomData } from "pages/api/v1/words/random";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

const apiCall = async <T>(request: () => Promise<Response<T>>): Promise<T> => {
  try {
    return (await request()).data;
  } catch (e: any) {
    return e.data || {};
  }
};

export const getRandomWord = (length = 5) => {
  return apiCall<RandomData>(() => api.get(`/random?length=${length}`));
};
export const existsWord = (word: string) => {
  return apiCall<ExistsData>(() => api.get(`/exists?word=${word}`));
};
export const checkWord = (word: string, check: string) => {
  return apiCall<CheckData>(() => api.get(`/check?word=${word}&check=${check}`));
};
export const decodeWord = (word: string) => {
  return apiCall<DecodeData>(() => api.get(`/decode?word=${word}`));
};

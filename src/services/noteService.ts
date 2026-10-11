import axios, { type AxiosResponse } from "axios";
import type { NewNote, Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteHubClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { page, perPage, search } = params;

  const requestParams: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search && search.trim() !== "") {
    requestParams.search = search.trim();
  }

  const response: AxiosResponse<FetchNotesResponse> = await noteHubClient.get(
    "/notes",
    { params: requestParams },
  );

  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubClient.post(
    "/notes",
    note,
  );

  return response.data;
};

export const deleteNote = async (id: string | number): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubClient.delete(
    `/notes/${id}`,
  );

  return response.data;
};

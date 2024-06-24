import BaseApi from './baseApi';
import {
  Film,
  FilmCreate,
  FilmUpdate,
  ApiRespMulti,
  ApiRespSingle,
  FilmExtended,
  Role,
  FilmVoters,
} from './types';

const FILMS_PREFIX = '/films';

const getAllFilms = async (): Promise<ApiRespMulti<FilmVoters>> => {
  return await BaseApi.getAll<FilmVoters>(`${FILMS_PREFIX}`);
};

const getFilmById = async (
  id: number
): Promise<ApiRespSingle<FilmExtended>> => {
  return await BaseApi.getSingle<FilmExtended>(`${FILMS_PREFIX}/${id}`);
};

const createFilm = async (film: FilmCreate): Promise<ApiRespSingle<Film>> => {
  return await BaseApi.postSingle<Film>(`${FILMS_PREFIX}`, film);
};

const updateFilm = async (
  id: number,
  film: FilmUpdate
): Promise<ApiRespSingle<Film>> => {
  return await BaseApi.putSingle<Film>(`${FILMS_PREFIX}/${id}`, film);
};

const deleteFilm = async (id: number): Promise<ApiRespSingle<Film>> => {
  return await BaseApi.deleteSingle<Film>(`${FILMS_PREFIX}/${id}`);
};

const upvote = async (filmId: number, userId: string) => {
  return await BaseApi.postSingle<Film>(`${FILMS_PREFIX}/vote`, {
    filmId: filmId,
    userId: userId,
  });
};

const downvote = async (filmId: number, userId: string) => {
  return await BaseApi.postSingle<Film>(`${FILMS_PREFIX}/downvote`, {
    filmId: filmId,
    userId: userId,
  });
};

const addParticipants = async (
  filmId: number,
  participantIds: number[],
  role: Role
) => {
  return await BaseApi.postSingle(`${FILMS_PREFIX}/participants`, {
    id: filmId,
    role: role,
    participants: participantIds,
  });
};

const FilmApi = {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
  upvote,
  downvote,
  addParticipants,
};

export default FilmApi;

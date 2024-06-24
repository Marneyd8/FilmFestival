import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import {
  addFilmParticipantRequestSchema,
  createFilmRequestSchema,
  deleteFilmRequestSchema,
  getFilmRequestSchema,
  removeFilmParticipantRequestSchema,
  updateFilmRequestSchema,
  voteFilmSchema,
} from './film_schemas';
import filmRepository from './film_repository';

const getSingleFilm = async (req: Request, res: Response) => {
  const request = await parseRequest(getFilmRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const film = await filmRepository.readOne(id);
  if (film.isErr) {
    handleRepositoryErrors(film.error, res);
    return;
  }
  if (film.isOk) res.status(200).send({ item: film.value, message: 'OK' });
};

const getAllFilms = async (_req: Request, res: Response) => {
  const films = await filmRepository.readAll();
  if (films.isErr) {
    handleRepositoryErrors(films.error, res);
    return;
  }
  if (films.isOk) res.status(200).send({ items: films.value, message: 'OK' });
};

const createSingleFilm = async (req: Request, res: Response) => {
  const request = await parseRequest(createFilmRequestSchema, req, res);
  if (request === null) return;

  const film = {
    name: request.body.name,
    originalName: request.body.originalName,
    intro: request.body.intro,
    publishedAt: request.body.publishedAt,
    runTimeMinutes: request.body.runTimeMinutes,
    categoryID: request.body.categoryID,
  };

  const newFilm = await filmRepository.create(film);
  if (newFilm.isErr) {
    handleRepositoryErrors(newFilm.error, res);
    return;
  }
  if (newFilm.isOk)
    res.status(201).send({ item: newFilm.value, message: 'OK' });
};

const updateSingleFilm = async (req: Request, res: Response) => {
  const request = await parseRequest(updateFilmRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;
  const film = { ...request.body };

  const updated = await filmRepository.update(film, id);
  if (updated.isErr) {
    handleRepositoryErrors(updated.error, res);
    return;
  }
  if (updated.isOk)
    res.status(200).send({ item: updated.value, message: 'OK' });
};

const deleteSingleFilm = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteFilmRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const confirmation = await filmRepository.remove(id);
  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

const addFilmParticipant = async (req: Request, res: Response) => {
  const request = await parseRequest(addFilmParticipantRequestSchema, req, res);
  if (request === null) return;

  const confirmation = await filmRepository.addParticipants(
    request.body.id,
    request.body.participants,
    request.body.role
  );
  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

const removeFilmParticipant = async (req: Request, res: Response) => {
  const request = await parseRequest(
    removeFilmParticipantRequestSchema,
    req,
    res
  );
  if (request === null) return;

  const confirmation = await filmRepository.removeParticipants(
    request.body.id,
    request.body.participants
  );
  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

const upvote = async (req: Request, res: Response) => {
  const request = await parseRequest(voteFilmSchema, req, res);

  if (request === null) return;

  const confirmation = await filmRepository.upvote(
    request.body.filmId,
    request.body.userId
  );

  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

const downvote = async (req: Request, res: Response) => {
  const request = await parseRequest(voteFilmSchema, req, res);

  if (request === null) return;

  const confirmation = await filmRepository.downvote(
    request.body.filmId,
    request.body.userId
  );

  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

export const filmsController = {
  getAllFilms,
  getSingleFilm,
  updateSingleFilm,
  deleteSingleFilm,
  createSingleFilm,
  addFilmParticipant,
  removeFilmParticipant,
  upvote,
  downvote,
};

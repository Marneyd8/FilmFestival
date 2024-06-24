import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import {
  createReviewRequestSchema,
  deleteReviewRequestSchema,
  getReviewFromFilmRequestSchema,
  getReviewRequestSchema,
  updateReviewRequestSchema,
} from './review_schemas';
import reviewRepository from './review_repository';

const getSingleReview = async (req: Request, res: Response) => {
  const request = await parseRequest(getReviewRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const review = await reviewRepository.read_one(id);
  if (review.isErr) {
    handleRepositoryErrors(review.error, res);
    return;
  }
  if (review.isOk) res.status(200).send({ item: review.value, message: 'OK' });
};

const getAllReviews = async (_req: Request, res: Response) => {
  const participants = await reviewRepository.read_all();
  if (participants.isErr) {
    handleRepositoryErrors(participants.error, res);
    return;
  }
  if (participants.isOk)
    res.status(200).send({ items: participants.value, message: 'OK' });
};

const getAllReviewsFromFilm = async (req: Request, res: Response) => {
  const request = await parseRequest(getReviewFromFilmRequestSchema, req, res);
  if (request === null) return;

  const reviews = await reviewRepository.readAllFromFilm(request.params.id);
  if (reviews.isErr) {
    handleRepositoryErrors(reviews.error, res);
    return;
  }
  if (reviews.isOk)
    res.status(200).send({ items: reviews.value, message: 'OK' });
};

const createSingleReview = async (req: Request, res: Response) => {
  const request = await parseRequest(createReviewRequestSchema, req, res);
  if (request === null) return;

  const review = {
    userId: request.body.userId,
    movieId: request.body.movieId,
    stars: request.body.stars,
    description: request.body.description,
    isSpoiler: request.body.isSpoiler,
  };

  const participant = await reviewRepository.create(review);
  if (participant.isErr) {
    handleRepositoryErrors(participant.error, res);
    return;
  }
  if (participant.isOk)
    res.status(201).send({ item: participant.value, message: 'OK' });
};

const updateSingleReview = async (req: Request, res: Response) => {
  const request = await parseRequest(updateReviewRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;
  const review = request.body;

  const updated = await reviewRepository.update(review, id);
  if (updated.isErr) {
    handleRepositoryErrors(updated.error, res);
    return;
  }
  if (updated.isOk)
    res.status(200).send({ item: updated.value, message: 'OK' });
};

const deleteSingleReview = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteReviewRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const confirmation = await reviewRepository.remove(id);
  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

export const reviewController = {
  getAllReviews,
  getSingleReview,
  updateSingleReview,
  deleteSingleReview,
  createSingleReview,
  getAllReviewsFromFilm,
};

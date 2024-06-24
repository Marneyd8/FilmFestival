import { Review } from '@prisma/client';
import BaseApi from './baseApi';
import { ApiRespMulti, ApiRespSingle, ReviewBase } from './types';

const REVIEWS_PREFIX = '/reviews';

async function createReview(
  payload: ReviewBase
): Promise<ApiRespSingle<Review>> {
  return BaseApi.postSingle<Review>(REVIEWS_PREFIX, payload);
}

async function deleteReview(id: number): Promise<ApiRespSingle<Review>> {
  return BaseApi.deleteSingle<Review>(`${REVIEWS_PREFIX}/${id}`);
}

async function getFilmReviews(filmId: number): Promise<ApiRespMulti<Review>> {
  return (await BaseApi.get(`${REVIEWS_PREFIX}/film/${filmId}`)).data;
}

const ReviewApi = {
  createReview,
  deleteReview,
  getFilmReviews,
};

export default ReviewApi;

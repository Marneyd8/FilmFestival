import { Result } from '@badrap/result';
import client from '../prisma_client';
import { DbResult } from '../types';
import { DBError, NotFoundError } from '../errors';
import { Review } from '@prisma/client';
import { ReviewCreate, ReviewUpdate } from './review_types';

async function create(review: ReviewCreate): DbResult<Review> {
  try {
    const res = await client.review.create({
      data: review,
    });
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

async function readOne(id: number): DbResult<Review> {
  try {
    const res = await client.review.findUnique({
      where: { id },
    });
    if (res) return Result.ok(res);
    return Result.err(new NotFoundError());
  } catch {
    return Result.err(new DBError());
  }
}

async function readAll(): DbResult<Review[]> {
  try {
    const res = await client.review.findMany({});
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

async function readAllFromFilm(filmId: number): DbResult<Review[]> {
  try {
    const res = await client.review.findMany({
      where: { movieId: filmId },
    });
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

async function update(review: ReviewUpdate, id: number): DbResult<Review> {
  try {
    const res = await client.review.update({
      where: {
        id,
      },
      data: review,
    });
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

async function remove(id: number): DbResult<Review> {
  try {
    const res = await client.review.delete({
      where: { id },
    });
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

const reviewRepository = {
  create,
  read_one: readOne,
  read_all: readAll,
  update,
  remove,
  readAllFromFilm,
};
export default reviewRepository;

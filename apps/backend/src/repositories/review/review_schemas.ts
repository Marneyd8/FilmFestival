import { z } from 'zod';

export const createReviewRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
    movieId: z.coerce.number(),
    stars: z.coerce.number(),
    description: z.string().min(1),
    isSpoiler: z.coerce.boolean(),
  }),
});

export const updateReviewRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    userId: z.string().optional(),
    movieId: z.coerce.number().optional(),
    stars: z.coerce.number().optional(),
    description: z.string().min(1).optional(),
    isSpoiler: z.coerce.boolean().optional(),
  }),
});

export const getReviewRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const deleteReviewRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const getReviewFromFilmRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

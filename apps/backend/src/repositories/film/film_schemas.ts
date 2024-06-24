import { z } from 'zod';

export const createFilmRequestSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    originalName: z.string().min(1).max(255),
    intro: z.string().min(1),
    publishedAt: z.coerce.number(),
    runTimeMinutes: z.coerce.number(),
    categoryID: z.coerce.number(),
  }),
});

export const updateFilmRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    originalName: z.string().min(1).max(255).optional(),
    intro: z.string().min(1).optional(),
    publishedAt: z.coerce.number().optional(),
    runTimeMinutes: z.coerce.number().optional(),
    categoryID: z.coerce.number().optional(),
  }),
});

export const getFilmRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const deleteFilmRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const addFilmParticipantRequestSchema = z.object({
  body: z.object({
    id: z.coerce.number(),
    role: z.enum(['DIRECTOR', 'SCREENWRITER', 'ACTOR']),
    participants: z.array(z.coerce.number()),
  }),
});

export const removeFilmParticipantRequestSchema = z.object({
  body: z.object({
    id: z.coerce.number(),
    participants: z.array(z.coerce.number()),
  }),
});

export const voteFilmSchema = z.object({
  body: z.object({
    filmId: z.coerce.number(),
    userId: z.string(),
  }),
});

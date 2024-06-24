import { z } from 'zod';

export const createParticipantRequestSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
  }),
});

export const updateParticipantRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
  }),
});

export const getParticipantRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const deleteParticipantRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

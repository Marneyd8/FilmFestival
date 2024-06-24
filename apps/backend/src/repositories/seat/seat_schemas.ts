import { z } from 'zod';

export const bookSeatRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
    seatsId: z.array(z.coerce.number()),
  }),
});

export const unbookSeatRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const getUserSeatsSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

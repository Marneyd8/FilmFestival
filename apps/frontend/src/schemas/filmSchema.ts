import { z } from 'zod';

export const createFilmSchema = z.object({
  name: z.string().min(1).max(255),
  originalName: z.string().min(1).max(255),
  intro: z.string().min(1),
  publishedAt: z.coerce.number(),
  runTimeMinutes: z.coerce.number(),
  categoryID: z.coerce.number().refine((val) => val !== 0, {
    message: 'Select category!',
  }),
});

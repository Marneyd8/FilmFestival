import { z } from 'zod';

export const createCategoryRequestSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
  }),
});

export const updateCategoryRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    name: z.string().min(1).max(255),
  }),
});

export const getCategoryRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const deleteCategoryRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

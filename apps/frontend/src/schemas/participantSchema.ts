import { z } from 'zod';

export const createParticipantRequestSchema = z.object({
  name: z.string().min(1).max(255),
});

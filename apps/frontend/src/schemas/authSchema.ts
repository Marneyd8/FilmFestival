import { z } from 'zod';

export const registrationSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm Password must be at least 6 characters long',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // path of error
  });

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

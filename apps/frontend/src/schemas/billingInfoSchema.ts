import { z } from 'zod';

export const billingInfoSchema = z.object({
  name: z.string(),
  address: z.string().min(1, 'Address is empty!'),
  city: z.string().min(1, 'City is empty!'),
  country: z.string().min(1, 'State/Province is empty!'),
  zip: z
    .string()
    .regex(/^\d{3}\s\d{2}$/, 'Zip code format is: XXX XX where X is a digit'),
  cardNumber: z
    .string()
    .regex(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      'Valid card number format is: XXXX XXXX XXXX XXXX where X is a digit'
    ),
  cardExpirationMonth: z.coerce
    .number()
    .min(1, 'Not a valid month!')
    .max(12, 'Not a valid month!'),
  cardExpirationYear: z.coerce
    .number()
    .min(24, 'Your card is expired!')
    .max(99, 'Not a valid year!'),
  cvv: z.coerce
    .number()
    .min(1, 'Not a valid CVV!')
    .max(999, 'Not a valid CVV!'),
});

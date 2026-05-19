import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Te rugăm să introduci o adresă de email validă.' }),
    password: z
      .string()
      .min(8, { message: 'Parola trebuie să aibă cel puțin 8 caractere.' })
      .regex(/[A-Z]/, { message: 'Parola trebuie să conțină cel puțin o literă mare.' })
      .regex(/[a-z]/, { message: 'Parola trebuie să conțină cel puțin o literă mică.' })
      .regex(/[0-9]/, { message: 'Parola trebuie să conțină cel puțin un număr.' })
      .regex(/[@$!%*#?&]/, { message: 'Parola trebuie să conțină cel puțin un caracter special.' }),
    confirmPassword: z.string(),
    role: z.enum(['student', 'profesor']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Parolele introduse nu coincid.',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

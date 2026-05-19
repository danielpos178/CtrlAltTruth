import { z } from 'zod';

export const fallacySchema = z.object({
  name: z.string().min(2, 'Numele este prea scurt (minim 2 caractere)'),
  definition: z.string().min(5, 'Definiția trebuie să explice clar eroarea'),
  example: z.string().min(5, 'Oferă un exemplu elocvent'),
});

export const fallacyChallengeSchema = z.object({
  text_content: z.string().min(10, 'Textul este prea scurt (minim 10 caractere)'),
  correct_fallacy_id: z.coerce.number().min(1, 'Selectează o eroare logică'),
  explanation: z.string().min(10, 'Explicația trebuie să fie clară'),
  hint: z.string().min(5, 'Indiciul trebuie să aibă minim 5 caractere'),
});

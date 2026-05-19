import { z } from 'zod';

export const verificationScenarioSchema = z.object({
  title: z.string().min(5, 'Titlul articolului fals trebuie să aibă minim 5 caractere'),
  author_name: z.string().min(3, 'Numele autorului este prea scurt'),
  author_metadata: z.string().refine((val) => {
    try { JSON.parse(val); return true; } catch { return false; }
  }, { message: 'Metadata autorului trebuie să fie un JSON valid' }),
  publish_date: z.string().min(3, 'Data publicării este obligatorie'),
  date_metadata: z.string().refine((val) => {
    try { JSON.parse(val); return true; } catch { return false; }
  }, { message: 'Metadata datei trebuie să fie un JSON valid' }),
  image_url: z.string().url('Introdu un URL valid pentru imagine (ex: avatar sau cover)'),
  cross_check_metadata: z.string().refine((val) => {
    try { JSON.parse(val); return true; } catch { return false; }
  }, { message: 'Metadata sursei trebuie să fie un JSON valid' }),
  domain_name: z.string().optional(),
  domain_metadata: z.string().refine((val) => {
    if (!val) return true;
    try { JSON.parse(val); return true; } catch { return false; }
  }, { message: 'Metadata domeniu trebuie să fie un JSON valid' }).optional(),
  content_excerpt: z.string().optional(),
  content_metadata: z.string().refine((val) => {
    if (!val) return true;
    try { JSON.parse(val); return true; } catch { return false; }
  }, { message: 'Metadata conținut trebuie să fie un JSON valid' }).optional(),
  is_published: z.boolean().default(true),
});

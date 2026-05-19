'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { verificationScenarioSchema } from './schemas';

async function getAuthClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, { ...options, sameSite: 'none', secure: true }));
          } catch {}
        },
      },
    }
  );
}

export async function createScenario(data: z.infer<typeof verificationScenarioSchema>) {
  const supabase = await getAuthClient();
  const parsed = verificationScenarioSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  // Parse JSON payloads before sending
  const payload = {
    ...parsed.data,
    author_metadata: typeof parsed.data.author_metadata === 'string' ? JSON.parse(parsed.data.author_metadata) : parsed.data.author_metadata,
    date_metadata: typeof parsed.data.date_metadata === 'string' ? JSON.parse(parsed.data.date_metadata) : parsed.data.date_metadata,
    cross_check_metadata: typeof parsed.data.cross_check_metadata === 'string' ? JSON.parse(parsed.data.cross_check_metadata) : parsed.data.cross_check_metadata,
    domain_metadata: typeof parsed.data.domain_metadata === 'string' ? JSON.parse(parsed.data.domain_metadata || '{}') : (parsed.data.domain_metadata || {}),
    content_metadata: typeof parsed.data.content_metadata === 'string' ? JSON.parse(parsed.data.content_metadata || '{}') : (parsed.data.content_metadata || {})
  };

  const { error } = await supabase.from('verification_scenarios').insert([payload]);
  if (error) return { error: 'Eroare la adăugarea scenariului: ' + error.message };

  revalidatePath('/admin/reflex');
  revalidatePath('/navigator-reflex');
  return { success: true };
}

export async function updateScenario(id: number, data: z.infer<typeof verificationScenarioSchema>) {
  const supabase = await getAuthClient();
  const parsed = verificationScenarioSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  // Parse JSON payloads before sending
  const payload = {
    ...parsed.data,
    author_metadata: typeof parsed.data.author_metadata === 'string' ? JSON.parse(parsed.data.author_metadata) : parsed.data.author_metadata,
    date_metadata: typeof parsed.data.date_metadata === 'string' ? JSON.parse(parsed.data.date_metadata) : parsed.data.date_metadata,
    cross_check_metadata: typeof parsed.data.cross_check_metadata === 'string' ? JSON.parse(parsed.data.cross_check_metadata) : parsed.data.cross_check_metadata,
    domain_metadata: typeof parsed.data.domain_metadata === 'string' ? JSON.parse(parsed.data.domain_metadata || '{}') : (parsed.data.domain_metadata || {}),
    content_metadata: typeof parsed.data.content_metadata === 'string' ? JSON.parse(parsed.data.content_metadata || '{}') : (parsed.data.content_metadata || {})
  };

  const { error } = await supabase.from('verification_scenarios').update(payload).eq('id', id);
  if (error) return { error: 'Eroare la actualizarea scenariului: ' + error.message };

  revalidatePath('/admin/reflex');
  revalidatePath('/navigator-reflex');
  return { success: true };
}

export async function deleteScenario(id: number) {
  const supabase = await getAuthClient();
  const { error } = await supabase.from('verification_scenarios').delete().eq('id', id);
  if (error) return { error: 'Eroare la ștergerea scenariului: ' + error.message };
  
  revalidatePath('/admin/reflex');
  revalidatePath('/navigator-reflex');
  return { success: true };
}

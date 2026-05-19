'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { fallacySchema, fallacyChallengeSchema } from './schemas';

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

export async function createFallacy(data: z.infer<typeof fallacySchema>) {
  const supabase = await getAuthClient();
  const parsed = fallacySchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('fallacies_registry').insert([parsed.data]);
  if (error) return { error: 'Eroare la adăugarea erorii logice: ' + error.message };

  revalidatePath('/admin/sandbox');
  revalidatePath('/sandbox-erori');
  return { success: true };
}

export async function updateFallacy(id: number, data: z.infer<typeof fallacySchema>) {
  const supabase = await getAuthClient();
  const parsed = fallacySchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('fallacies_registry').update(parsed.data).eq('id', id);
  if (error) return { error: 'Eroare la actualizarea erorii logice: ' + error.message };

  revalidatePath('/admin/sandbox');
  revalidatePath('/sandbox-erori');
  return { success: true };
}

export async function deleteFallacy(id: number) {
  const supabase = await getAuthClient();
  const { error } = await supabase.from('fallacies_registry').delete().eq('id', id);
  if (error) return { error: 'Eroare la ștergerea erorii logice: ' + error.message };
  
  revalidatePath('/admin/sandbox');
  revalidatePath('/sandbox-erori');
  return { success: true };
}

export async function createFallacyChallenge(data: z.infer<typeof fallacyChallengeSchema>) {
  const supabase = await getAuthClient();
  const parsed = fallacyChallengeSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('fallacy_challenges').insert([parsed.data]);
  if (error) return { error: 'Eroare la adăugarea provocării: ' + error.message };

  revalidatePath('/admin/sandbox');
  revalidatePath('/sandbox-erori');
  return { success: true };
}

export async function updateFallacyChallenge(id: number, data: z.infer<typeof fallacyChallengeSchema>) {
  const supabase = await getAuthClient();
  const parsed = fallacyChallengeSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('fallacy_challenges').update(parsed.data).eq('id', id);
  if (error) return { error: 'Eroare la actualizarea provocării: ' + error.message };

  revalidatePath('/admin/sandbox');
  revalidatePath('/sandbox-erori');
  return { success: true };
}

export async function deleteFallacyChallenge(id: number) {
  const supabase = await getAuthClient();
  const { error } = await supabase.from('fallacy_challenges').delete().eq('id', id);
  if (error) return { error: 'Eroare la ștergerea provocării: ' + error.message };
  
  revalidatePath('/admin/sandbox');
  revalidatePath('/sandbox-erori');
  return { success: true };
}

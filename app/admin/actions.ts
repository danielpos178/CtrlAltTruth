'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const badgeSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă minim 2 caractere'),
  description: z.string().min(5, 'Descrierea trebuie să aibă minim 5 caractere'),
  icon_name: z.string().min(1, 'Selectează o iconiță'),
  criteria: z.string().min(2, 'Criteriul este obligatoriu'),
});

const lessonSchema = z.object({
  title: z.string().min(3, 'Titlul este prea scurt'),
  content: z.string().min(10, 'Conținutul este prea scurt'),
  icon_name: z.string().min(1, 'Selectează o iconiță'),
  slug: z.string().min(2, 'Slug-ul este obligatoriu'),
  level: z.string().min(2, 'Nivelul este obligatoriu (ex: Începător)'),
});

// Since standard user isn't allowed to insert, we must use the service role OR if RLS allows admin users we can use normal client.
// Wait! Our RLS explicitly checks:
// EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
// So we can use the regular authenticated client!
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

export async function createLesson(data: z.infer<typeof lessonSchema>) {
  const supabase = await getAuthClient();
  const parsed = lessonSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('lessons').insert([parsed.data]);
  if (error) {
    if (error.code === '23505') return { error: 'Slug-ul trebuie să fie unic.' };
    return { error: 'Eroare la adăugarea lecției: ' + error.message };
  }

  revalidatePath('/admin/lessons');
  revalidatePath('/lessons');
  return { success: true };
}

export async function updateLesson(id: number, data: z.infer<typeof lessonSchema>) {
  const supabase = await getAuthClient();
  const parsed = lessonSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('lessons').update(parsed.data).eq('id', id);
  if (error) {
    if (error.code === '23505') return { error: 'Slug-ul trebuie să fie unic.' };
    return { error: 'Eroare la actualizarea lecției: ' + error.message };
  }

  revalidatePath('/admin/lessons');
  revalidatePath('/lessons');
  revalidatePath(`/lessons/${parsed.data.slug}`);
  return { success: true };
}

export async function deleteLesson(id: number) {
  const supabase = await getAuthClient();
  const { error } = await supabase.from('lessons').delete().eq('id', id);
  if (error) return { error: 'Eroare la ștergere: ' + error.message };
  
  revalidatePath('/admin/lessons');
  revalidatePath('/lessons');
  return { success: true };
}

export async function createSwipeCard(data: {text: string, is_fake: boolean | string, explanation: string}) {
  const supabase = await getAuthClient();
  const transformed = {
      ...data,
      is_fake: data.is_fake === 'true' || data.is_fake === true
  };
  
  const { error } = await supabase.from('swipe_cards').insert([transformed]);
  if (error) return { error: 'Eroare la adăugarea cardului: ' + error.message };

  revalidatePath('/admin/swipe');
  return { success: true };
}

export async function updateSwipeCard(id: number, data: {text: string, is_fake: boolean | string, explanation: string}) {
  const supabase = await getAuthClient();
  const transformed = {
      ...data,
      is_fake: data.is_fake === 'true' || data.is_fake === true
  };
  
  const { error } = await supabase.from('swipe_cards').update(transformed).eq('id', id);
  if (error) return { error: 'Eroare la actualizarea cardului: ' + error.message };

  revalidatePath('/admin/swipe');
  return { success: true };
}

export async function deleteSwipeCard(id: number) {
  const supabase = await getAuthClient();
  const { error } = await supabase.from('swipe_cards').delete().eq('id', id);
  if (error) return { error: 'Eroare la ștergere: ' + error.message };
  
  revalidatePath('/admin/swipe');
  return { success: true };
}

export async function createBadge(data: z.infer<typeof badgeSchema>) {
  const supabase = await getAuthClient();
  const parsed = badgeSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('badges').insert([parsed.data]);
  if (error) {
    if (error.code === '23505') return { error: 'Criteriul trebuie să fie unic.' };
    return { error: 'Eroare la adăugarea insignei: ' + error.message };
  }

  revalidatePath('/admin/badges');
  revalidatePath('/progress');
  return { success: true };
}

export async function updateBadge(id: string, data: z.infer<typeof badgeSchema>) {
  const supabase = await getAuthClient();
  const parsed = badgeSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from('badges').update(parsed.data).eq('id', id);
  if (error) {
    if (error.code === '23505') return { error: 'Criteriul trebuie să fie unic.' };
    return { error: 'Eroare la actualizarea insignei: ' + error.message };
  }

  revalidatePath('/admin/badges');
  revalidatePath('/progress');
  return { success: true };
}

export async function deleteBadge(id: string) {
  const supabase = await getAuthClient();
  const { error } = await supabase.from('badges').delete().eq('id', id);
  if (error) return { error: 'Eroare la ștergere: ' + error.message };
  
  revalidatePath('/admin/badges');
  revalidatePath('/progress');
  return { success: true };
}

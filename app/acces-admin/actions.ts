'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export async function elevateToAdmin(formData: FormData) {
  const secretKey = formData.get('secretKey') as string;
  const envSecret = process.env.ADMIN_SECRET_PASSWORD;

  if (!envSecret) {
    return { error: 'ADMIN_SECRET_PASSWORD nu este configurat pe server.' };
  }

  if (secretKey !== envSecret) {
    return { error: 'Parola este incorectă.' };
  }

  const accessToken = formData.get('accessToken') as string;
  if (!accessToken) {
    return { error: 'Token de autentificare lipsă. Vă rugăm să vă reautentificați.' };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

  if (authError || !user) {
    return { error: 'Trebuie să fii autentificat pentru a accesa acest rol.' };
  }

  // Use Service Role to bypass RLS and grant admin
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY nu este configurat.' };
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const { error: upsertError } = await supabaseAdmin
    .from('user_roles')
    .upsert({ user_id: user.id, role: 'admin', created_at: new Date().toISOString() });

  if (upsertError) {
    console.error('Error upserting admin role:', upsertError);
    return { error: 'A apărut o eroare la salvarea rolului de admin.' };
  }

  revalidatePath('/');
  revalidatePath('/admin', 'layout');

  return { success: true };
}

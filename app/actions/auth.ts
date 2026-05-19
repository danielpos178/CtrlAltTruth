'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { RegisterFormValues } from '@/lib/schemas/auth';

export async function signUpAction(values: RegisterFormValues & { role: 'student' | 'profesor' }) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
          },
        },
      }
    );

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (authError || !authData.user) {
      let errorMessage = authError?.message || 'Eroare la crearea contului.';
      if (errorMessage.includes('User already registered')) {
        errorMessage = 'Există deja un cont cu acest email.';
      }
      return { success: false, error: errorMessage };
    }

    // Role insertion
    const initialScore = values.role === 'student' ? 30 : 0; // Quick mockup onboarding score
    const { error: roleError } = await supabase.from('user_roles').insert({
      user_id: authData.user.id,
      role: values.role,
      initial_score: initialScore
    });

    // We don't fail auth if role fails, but ideally it shouldn't.
    if (roleError) {
      // In a real app we might revert auth, for now just log it.
      console.error('Failed to set role:', roleError);
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Eroare necunoscută la securizarea conexiunii.' };
  }
}

export async function updateUserRoleAction(role: 'student' | 'profesor') {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Neautorizat' };

    const { error } = await supabase.from('user_roles').update({ role }).eq('user_id', user.id);
    if (error) return { success: false, error: error.message };

    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

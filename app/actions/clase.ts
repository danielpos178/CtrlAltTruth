'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createClassAction(className: string, isPublic: boolean = true) {
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

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).maybeSingle();
    
    if (roleData?.role !== 'profesor' && roleData?.role !== 'admin') {
      return { success: false, error: 'Doar profesorii pot crea clase.' };
    }

    // Generate random 6 character alphanumeric code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const finalName = isPublic ? className : `${className} [PRIVAT]`;

    const { error: insertError } = await supabase.from('classes').insert({
      name: finalName,
      code: code,
      teacher_id: user.id
    });

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    revalidatePath('/clase');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Eroare necunoscută.' };
  }
}

export async function joinClassAction(classCode: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Trebuie să fii autentificat pentru a te înscrie într-o clasă.' };
    }

    const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).maybeSingle();
    if (roleData?.role !== 'student') {
      return { success: false, error: 'Doar elevii se pot înscrie într-o clasă existentă.' };
    }

    // 1. Check if class exists
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('id')
      .eq('code', classCode.toUpperCase())
      .single();

    if (classError || !classData) {
      return { success: false, error: 'Codul clasei este invalid sau clasa nu există.' };
    }

    // 2. Update user_roles table with class_id
    const { error: updateError } = await supabase
      .from('user_roles')
      .update({ class_id: classData.id })
      .eq('user_id', user.id);

    if (updateError) {
      return { success: false, error: 'Eroare la înscrierea în clasă. Te rugăm să încerci din nou.' };
    }

    revalidatePath('/progres');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Eroare necunoscută.' };
  }
}

export async function updateA11yPreferencesAction(prefs: {
  is_senior_mode?: boolean;
  a11y_high_contrast?: boolean;
  a11y_reduce_motion?: boolean;
  a11y_dyslexia_font?: boolean;
  a11y_font_size?: number;
  theme?: string;
}) {
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
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const rpcPayload: Record<string, any> = {};
    if (prefs.is_senior_mode !== undefined) rpcPayload.p_is_senior_mode = prefs.is_senior_mode;
    if (prefs.a11y_high_contrast !== undefined) rpcPayload.p_high_contrast = prefs.a11y_high_contrast;
    if (prefs.a11y_reduce_motion !== undefined) rpcPayload.p_reduce_motion = prefs.a11y_reduce_motion;
    if (prefs.a11y_dyslexia_font !== undefined) rpcPayload.p_dyslexia_font = prefs.a11y_dyslexia_font;
    if (prefs.a11y_font_size !== undefined) rpcPayload.p_font_size = prefs.a11y_font_size;
    if (prefs.theme !== undefined) rpcPayload.p_theme = prefs.theme;

    const { error } = await supabase.rpc('update_user_preferences', rpcPayload);

    if (error) {
      console.error("RPC Error:", error);
      // Fallback if RPC doesn't exist (e.g. migration hasn't run), we'll do a direct update
      const { error: updateError } = await supabase
        .from('user_roles')
        .update(prefs)
        .eq('user_id', user.id);
        
      if (updateError) {
        console.error("Direct Update Error:", updateError);
        return { success: false, error: updateError.message };
      }
    }

    // Set server-side cookies for instant layout hydration without DB hits
    const store = await cookies();
    if (prefs.is_senior_mode !== undefined) {
      store.set('a11y_senior_mode', String(prefs.is_senior_mode), { path: '/' });
    }
    if (prefs.a11y_high_contrast !== undefined) {
      store.set('a11y_high_contrast', String(prefs.a11y_high_contrast), { path: '/' });
    }
    if (prefs.a11y_reduce_motion !== undefined) {
      store.set('a11y_reduce_motion', String(prefs.a11y_reduce_motion), { path: '/' });
    }
    if (prefs.a11y_dyslexia_font !== undefined) {
      store.set('a11y_dyslexia_font', String(prefs.a11y_dyslexia_font), { path: '/' });
    }
    if (prefs.a11y_font_size !== undefined) {
      store.set('a11y_font_size', String(prefs.a11y_font_size), { path: '/' });
    }

    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleSeniorModeAction(isSeniorMode: boolean) {
  return updateA11yPreferencesAction({ is_senior_mode: isSeniorMode });
}

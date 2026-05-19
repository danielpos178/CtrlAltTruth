'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { logDailyActivity } from '@/lib/gamification';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: 'admin' | 'student' | 'profesor' | 'user' | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  isLoading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<'admin' | 'student' | 'profesor' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    try {
      const { data } = await supabase.from('user_roles').select('role').eq('user_id', userId).maybeSingle();
      if (data) {
        setRole(data.role);
      } else {
        setRole('user');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          logDailyActivity(session.user.id).catch(console.error);
          await fetchRole(session.user.id);
        } else {
          setRole(null);
        }
      } catch (error: any) {
        console.error('Error getting session:', error);
        if (error.message?.includes('Refresh Token Not Found') || error.message?.includes('Invalid Refresh Token')) {
          await supabase.auth.signOut();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchRole(session.user.id);
        } else {
          setRole(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, role, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

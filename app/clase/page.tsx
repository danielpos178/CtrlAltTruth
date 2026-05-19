import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GraduationCap, Users } from 'lucide-react';
import { TeacherClassDashboardClient } from '@/components/admin/TeacherClassDashboardClient';
import { CreateClassFormClient } from '@/components/admin/CreateClassFormClient';
import { StudentClassDashboardClient } from '@/components/progres/StudentClassDashboardClient';

export default async function ClasePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: roleRow } = await supabase
    .from('user_roles')
    .select('role, class_id')
    .eq('user_id', user.id)
    .maybeSingle();

  const userRole = roleRow?.role || 'user';

  if (userRole === 'profesor' || userRole === 'admin') {
    // Fetch all classes created by this teacher
    const { data: classesData } = await supabase
      .from('classes')
      .select('*')
      .eq('teacher_id', user.id);

    // Fetch stats for each class
    const teacherClasses = [];
    if (classesData && classesData.length > 0) {
      for (const cls of classesData) {
        // Students in this class
        const { data: studentsData } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('class_id', cls.id);
        
        const students = studentsData || [];
        const userIds = students.map(s => s.user_id);
        
        let classStruggles: { name: string, count: number }[] = [];
        let lessonsProgressStats: { name: string, lessonsCount: number }[] = [];
        let highestSwipeScores: { name: string, score: number }[] = [];

        if (userIds.length > 0) {
          const { data: answersData } = await supabase
            .from('user_answers')
            .select('fallacy_id, is_correct, fallacies_registry(name)')
            .in('user_id', userIds)
            .eq('is_correct', false);

          if (answersData) {
            const counts: Record<string, number> = {};
            answersData.forEach((ans: any) => {
              const name = ans.fallacies_registry?.name || 'Necunoscut';
              counts[name] = (counts[name] || 0) + 1;
            });
            classStruggles = Object.entries(counts)
              .map(([name, count]) => ({ name, count }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 5);
          }

          // Fetch lessons progress
          const { data: lessonsData } = await supabase
            .from('lesson_progress')
            .select('user_id')
            .in('user_id', userIds);

          const lessonCounts: Record<string, number> = {};
          if (lessonsData) {
            lessonsData.forEach(l => {
               lessonCounts[l.user_id] = (lessonCounts[l.user_id] || 0) + 1;
            });
          }

          // We don't have user names in user_roles easily accessible if auth.users is closed.
          // But we can just use "Elev X" or try to fetch user_metadata if possible, but let's stick to generic for privacy or user ID. Let's just group by user.
          // We'll map them as "Elev 1", "Elev 2" to preserve anonymity but still provide metrics.
          const sortedLessons = Object.entries(lessonCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
          lessonsProgressStats = sortedLessons.map((entry, idx) => ({ name: `Elev ${idx + 1}`, lessonsCount: entry[1] }));

          // Fetch highest swipe scores
          const { data: swipeScoresData } = await supabase
            .from('swipe_game_scores')
            .select('user_id, score')
            .in('user_id', userIds);

          const userMaxScores: Record<string, number> = {};
          if (swipeScoresData) {
            swipeScoresData.forEach(s => {
               userMaxScores[s.user_id] = Math.max(userMaxScores[s.user_id] || 0, s.score);
            });
          }

          const sortedScores = Object.entries(userMaxScores).sort((a, b) => b[1] - a[1]).slice(0, 5);
          highestSwipeScores = sortedScores.map((entry, idx) => ({ name: `Elev ${idx + 1}`, score: entry[1] }));
        }
        
        teacherClasses.push({
          classData: cls,
          studentsCount: students.length,
          classStruggles,
          lessonsProgressStats,
          highestSwipeScores
        });
      }
    }

    return (
      <div className="py-12 px-4 max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#7c1f31] dark:text-[#ff4d6d]" />
            Panou de Control Profesor
          </h1>
          <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg mt-2">
            Gestionează-ți clasele și monitorizează evoluția logicii elevilor tăi.
          </p>
        </div>

        <CreateClassFormClient />

        {teacherClasses.length > 0 && (
          <div className="space-y-12">
            <h2 className="text-2xl font-bold border-b border-[#1a1a1a]/10 dark:border-white/10 pb-4">Clasele mele ({teacherClasses.length})</h2>
            {teacherClasses.map((tClass) => (
              <TeacherClassDashboardClient 
                key={tClass.classData.id}
                classData={tClass.classData} 
                studentsCount={tClass.studentsCount} 
                classStruggles={tClass.classStruggles} 
                lessonsProgressStats={tClass.lessonsProgressStats}
                highestSwipeScores={tClass.highestSwipeScores}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    // STUDENT VIEW
    let currentClass = null;
    if (roleRow?.class_id) {
      const { data: clsData } = await supabase
        .from('classes')
        .select('*')
        .eq('id', roleRow.class_id)
        .maybeSingle();
      currentClass = clsData;
    }

    // Get all public classes and compute their student counts via a quick query
    const { data: allPubClasses } = await supabase
      .from('classes')
      .select('id, name, code, created_at')
      .not('name', 'like', '%[PRIVAT]%');

    let enhancedPubClasses: any[] = [];
    if (allPubClasses) {
      // Get counts
      const { data: countsData } = await supabase
        .from('user_roles')
        .select('class_id');
        
      const countsMap = new Map();
      if (countsData) {
        countsData.forEach(r => {
          if (r.class_id) {
             countsMap.set(r.class_id, (countsMap.get(r.class_id) || 0) + 1);
          }
        });
      }

      enhancedPubClasses = allPubClasses.map(c => ({
        ...c,
        student_count: countsMap.get(c.id) || 0
      })).sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return (
      <div className="py-12 px-4 max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a1a1a] dark:text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Clasele Mele
          </h1>
          <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg mt-2">
            Vizualizează, alătură-te și explorează clasele disponibile.
          </p>
        </div>

        <StudentClassDashboardClient 
           currentClass={currentClass} 
           publicClasses={enhancedPubClasses} 
        />
      </div>
    );
  }
}

-- Supabase Schema for Ctrl+Alt+Truth Progress Tracking --
-- Run this in the Supabase SQL Editor --

-- 10. User Streaks
CREATE TABLE IF NOT EXISTS user_streaks (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE
);

ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own streaks" ON user_streaks;
CREATE POLICY "Users can read own streaks" ON user_streaks FOR SELECT USING (auth.uid() = user_id);

-- RPC for updating streak
CREATE OR REPLACE FUNCTION update_user_streak(target_user_id UUID)
RETURNS void AS $$
DECLARE
    today DATE;
    streak_record RECORD;
    new_current_streak INTEGER;
    new_longest_streak INTEGER;
BEGIN
    today := CURRENT_DATE AT TIME ZONE 'UTC';

    -- Check if record exists
    SELECT * INTO streak_record FROM user_streaks WHERE user_id = target_user_id;

    IF NOT FOUND THEN
        -- First activity ever
        INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (target_user_id, 1, 1, today);
    ELSE
        IF streak_record.last_activity_date = today THEN
            -- Already completed an activity today, do nothing
            RETURN;
        ELSIF streak_record.last_activity_date = today - INTEGER '1' THEN
            -- Consecutive day
            new_current_streak := streak_record.current_streak + 1;
            new_longest_streak := GREATEST(streak_record.longest_streak, new_current_streak);
            
            UPDATE user_streaks 
            SET current_streak = new_current_streak,
                longest_streak = new_longest_streak,
                last_activity_date = today
            WHERE user_id = target_user_id;
        ELSE
            -- Streak broken (missed at least one day)
            UPDATE user_streaks 
            SET current_streak = 1,
                last_activity_date = today
            WHERE user_id = target_user_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TABLE IF NOT EXISTS swipe_game_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE swipe_game_scores ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own scores
DROP POLICY IF EXISTS "Users can insert their own scores" ON swipe_game_scores;
CREATE POLICY "Users can insert their own scores" 
ON swipe_game_scores FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own scores
DROP POLICY IF EXISTS "Users can read their own scores" ON swipe_game_scores;
CREATE POLICY "Users can read their own scores" 
ON swipe_game_scores FOR SELECT 
USING (auth.uid() = user_id);


-- 2. Analyzed Topics Table
CREATE TABLE IF NOT EXISTS analyzed_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    topic_id TEXT NOT NULL,
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, topic_id) -- users can analyze a topic multiple times, but let's upsert to track unique topics analyzed
);

-- Turn on Row Level Security
ALTER TABLE analyzed_topics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own analyzed topics" ON analyzed_topics;
CREATE POLICY "Users can insert their own analyzed topics" 
ON analyzed_topics FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own analyzed topics" ON analyzed_topics;
CREATE POLICY "Users can update their own analyzed topics" 
ON analyzed_topics FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read their own analyzed topics" ON analyzed_topics;
CREATE POLICY "Users can read their own analyzed topics" 
ON analyzed_topics FOR SELECT 
USING (auth.uid() = user_id);


-- 3. Lesson Progress Table
CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    lesson_id INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- Turn on Row Level Security
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own lesson progress" ON lesson_progress;
CREATE POLICY "Users can insert their own lesson progress" 
ON lesson_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own lesson progress" ON lesson_progress;
CREATE POLICY "Users can update their own lesson progress" 
ON lesson_progress FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read their own lesson progress" ON lesson_progress;
CREATE POLICY "Users can read their own lesson progress" 
ON lesson_progress FOR SELECT 
USING (auth.uid() = user_id);


-- 4. Content Tables (Lessons, Swipe Cards, Topics)
-- 5. Gamification Tables (Badges & Streak)
CREATE TABLE IF NOT EXISTS badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    criteria TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS user_activity (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    PRIMARY KEY (user_id, date)
);

-- RLS for Badges
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to badges" ON badges;
CREATE POLICY "Allow public read access to badges" ON badges FOR SELECT USING (true);

-- RLS for User Badges
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to read own badges" ON user_badges;
CREATE POLICY "Allow users to read own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users to insert own badges" ON user_badges;
CREATE POLICY "Allow users to insert own badges" ON user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS for User Activity
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to read own activity" ON user_activity;
CREATE POLICY "Allow users to read own activity" ON user_activity FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users to insert own activity" ON user_activity;
CREATE POLICY "Allow users to insert own activity" ON user_activity FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS topics (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read topics" ON topics;
CREATE POLICY "Public can read topics" ON topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert topics" ON topics;
CREATE POLICY "Admins can insert topics" ON topics FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can update topics" ON topics;
CREATE POLICY "Admins can update topics" ON topics FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can delete topics" ON topics;
CREATE POLICY "Admins can delete topics" ON topics FOR DELETE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE TABLE IF NOT EXISTS swipe_cards (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    is_fake BOOLEAN NOT NULL,
    explanation TEXT NOT NULL,
    is_senior_friendly BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE swipe_cards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read swipe cards" ON swipe_cards;
CREATE POLICY "Public can read swipe cards" ON swipe_cards FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    level TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- Stored as markdown or HTML
    icon_name TEXT NOT NULL,
    quiz JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read classes" ON classes;
CREATE POLICY "Public can read classes" ON classes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Teachers can insert/update classes" ON classes;
CREATE POLICY "Teachers can insert/update classes" ON classes FOR ALL USING (
  teacher_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- 6. User Roles Table (Admin RBAC)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'user',
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    is_senior_mode BOOLEAN DEFAULT false,
    a11y_high_contrast BOOLEAN DEFAULT false,
    a11y_reduce_motion BOOLEAN DEFAULT false,
    a11y_dyslexia_font BOOLEAN DEFAULT false,
    a11y_font_size INTEGER DEFAULT 16,
    theme TEXT DEFAULT 'light',
    initial_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Drop previous constraint and re-add in case it uses old enum
ALTER TABLE user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE user_roles ADD CONSTRAINT user_roles_role_check CHECK (role IN ('user', 'admin', 'student', 'profesor'));

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
CREATE POLICY "Users can read own role" ON user_roles FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own role" ON user_roles;
CREATE POLICY "Users can update own role" ON user_roles FOR UPDATE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_user_preferences(
  p_is_senior_mode BOOLEAN DEFAULT NULL,
  p_high_contrast BOOLEAN DEFAULT NULL,
  p_reduce_motion BOOLEAN DEFAULT NULL,
  p_dyslexia_font BOOLEAN DEFAULT NULL,
  p_font_size INTEGER DEFAULT NULL,
  p_theme TEXT DEFAULT NULL
) RETURNS void AS $$
BEGIN
  UPDATE user_roles
  SET 
    is_senior_mode = COALESCE(p_is_senior_mode, is_senior_mode),
    a11y_high_contrast = COALESCE(p_high_contrast, a11y_high_contrast),
    a11y_reduce_motion = COALESCE(p_reduce_motion, a11y_reduce_motion),
    a11y_dyslexia_font = COALESCE(p_dyslexia_font, a11y_dyslexia_font),
    a11y_font_size = COALESCE(p_font_size, a11y_font_size),
    theme = COALESCE(p_theme, theme)
  WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add Admin policies for Content Tables

-- Badges (Admin full access)
DROP POLICY IF EXISTS "Admins can insert badges" ON badges;
CREATE POLICY "Admins can insert badges" ON badges FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can update badges" ON badges;
CREATE POLICY "Admins can update badges" ON badges FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can delete badges" ON badges;
CREATE POLICY "Admins can delete badges" ON badges FOR DELETE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Lessons (Admin full access)
DROP POLICY IF EXISTS "Admins can insert lessons" ON lessons;
CREATE POLICY "Admins can insert lessons" ON lessons FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can update lessons" ON lessons;
CREATE POLICY "Admins can update lessons" ON lessons FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can delete lessons" ON lessons;
CREATE POLICY "Admins can delete lessons" ON lessons FOR DELETE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Swipe Cards (Admin full access)
DROP POLICY IF EXISTS "Admins can insert swipe_cards" ON swipe_cards;
CREATE POLICY "Admins can insert swipe_cards" ON swipe_cards FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can update swipe_cards" ON swipe_cards;
CREATE POLICY "Admins can update swipe_cards" ON swipe_cards FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admins can delete swipe_cards" ON swipe_cards;
CREATE POLICY "Admins can delete swipe_cards" ON swipe_cards FOR DELETE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- 7. Fallacies Sandbox
CREATE TABLE IF NOT EXISTS fallacies_registry (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    definition TEXT NOT NULL,
    example TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE fallacies_registry ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read fallacies_registry" ON fallacies_registry;
CREATE POLICY "Public can read fallacies_registry" ON fallacies_registry FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can modify fallacies_registry" ON fallacies_registry;
CREATE POLICY "Admins can modify fallacies_registry" ON fallacies_registry USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE TABLE IF NOT EXISTS fallacy_challenges (
    id SERIAL PRIMARY KEY,
    text_content TEXT NOT NULL,
    correct_fallacy_id INTEGER REFERENCES fallacies_registry(id) ON DELETE CASCADE,
    explanation TEXT NOT NULL,
    hint TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE fallacy_challenges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read fallacy_challenges" ON fallacy_challenges;
CREATE POLICY "Public can read fallacy_challenges" ON fallacy_challenges FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can modify fallacy_challenges" ON fallacy_challenges;
CREATE POLICY "Admins can modify fallacy_challenges" ON fallacy_challenges USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- 9. User Answers (Sandbox Game Tracking)
CREATE TABLE IF NOT EXISTS user_answers (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    challenge_id INTEGER REFERENCES fallacy_challenges(id) ON DELETE CASCADE NOT NULL,
    fallacy_id INTEGER REFERENCES fallacies_registry(id) ON DELETE CASCADE NOT NULL,
    is_correct BOOLEAN NOT NULL,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_answers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert their own answers" ON user_answers;
CREATE POLICY "Users can insert their own answers" ON user_answers FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can read their own answers" ON user_answers;
CREATE POLICY "Users can read their own answers" ON user_answers FOR SELECT USING (auth.uid() = user_id);

-- RPC for Getting Top Defeated Enemy
CREATE OR REPLACE FUNCTION get_top_defeated_enemy(target_user_id UUID)
RETURNS TABLE (
    fallacy_name TEXT,
    correct_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        fr.name AS fallacy_name,
        COUNT(ua.id) AS correct_count
    FROM 
        user_answers ua
    JOIN 
        fallacies_registry fr ON ua.fallacy_id = fr.id
    WHERE 
        ua.user_id = target_user_id 
        AND ua.is_correct = true
    GROUP BY 
        fr.name
    ORDER BY 
        correct_count DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TABLE IF NOT EXISTS verification_scenarios (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    publish_date TEXT NOT NULL,
    date_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    image_url TEXT NOT NULL,
    cross_check_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    domain_name TEXT DEFAULT 'stirile-adevarului.pseudo',
    domain_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    content_excerpt TEXT DEFAULT '',
    content_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE verification_scenarios ADD COLUMN IF NOT EXISTS domain_name TEXT DEFAULT 'stirile-adevarului.pseudo';
ALTER TABLE verification_scenarios ADD COLUMN IF NOT EXISTS domain_metadata JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE verification_scenarios ADD COLUMN IF NOT EXISTS content_excerpt TEXT DEFAULT '';
ALTER TABLE verification_scenarios ADD COLUMN IF NOT EXISTS content_metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE verification_scenarios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read verification_scenarios" ON verification_scenarios;
CREATE POLICY "Public can read verification_scenarios" ON verification_scenarios FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can modify verification_scenarios" ON verification_scenarios;
CREATE POLICY "Admins can modify verification_scenarios" ON verification_scenarios USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

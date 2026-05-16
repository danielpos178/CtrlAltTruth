-- Supabase Schema for Ctrl+Alt+Truth Progress Tracking --
-- Run this in the Supabase SQL Editor --

-- 1. Swipe Game Scores Table
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

CREATE TABLE IF NOT EXISTS swipe_cards (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    is_fake BOOLEAN NOT NULL,
    explanation TEXT NOT NULL,
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

-- 6. User Roles Table (Admin RBAC)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
CREATE POLICY "Users can read own role" ON user_roles FOR SELECT USING (auth.uid() = user_id);

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

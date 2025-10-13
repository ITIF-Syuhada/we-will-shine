-- We Will Shine Database Schema
-- Supabase PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins Table (for admin portal)
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin', 'teacher')),
    permissions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_code VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('user', 'bot')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Insights Table (Analytics)
CREATE TABLE IF NOT EXISTS student_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
    
    -- Interest profiling
    topics JSONB DEFAULT '{}'::jsonb,
    learning_style VARCHAR(20) CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic')),
    
    -- Emotional intelligence
    sentiment_trend JSONB DEFAULT '[]'::jsonb,
    
    -- Academic tracking
    subjects JSONB DEFAULT '[]'::jsonb,
    challenges JSONB DEFAULT '[]'::jsonb,
    
    -- Productivity
    study_schedule JSONB DEFAULT '[]'::jsonb,
    completion_rate FLOAT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    achievement_id VARCHAR(50) NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, achievement_id)
);

-- Study Sessions Table
CREATE TABLE IF NOT EXISTS study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_students_code ON students(student_code);
CREATE INDEX IF NOT EXISTS idx_chat_student ON chat_messages(student_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_insights_student ON student_insights(student_id);
CREATE INDEX IF NOT EXISTS idx_achievements_student ON achievements(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_student ON study_sessions(student_id);

-- Row Level Security (RLS) Policies
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

-- Admin policies (read-only for login)
CREATE POLICY "Public read admins" ON admins FOR SELECT USING (true);

-- Public read access (for static site)
CREATE POLICY "Public read students" ON students FOR SELECT USING (true);
CREATE POLICY "Public insert students" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update students" ON students FOR UPDATE USING (true);

CREATE POLICY "Public read chat" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Public insert chat" ON chat_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read insights" ON student_insights FOR SELECT USING (true);
CREATE POLICY "Public insert insights" ON student_insights FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update insights" ON student_insights FOR UPDATE USING (true);

CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public insert achievements" ON achievements FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read sessions" ON study_sessions FOR SELECT USING (true);
CREATE POLICY "Public insert sessions" ON study_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update sessions" ON study_sessions FOR UPDATE USING (true);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insights_updated_at BEFORE UPDATE ON student_insights
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers for admins
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data (for testing)
-- Uncomment to insert sample data
/*
-- Sample Admin (password: admin123)
INSERT INTO admins (email, password_hash, name, role, permissions) VALUES
    ('admin@wewillshine.id', 'admin123', 'Super Admin', 'super_admin', 
     '["all"]'::jsonb);

-- Sample Students
INSERT INTO students (student_code, student_name, points, level) VALUES
    ('INSPIRE2025AS', 'Ahmad Syahid', 150, 3),
    ('INSPIRE2025FZ', 'Fatimah Zahra', 200, 4);
*/


-- Migration: Add Student Activity Tracking
-- Created: 2025-10-14
-- Description: Track student login activity, sessions, and device info

-- Student Sessions Table
CREATE TABLE IF NOT EXISTS student_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    
    -- Session info
    session_token VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    
    -- Device & Browser info
    device_type VARCHAR(50), -- mobile, tablet, desktop
    browser VARCHAR(100), -- chrome, safari, firefox
    os VARCHAR(100), -- windows, macos, android, ios
    
    -- Location (optional, privacy-aware)
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamps
    login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    logout_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Activity Log
CREATE TABLE IF NOT EXISTS student_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID REFERENCES student_sessions(id) ON DELETE CASCADE,
    
    -- Activity info
    activity_type VARCHAR(50) NOT NULL, -- login, logout, page_view, chat, quiz, etc
    activity_data JSONB DEFAULT '{}'::jsonb,
    
    -- Context
    page_url TEXT,
    duration_seconds INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Login Stats (Aggregated)
CREATE TABLE IF NOT EXISTS student_login_stats (
    student_id UUID PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
    
    -- Login statistics
    total_logins INTEGER DEFAULT 0,
    first_login_at TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    last_logout_at TIMESTAMP WITH TIME ZONE,
    
    -- Session stats
    total_sessions INTEGER DEFAULT 0,
    active_sessions INTEGER DEFAULT 0,
    longest_session_minutes INTEGER DEFAULT 0,
    average_session_minutes INTEGER DEFAULT 0,
    
    -- Device usage
    devices_used JSONB DEFAULT '[]'::jsonb, -- [{ type, count, last_used }]
    browsers_used JSONB DEFAULT '[]'::jsonb,
    
    -- Activity patterns
    most_active_hour INTEGER, -- 0-23
    most_active_day VARCHAR(20), -- monday, tuesday, etc
    total_activity_minutes INTEGER DEFAULT 0,
    
    -- Streak tracking
    current_streak_days INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    last_activity_date DATE,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_student ON student_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON student_sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_sessions_login_at ON student_sessions(login_at);
CREATE INDEX IF NOT EXISTS idx_activity_student ON student_activity_log(student_id);
CREATE INDEX IF NOT EXISTS idx_activity_session ON student_activity_log(session_id);
CREATE INDEX IF NOT EXISTS idx_activity_type ON student_activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_created ON student_activity_log(created_at);

-- RLS Policies
ALTER TABLE student_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_login_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read sessions" ON student_sessions FOR SELECT USING (true);
CREATE POLICY "Public insert sessions" ON student_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update sessions" ON student_sessions FOR UPDATE USING (true);

CREATE POLICY "Public read activity" ON student_activity_log FOR SELECT USING (true);
CREATE POLICY "Public insert activity" ON student_activity_log FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read stats" ON student_login_stats FOR SELECT USING (true);
CREATE POLICY "Public insert stats" ON student_login_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update stats" ON student_login_stats FOR UPDATE USING (true);

-- Function to update last_activity
CREATE OR REPLACE FUNCTION update_session_activity()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_activity_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-update last_activity
CREATE TRIGGER update_session_last_activity BEFORE UPDATE ON student_sessions
    FOR EACH ROW EXECUTE FUNCTION update_session_activity();

-- Function to update login stats
CREATE OR REPLACE FUNCTION update_login_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update or insert login stats
    INSERT INTO student_login_stats (
        student_id, 
        total_logins, 
        first_login_at, 
        last_login_at,
        total_sessions
    ) VALUES (
        NEW.student_id,
        1,
        NEW.login_at,
        NEW.login_at,
        1
    )
    ON CONFLICT (student_id) DO UPDATE SET
        total_logins = student_login_stats.total_logins + 1,
        last_login_at = NEW.login_at,
        total_sessions = student_login_stats.total_sessions + 1,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger when new session created
CREATE TRIGGER on_session_created AFTER INSERT ON student_sessions
    FOR EACH ROW EXECUTE FUNCTION update_login_stats();

-- Comments for documentation
COMMENT ON TABLE student_sessions IS 'Track individual login sessions with device info';
COMMENT ON TABLE student_activity_log IS 'Detailed activity log for analytics';
COMMENT ON TABLE student_login_stats IS 'Aggregated login statistics per student';
COMMENT ON COLUMN student_sessions.session_token IS 'Unique session identifier';
COMMENT ON COLUMN student_sessions.is_active IS 'Whether session is currently active';
COMMENT ON COLUMN student_login_stats.current_streak_days IS 'Current consecutive days login streak';


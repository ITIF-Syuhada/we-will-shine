# 🚀 How to Run Migrations - Static Site Method

## TL;DR - Quick Fix for 404 Error

**Just copy & paste these 2 SQL scripts in Supabase Dashboard!**

---

## 📋 Step-by-Step (5 Minutes)

### Step 1: Open SQL Editor

Go to: https://supabase.com/dashboard/project/cycacvbiknngaoxrgzci/sql/new

### Step 2: Run Migration 1 (Core Tables)

**Copy this entire block** ⬇️

```sql
-- Migration 1: Initial Schema
-- Creates: students, chat_messages, student_insights, achievements, study_sessions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_code VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('user', 'bot')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
    topics JSONB DEFAULT '{}'::jsonb,
    learning_style VARCHAR(20) CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic')),
    sentiment_trend JSONB DEFAULT '[]'::jsonb,
    subjects JSONB DEFAULT '[]'::jsonb,
    challenges JSONB DEFAULT '[]'::jsonb,
    study_schedule JSONB DEFAULT '[]'::jsonb,
    completion_rate FLOAT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    achievement_id VARCHAR(50) NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_code ON students(student_code);
CREATE INDEX IF NOT EXISTS idx_chat_student ON chat_messages(student_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_insights_student ON student_insights(student_id);
CREATE INDEX IF NOT EXISTS idx_achievements_student ON achievements(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_student ON study_sessions(student_id);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

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

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insights_updated_at BEFORE UPDATE ON student_insights
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Paste in SQL Editor → Click Run ▶️**

---

### Step 3: Run Migration 2 (Admin Table) - **FIXES 404!**

**Copy this entire block** ⬇️

```sql
-- Migration 2: Add Admins
-- Creates: admins table for admin portal

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

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read admins" ON admins FOR SELECT USING (true);

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO admins (email, password_hash, name, role, permissions) VALUES
    ('admin@wewillshine.id', 'admin123', 'Super Admin', 'super_admin', '["all"]'::jsonb)
ON CONFLICT (email) DO NOTHING;
```

**Paste in SQL Editor → Click Run ▶️**

---

### Step 4: Verify Tables

Go to **Table Editor**: https://supabase.com/dashboard/project/cycacvbiknngaoxrgzci/editor

Should see **6 tables**:

- ✅ students
- ✅ chat_messages
- ✅ student_insights
- ✅ achievements
- ✅ study_sessions
- ✅ **admins** (with 1 row)

---

### Step 5: Test Admin Login

1. Refresh: http://localhost:5173/admin/login
2. Login:
   - Email: `admin@wewillshine.id`
   - Password: `admin123`
3. Should work! ✅

---

## 🎯 Why Manual for Static Site?

**Supabase CLI** is powerful but designed for **server-side** apps:

- Needs database password
- Requires local Supabase instance
- Complex for GitHub Pages deployment
- Overkill for simple static site

**Manual Migration** (current approach):

- ✅ Perfect for static sites
- ✅ No CLI complications
- ✅ Version controlled (Git)
- ✅ Team friendly
- ✅ Simple & effective

**We still get migration benefits**:

- ✅ Version control (files in Git)
- ✅ Reproducible (copy-paste SQL)
- ✅ Documented (migration files)
- ✅ Rollback (reverse SQL)

---

## 📝 For Future Migrations

### Create New Migration:

1. Create file: `supabase/migrations/YYYYMMDDHHMMSS_feature.sql`
2. Write SQL
3. Commit to Git
4. Share with team
5. Each person runs in their Supabase dashboard

### Example:

```bash
# Create new migration
touch supabase/migrations/20251014120000_add_parents.sql

# Write SQL, commit
git add supabase/migrations/
git commit -m "migration: Add parents table"

# Team members copy & run in dashboard
```

---

## ✅ Quick Checklist

After running both migrations:

- [ ] 6 tables created in Supabase
- [ ] Admins table has 1 row
- [ ] Admin login works
- [ ] Student features work
- [ ] No 404 errors

---

**This is the practical approach for static sites on GitHub Pages! 🚀**

-- ============================================
-- ADMIN TABLE SETUP
-- Run this SQL in Supabase SQL Editor
-- ============================================

-- Step 1: Create admins table
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

-- Step 2: Create index for fast email lookup
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- Step 3: Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policy for public read (login purpose)
CREATE POLICY "Public read admins" ON admins FOR SELECT USING (true);

-- Step 5: Create function for auto-update timestamp (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create trigger for auto-update
CREATE TRIGGER update_admins_updated_at 
    BEFORE UPDATE ON admins
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Insert default admin account
INSERT INTO admins (email, password_hash, name, role, permissions) VALUES
    ('admin@wewillshine.id', 'admin123', 'Super Admin', 'super_admin', '["all"]'::jsonb);

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this to verify admin was created:
SELECT * FROM admins;

-- Should return 1 row:
-- email: admin@wewillshine.id
-- name: Super Admin
-- role: super_admin


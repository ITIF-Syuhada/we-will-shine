-- Migration: Add Admins Table
-- Created: 2025-10-13
-- Description: Admin portal authentication and management

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin', 'teacher')),
    permissions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public read policy (for login)
CREATE POLICY "Public read admins" ON admins FOR SELECT USING (true);

-- Auto-update trigger
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin (for testing)
-- WARNING: Change password in production!
INSERT INTO admins (email, password_hash, name, role, permissions) VALUES
    ('admin@wewillshine.id', 'admin123', 'Super Admin', 'super_admin', '["all"]'::jsonb)
ON CONFLICT (email) DO NOTHING;


# 🔐 Admin Portal Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Run Database Schema

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard/project/cycacvbiknngaoxrgzci
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the SQL below:

```sql
-- Create Admins Table
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

-- Index for email lookup
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public read policy (for login)
CREATE POLICY "Public read admins" ON admins FOR SELECT USING (true);

-- Auto-update trigger
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin account
INSERT INTO admins (email, password_hash, name, role, permissions) VALUES
    ('admin@wewillshine.id', 'admin123', 'Super Admin', 'super_admin', '["all"]'::jsonb);
```

5. Click **Run** (▶️)
6. Check for success message

### Step 2: Verify Table Created

1. Go to **Table Editor**
2. Look for `admins` table in the list
3. Click on it to verify data:
   - Should have 1 row
   - Email: `admin@wewillshine.id`
   - Role: `super_admin`

### Step 3: Test Login

1. Run dev server:

   ```bash
   pnpm dev
   ```

2. Navigate to: http://localhost:5173/admin/login

3. Login with:
   - **Email**: `admin@wewillshine.id`
   - **Password**: `admin123`

4. Should redirect to Admin Dashboard

---

## 🎯 Admin Portal Features

### Login Page (`/admin/login`)

- Email & password authentication
- Database verification
- Session management
- Error handling
- Secure login flow

### Admin Dashboard (`/admin/dashboard`)

- **Stats Cards**:
  - Total Students
  - Total Points
  - Average Level

- **Student Management**:
  - Complete student list
  - Search functionality
  - Sort by date
  - View details

- **Header**:
  - Admin info display
  - Role indicator
  - Logout button

---

## 👥 Admin Roles

### Super Admin

- **Access**: Full system access
- **Permissions**: All features
- **Can**:
  - Manage all students
  - View all analytics
  - Create other admins
  - Modify system settings

### Admin

- **Access**: Management level
- **Permissions**: Student CRUD, Analytics
- **Can**:
  - View students
  - Edit student data
  - View analytics
  - Generate reports

### Teacher

- **Access**: Read-only
- **Permissions**: View students, Reports
- **Can**:
  - View student list
  - View progress
  - Generate reports
  - No editing rights

---

## 🔒 Security Notes

### Current Implementation (MVP):

⚠️ **Password stored as plain text** (for testing only)

- This is OK for MVP/internal testing
- **DO NOT use in production**

### Production Requirements:

✅ **Use proper password hashing** (bcrypt, argon2)
✅ **Implement rate limiting** (prevent brute force)
✅ **Add 2FA** (two-factor authentication)
✅ **Session timeout** (auto-logout after inactivity)
✅ **Audit logging** (track admin actions)

### Password Hashing Example (Future):

```javascript
import bcrypt from 'bcrypt';

// Hash password
const hash = await bcrypt.hash('admin123', 10);

// Verify password
const match = await bcrypt.compare(inputPassword, storedHash);
```

---

## 🆕 Creating New Admin Accounts

### Via SQL (Supabase Dashboard):

```sql
INSERT INTO admins (email, password_hash, name, role, permissions) VALUES
    ('teacher@wewillshine.id', 'teacher123', 'Ustadz Ahmad', 'teacher',
     '["view_students", "view_analytics"]'::jsonb),
    ('admin2@wewillshine.id', 'admin456', 'Ustadzah Fatimah', 'admin',
     '["manage_students", "view_analytics", "generate_reports"]'::jsonb);
```

### Via API (Future):

```typescript
await db.createAdmin({
	email: 'newadmin@wewillshine.id',
	password_hash: hashedPassword,
	name: 'Admin Name',
	role: 'admin',
	permissions: ['manage_students', 'view_analytics']
});
```

---

## 🛠️ Troubleshooting

### Error: "Table admins does not exist"

**Solution**: Run the SQL schema in Step 1

### Error: "Email atau password salah"

**Possible causes**:

1. Admin account not created
2. Wrong email/password
3. Database connection issue

**Check**:

```sql
-- Verify admin exists
SELECT * FROM admins WHERE email = 'admin@wewillshine.id';
```

### Error: "Failed to load students"

**Solution**: Ensure `students` table exists and has RLS policies

### Login redirects to login page

**Possible causes**:

1. Admin store not persisting
2. Browser localStorage disabled
3. Session expired

**Fix**: Check browser console for errors

---

## 📊 Database Structure

### Admins Table Schema:

```typescript
interface Admin {
	id: string; // UUID
	email: string; // Unique email
	password_hash: string; // Password (hashed in production)
	name: string; // Display name
	role: 'super_admin' | 'admin' | 'teacher';
	permissions: string[]; // Array of permissions
	created_at: string; // ISO timestamp
	updated_at: string; // Auto-updated
}
```

### Permissions Array Examples:

```json
// Super Admin
["all"]

// Admin
["manage_students", "view_analytics", "generate_reports", "send_notifications"]

// Teacher
["view_students", "view_analytics", "view_reports"]
```

---

## 🎯 Next Steps

### Immediate:

1. ✅ Create admins table
2. ✅ Insert default admin
3. ✅ Test login
4. ✅ Verify dashboard access

### Short-term:

- [ ] Build student detail page
- [ ] Add edit student functionality
- [ ] Implement bulk operations
- [ ] Add export to CSV
- [ ] Create activity logs

### Medium-term:

- [ ] Proper password hashing
- [ ] 2FA implementation
- [ ] Admin user management UI
- [ ] Advanced analytics for admins
- [ ] Parent dashboard integration

---

## 🔗 Related Files

- `src/routes/admin/login/+page.svelte` - Login page
- `src/routes/admin/dashboard/+page.svelte` - Dashboard
- `src/lib/stores/admin.ts` - Admin session store
- `src/lib/supabase.ts` - Database functions
- `supabase/schema.sql` - Full database schema

---

## ⚡ Quick Test

After setup, verify everything works:

```bash
# 1. Run dev server
pnpm dev

# 2. Open browser
http://localhost:5173/admin/login

# 3. Login
Email: admin@wewillshine.id
Password: admin123

# 4. Should see:
- Admin Dashboard
- Student list
- Stats cards
- Search working
```

---

**Security Reminder**:

> This is MVP implementation. For production, implement proper password hashing, rate limiting, and security best practices.

---

**Last Updated**: October 13, 2025  
**Status**: Testing Phase 🧪  
**Next**: Production Security Hardening 🔒

# ⚡ Quick Start Guide - We Will Shine

## 🚀 5-Minute Setup

### Prerequisites

- ✅ Supabase account
- ✅ Project ID: `cycacvbiknngaoxrgzci`
- ✅ `.env` file created (see below)

---

## Step 1️⃣: Create `.env` File

Create `.env` in project root:

```bash
PUBLIC_SUPABASE_URL=https://cycacvbiknngaoxrgzci.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5Y2FjdmJpa25uZ2FveHJnemNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMTA2NjUsImV4cCI6MjA3NTg4NjY2NX0.IxY_aS-DRzh5tuo0BvZqb-e0CLEQ7TU_vOYam3U6Xg0
```

---

## Step 2️⃣: Setup Database

### Option A: Run Full Schema (Recommended)

1. Go to: https://supabase.com/dashboard/project/cycacvbiknngaoxrgzci/sql/new
2. Open file: `supabase/schema.sql`
3. Copy **ALL content**
4. Paste in SQL Editor
5. Click **Run** ▶️
6. Wait for "Success" message

### Option B: Admin Table Only (Quick Test)

1. Go to: https://supabase.com/dashboard/project/cycacvbiknngaoxrgzci/sql/new
2. Open file: `supabase/admin-table-only.sql`
3. Copy **ALL content**
4. Paste in SQL Editor
5. Click **Run** ▶️

---

## Step 3️⃣: Verify Tables Created

Go to **Table Editor**: https://supabase.com/dashboard/project/cycacvbiknngaoxrgzci/editor

Should see:

- ✅ `admins` (1 row)
- ✅ `students` (empty or with data)
- ✅ `chat_messages` (empty)
- ✅ `student_insights` (empty)
- ✅ `achievements` (empty)
- ✅ `study_sessions` (empty)

---

## Step 4️⃣: Test the App

### Start Dev Server:

```bash
pnpm dev
```

### Test Student Flow:

1. Go to: http://localhost:5173
2. Click "🚀 Masuk"
3. Enter code: `INSPIRE2025AS`
4. Explore dashboard
5. Chat with AI Mentor
6. Check Analytics page

### Test Admin Flow:

1. Go to: http://localhost:5173/admin/login
2. Login with:
   - **Email**: `admin@wewillshine.id`
   - **Password**: `admin123`
3. Should see Admin Dashboard
4. View student list
5. Search functionality

---

## ✅ Verification Checklist

### Database:

- [ ] `.env` file created
- [ ] Supabase connected (no errors in console)
- [ ] Tables created in Supabase
- [ ] Sample admin exists

### Student Features:

- [ ] Student login works (code: INSPIRE2025AS)
- [ ] Dashboard displays correctly
- [ ] Chat messages save to database
- [ ] Points sync to database
- [ ] Analytics page shows data

### Admin Features:

- [ ] Admin login works
- [ ] Dashboard shows student list
- [ ] Search functionality works
- [ ] Stats cards display correctly

---

## 🐛 Common Issues & Fixes

### Issue: "Could not find table 'admins'"

**Fix**: Run `supabase/admin-table-only.sql` in Supabase

### Issue: "Connection error"

**Fix**: Check `.env` file exists and has correct credentials

### Issue: "Email atau password salah"

**Fix**:

1. Verify admin exists:
   ```sql
   SELECT * FROM admins WHERE email = 'admin@wewillshine.id';
   ```
2. If empty, run INSERT statement again

### Issue: "Students not loading"

**Fix**: Run full `supabase/schema.sql` to create all tables

---

## 📊 Sample Data (Optional)

Want to test with sample data? Run this:

```sql
-- Create sample students
INSERT INTO students (student_code, student_name, points, level) VALUES
    ('INSPIRE2025AS', 'Ahmad Syahid', 150, 3),
    ('INSPIRE2025FZ', 'Fatimah Zahra', 200, 4),
    ('INSPIRE2025MR', 'Muhammad Rizki', 100, 2);

-- Create sample chat messages (replace student_id with actual UUID)
INSERT INTO chat_messages (student_id, type, message) VALUES
    ((SELECT id FROM students WHERE student_code = 'INSPIRE2025AS'), 'user', 'Halo AI Mentor!'),
    ((SELECT id FROM students WHERE student_code = 'INSPIRE2025AS'), 'bot', 'Assalamualaikum! Ada yang bisa aku bantu?');
```

---

## 🎯 What's Next?

After successful setup:

1. **Explore Student Dashboard**:
   - Test all features
   - Chat with AI
   - View Analytics

2. **Explore Admin Dashboard**:
   - View student list
   - Check analytics
   - Test search

3. **Start Development**:
   - Implement sentiment analysis
   - Build study timer
   - Add more features

---

## 📞 Need Help?

Check documentation:

- `SUPABASE_SETUP.md` - Detailed Supabase guide
- `ADMIN_SETUP.md` - Admin portal guide
- `TODO.md` - Feature development plan
- `ROADMAP.md` - Product vision

---

**Ready to shine! 🌟**

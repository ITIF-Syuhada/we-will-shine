# 🗄️ Supabase Setup Guide

## Prerequisites

- Supabase Account: https://supabase.com
- Project already created

## 📝 Step 1: Environment Variables

Create `.env` file in the project root:

```bash
PUBLIC_SUPABASE_URL=https://cycacvbiknngaoxrgzci.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5Y2FjdmJpa25uZ2FveHJnemNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMTA2NjUsImV4cCI6MjA3NTg4NjY2NX0.IxY_aS-DRzh5tuo0BvZqb-e0CLEQ7TU_vOYam3U6Xg0
```

**Note**: `.env` is already in `.gitignore` - credentials are safe!

## 🗃️ Step 2: Run Database Schema

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `cycacvbiknngaoxrgzci`
3. Navigate to **SQL Editor**
4. Copy content from `supabase/schema.sql`
5. Paste and **Run** the SQL

This will create:

- ✅ `students` table
- ✅ `chat_messages` table
- ✅ `student_insights` table
- ✅ `achievements` table
- ✅ `study_sessions` table
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies

## 🔐 Step 3: Configure RLS (Already in schema)

Row Level Security is enabled with public policies because this is a **static site** (GitHub Pages).

**Security Considerations**:

- ✅ Read access: Public
- ✅ Insert access: Public (validated client-side)
- ✅ Update access: Public (student can only update their own data)
- ⚠️ For production: Add API key validation or Auth

## 📊 Step 4: Verify Tables

In Supabase Dashboard:

1. Go to **Table Editor**
2. Verify all tables are created:
   - students
   - chat_messages
   - student_insights
   - achievements
   - study_sessions

## 🧪 Step 5: Test Connection

Run the dev server:

```bash
pnpm dev
```

The app will automatically connect to Supabase using environment variables.

## 📦 Database Schema Overview

### Students Table

```sql
- id: UUID (PK)
- student_code: VARCHAR (Unique) - "INSPIRE2025AS"
- student_name: VARCHAR - "Ahmad Syahid"
- points: INTEGER - 150
- level: INTEGER - 3
- created_at, updated_at: TIMESTAMP
```

### Chat Messages

```sql
- id: UUID (PK)
- student_id: UUID (FK)
- type: VARCHAR - 'user' | 'bot'
- message: TEXT
- created_at: TIMESTAMP
```

### Student Insights

```sql
- id: UUID (PK)
- student_id: UUID (FK, Unique)
- topics: JSONB - { coding: 0.8, design: 0.6 }
- learning_style: VARCHAR - 'visual' | 'auditory' | 'kinesthetic'
- sentiment_trend: JSONB - [{ date, mood, confidence }]
- subjects: JSONB - [{ name, hours, progress }]
- challenges: JSONB - [{ topic, frequency, resolved }]
- study_schedule: JSONB
- completion_rate: FLOAT
- created_at, updated_at: TIMESTAMP
```

### Achievements

```sql
- id: UUID (PK)
- student_id: UUID (FK)
- achievement_id: VARCHAR - 'streak_7', 'night_owl'
- unlocked_at: TIMESTAMP
```

### Study Sessions

```sql
- id: UUID (PK)
- student_id: UUID (FK)
- subject: VARCHAR
- duration_minutes: INTEGER
- started_at: TIMESTAMP
- ended_at: TIMESTAMP
```

## 🔧 Usage in Code

### Import Supabase client:

```typescript
import { supabase, db } from '$lib/supabase';
```

### Get student:

```typescript
const student = await db.getStudent('INSPIRE2025AS');
```

### Save chat message:

```typescript
await db.saveChatMessage({
	student_id: student.id,
	type: 'user',
	message: 'Halo AI Mentor!'
});
```

### Get chat history:

```typescript
const messages = await db.getChatHistory(student.id);
```

### Update insights:

```typescript
await db.updateInsights(student.id, {
	topics: { coding: 0.8, design: 0.6 },
	learning_style: 'visual'
});
```

### Unlock achievement:

```typescript
await db.unlockAchievement(student.id, 'streak_7');
```

## 🚀 For GitHub Pages Deployment

### Build command:

```bash
pnpm build
```

### Environment variables in GitHub Actions:

```yaml
env:
  PUBLIC_SUPABASE_URL: ${{ secrets.PUBLIC_SUPABASE_URL }}
  PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
```

Add secrets in: **GitHub Repo → Settings → Secrets and variables → Actions**

## 📈 Monitoring & Analytics

### Supabase Dashboard:

- **Database**: View tables and data
- **Table Editor**: Manual data editing
- **SQL Editor**: Run queries
- **API Docs**: Auto-generated API documentation
- **Logs**: Monitor queries and errors

### Performance:

- Indexes are created for all foreign keys
- JSONB fields for flexible data structures
- RLS for security

## 🔄 Migrations (Future)

For schema updates, create migration files:

```bash
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_add_study_sessions.sql
```

## 🆘 Troubleshooting

### Connection issues:

1. Check `.env` file exists
2. Verify environment variables are correct
3. Check Supabase project is not paused

### RLS errors:

1. Ensure RLS policies are created
2. Check policy allows public access
3. Verify table permissions

### Data not saving:

1. Check browser console for errors
2. Verify table schema matches TypeScript types
3. Check Supabase logs

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [SvelteKit + Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit)

---

**Last Updated**: October 13, 2025
**Database**: PostgreSQL via Supabase
**Project**: We Will Shine

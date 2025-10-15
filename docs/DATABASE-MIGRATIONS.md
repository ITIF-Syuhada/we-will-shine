# 🔄 Database Migration Guide - Supabase CLI

## Why Migrations?

✅ **Version Control** - Track database changes over time  
✅ **Reproducible** - Same schema across dev/staging/prod  
✅ **Rollback** - Easy to undo changes  
✅ **Team Collaboration** - Share schema changes via Git  
✅ **CI/CD Ready** - Automated deployments

---

## 📦 Setup (One-Time)

### Install Supabase CLI

Already installed via:

```bash
pnpm add -D supabase
```

### Project Structure

```
supabase/
├── config.toml                    # Supabase config
├── migrations/
│   ├── 20251013000001_initial_schema.sql    # Initial tables
│   └── 20251013000002_add_admins.sql        # Admin table
└── .gitignore
```

---

## 🚀 Running Migrations

### Option 1: Via Supabase Dashboard (Recommended for Now)

**For Remote Database (cycacvbiknngaoxrgzci):**

1. Go to SQL Editor:

   ```
   https://supabase.com/dashboard/project/cycacvbiknngaoxrgzci/sql/new
   ```

2. Run migrations in order:

   **Migration 1 - Initial Schema:**

   ```bash
   # Copy content from:
   supabase/migrations/20251013000001_initial_schema.sql

   # Paste in SQL Editor → Run ▶️
   ```

   **Migration 2 - Add Admins:**

   ```bash
   # Copy content from:
   supabase/migrations/20251013000002_add_admins.sql

   # Paste in SQL Editor → Run ▶️
   ```

3. Verify in Table Editor:
   - ✅ students
   - ✅ chat_messages
   - ✅ student_insights
   - ✅ achievements
   - ✅ study_sessions
   - ✅ admins (with 1 row)

### Option 2: Via Supabase CLI (Advanced)

**Note**: Requires Supabase CLI installed system-wide and authentication

```bash
# Login to Supabase
npx supabase login

# Link to remote project
npx supabase link --project-ref cycacvbiknngaoxrgzci

# Push migrations to remote
npx supabase db push

# Or run specific migration
npx supabase db execute --file supabase/migrations/20251013000001_initial_schema.sql
npx supabase db execute --file supabase/migrations/20251013000002_add_admins.sql
```

---

## 📝 Creating New Migrations

### Naming Convention:

```
YYYYMMDDHHMMSS_description.sql

Examples:
20251013000001_initial_schema.sql
20251013000002_add_admins.sql
20251014120000_add_parent_table.sql
```

### Template:

```sql
-- Migration: [Feature Name]
-- Created: YYYY-MM-DD
-- Description: What this migration does

-- Your SQL here
CREATE TABLE IF NOT EXISTS new_table (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ...
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_name ON new_table(column);

-- RLS
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;
CREATE POLICY "policy_name" ON new_table FOR SELECT USING (true);
```

### Example - Add Parent Table:

Create: `supabase/migrations/20251014120000_add_parents.sql`

```sql
-- Migration: Add Parents Table
-- Created: 2025-10-14
-- Description: Parent accounts for monitoring student progress

CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_parents (
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
    relationship VARCHAR(20) CHECK (relationship IN ('father', 'mother', 'guardian')),
    PRIMARY KEY (student_id, parent_id)
);

CREATE INDEX idx_student_parents_student ON student_parents(student_id);
CREATE INDEX idx_student_parents_parent ON student_parents(parent_id);

ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_parents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read parents" ON parents FOR SELECT USING (true);
CREATE POLICY "Public read student_parents" ON student_parents FOR SELECT USING (true);

CREATE TRIGGER update_parents_updated_at BEFORE UPDATE ON parents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 🔄 Migration Workflow

### Development Process:

1. **Create Migration File**:

   ```bash
   # Create new file with timestamp
   supabase/migrations/20251015100000_your_feature.sql
   ```

2. **Write SQL**:
   - Add tables, columns, indexes
   - Update RLS policies
   - Insert seed data (if needed)

3. **Test Locally** (optional):

   ```bash
   npx supabase db reset
   ```

4. **Run on Remote**:
   - Copy SQL to Supabase Dashboard
   - Or use `npx supabase db push`

5. **Commit to Git**:
   ```bash
   git add supabase/migrations/
   git commit -m "migration: Add feature X"
   git push
   ```

---

## 📊 Current Migrations

### Migration 1: Initial Schema

- **File**: `20251013000001_initial_schema.sql`
- **Creates**:
  - students
  - chat_messages
  - student_insights
  - achievements
  - study_sessions
- **Status**: ⚠️ Needs to be run

### Migration 2: Add Admins

- **File**: `20251013000002_add_admins.sql`
- **Creates**:
  - admins table
  - Default admin account
- **Status**: ⚠️ Needs to be run (fixes 404 error)

---

## 🎯 Quick Migration Commands

### Run All Pending Migrations:

```bash
# Via Dashboard (current method)
1. Open SQL Editor
2. Run migration 1
3. Run migration 2
4. Verify tables created

# Via CLI (alternative)
npx supabase db push
```

### Check Migration Status:

```bash
npx supabase migration list
```

### Create New Migration:

```bash
# Generate migration file
npx supabase migration new feature_name

# Or manually create:
# supabase/migrations/YYYYMMDDHHMMSS_feature_name.sql
```

### Reset Database (Dangerous!):

```bash
# Local only
npx supabase db reset

# Never run on production!
```

---

## 🔒 Best Practices

### DO:

✅ Use IF NOT EXISTS for idempotency  
✅ Add indexes for foreign keys  
✅ Enable RLS on all tables  
✅ Include descriptive comments  
✅ Test migrations on local first  
✅ Keep migrations small & focused  
✅ Use ON CONFLICT for seed data

### DON'T:

❌ Modify existing migrations  
❌ Delete data without backup  
❌ Skip RLS policies  
❌ Hardcode sensitive data  
❌ Run untested SQL on production

---

## 🛠️ For This Project (Static Site)

Since we're using **GitHub Pages** (static site), we use **manual migrations**:

### Current Approach:

1. Create migration files (version controlled)
2. Run SQL manually in Supabase Dashboard
3. Team shares migrations via Git
4. Simple, no CLI dependency

### Why Not Full CLI?

- Static site deployment
- No server-side migrations
- Manual control preferred
- Simpler for small team

### When to Use CLI?

- Local development (optional)
- Multiple environments
- CI/CD pipelines
- Larger teams

---

## 📋 Migration Checklist

### Before Running:

- [ ] Review SQL for errors
- [ ] Check dependencies (foreign keys)
- [ ] Verify table names
- [ ] Test on local (optional)
- [ ] Backup if modifying data

### After Running:

- [ ] Verify tables created
- [ ] Check indexes exist
- [ ] Test RLS policies
- [ ] Verify sample data
- [ ] Update documentation

---

## 🎯 Next Steps

### Immediate:

1. ✅ Run migration 1 (initial schema)
2. ✅ Run migration 2 (add admins)
3. ✅ Verify tables in Supabase
4. ✅ Test admin login
5. ✅ Test student features

### Future Migrations:

- [ ] Add parent accounts
- [ ] Add teacher portal
- [ ] Add study groups
- [ ] Add notifications
- [ ] Add content library

---

## 📚 Learn More

- [Supabase Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Database Migrations Best Practices](https://www.prisma.io/dataguide/types/relational/migration-best-practices)
- [SQL Migration Patterns](https://www.postgresql.org/docs/current/ddl.html)

---

**Current Status**:

- Migrations created ✅
- Need to run on remote ⚠️
- Files committed to Git ✅

**To fix 404 error**: Run migration 2 in Supabase Dashboard! 🚀

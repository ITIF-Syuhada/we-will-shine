# 🚨 URGENT: Run Database Migration

## Error yang Terjadi

```
column students.kelas does not exist
```

Kolom `kelas`, `rombel`, dan `angkatan` belum ada di database!

## ✅ Cara Menjalankan Migration

### Option 1: Via Supabase Dashboard (Recommended)

1. **Buka Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Pilih project: `cycacvbiknngaoxrgzci`

2. **Buka SQL Editor**
   - Klik menu "SQL Editor" di sidebar kiri
   - Klik "New query"

3. **Copy & Paste SQL berikut:**

```sql
-- Add kelas, rombel, and angkatan fields to students table
ALTER TABLE students
ADD COLUMN IF NOT EXISTS kelas VARCHAR(10),
ADD COLUMN IF NOT EXISTS rombel VARCHAR(10),
ADD COLUMN IF NOT EXISTS angkatan VARCHAR(10);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_students_kelas ON students(kelas);
CREATE INDEX IF NOT EXISTS idx_students_rombel ON students(rombel);
CREATE INDEX IF NOT EXISTS idx_students_angkatan ON students(angkatan);
CREATE INDEX IF NOT EXISTS idx_students_kelas_rombel ON students(kelas, rombel);

-- Add comments for documentation
COMMENT ON COLUMN students.kelas IS 'Student class level (e.g., X, XI, XII)';
COMMENT ON COLUMN students.rombel IS 'Student homeroom class (e.g., A, B, C)';
COMMENT ON COLUMN students.angkatan IS 'Student cohort year (e.g., 2024, 2025)';
```

4. **Run Query**
   - Klik tombol "Run" atau tekan `Ctrl+Enter`
   - Tunggu sampai selesai
   - Should see: "Success. No rows returned"

5. **Verify**
   - Go to "Table Editor"
   - Pilih tabel `students`
   - Cek apakah kolom `kelas`, `rombel`, `angkatan` sudah ada

### Option 2: Via Supabase CLI

```bash
# 1. Make sure you're linked to the project
supabase link --project-ref cycacvbiknngaoxrgzci

# 2. Push migrations
supabase db push

# 3. Verify
supabase db pull
```

### Option 3: Via SQL File

Jika menggunakan SQL client (psql, pgAdmin, etc):

```bash
# File migration ada di:
supabase/migrations/20251014000003_add_student_class_fields.sql

# Connect ke database dan run file tersebut
```

## 🧪 Test Setelah Migration

1. **Refresh halaman `/admin/students`**
2. **Cek console** - seharusnya tidak ada error lagi
3. **Test Import CSV** - upload file CSV dengan kolom kelas/rombel/angkatan
4. **Test Filter** - dropdown kelas, rombel, angkatan harus berfungsi

## 📝 Migration File Location

```
supabase/migrations/20251014000003_add_student_class_fields.sql
```

## ⚠️ Important Notes

- Migration ini **aman** - menggunakan `IF NOT EXISTS`
- Tidak akan menghapus data yang sudah ada
- Hanya menambahkan kolom baru
- Kolom nullable (tidak wajib diisi)

## 🔍 Verify Migration Success

Setelah menjalankan migration, test dengan query ini di SQL Editor:

```sql
-- Check if columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'students'
  AND column_name IN ('kelas', 'rombel', 'angkatan');

-- Should return 3 rows:
-- kelas    | character varying
-- rombel   | character varying
-- angkatan | character varying
```

## 📞 Troubleshooting

### Error: "relation does not exist"

**Solution:** Table `students` belum dibuat. Run migration awal terlebih dahulu.

### Error: "permission denied"

**Solution:** Pastikan menggunakan database password yang benar.

### Error: "column already exists"

**Solution:** Migration sudah dijalankan sebelumnya. Tidak perlu run lagi.

---

**Next Steps:**

1. ✅ Run migration (pilih salah satu option di atas)
2. ✅ Refresh browser
3. ✅ Test import CSV
4. ✅ Verify filters berfungsi

**Status:** 🔴 **CRITICAL** - Harus dijalankan sebelum bisa menggunakan fitur import!

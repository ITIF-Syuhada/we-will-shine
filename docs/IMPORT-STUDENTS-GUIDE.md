# 📥 Import Students Guide

Panduan lengkap untuk import data siswa ke dalam sistem We Will Shine.

## 🎯 Fitur Import

### ✨ Capabilities

- ✅ Bulk import via CSV file
- ✅ Support kelas, rombel, dan angkatan
- ✅ Preview data sebelum import
- ✅ Validation otomatis
- ✅ Error handling yang jelas
- ✅ Template CSV download

## 📋 Format CSV

### Required Fields

| Field        | Type   | Description               | Example       |
| ------------ | ------ | ------------------------- | ------------- |
| student_code | string | Unique student identifier | INSPIRE2025AS |
| student_name | string | Full name of student      | Ahmad Syahid  |

### Optional Fields

| Field    | Type   | Description                 | Example |
| -------- | ------ | --------------------------- | ------- |
| kelas    | string | Class level (X, XI, XII)    | X       |
| rombel   | string | Homeroom class (A, B, C)    | A       |
| angkatan | string | Cohort year                 | 2025    |
| points   | number | Initial points (default: 0) | 0       |
| level    | number | Initial level (default: 1)  | 1       |

### Example CSV

```csv
student_code,student_name,kelas,rombel,angkatan,points,level
INSPIRE2025AS,Ahmad Syahid,X,A,2025,0,1
INSPIRE2025BS,Budi Santoso,X,A,2025,0,1
INSPIRE2025CS,Citra Sari,X,B,2025,0,1
INSPIRE2025DS,Dewi Lestari,XI,A,2024,100,2
INSPIRE2025ES,Eko Prasetyo,XI,B,2024,50,1
```

## 🔍 Filter & Pagination

### Filter Options

1. **Search** - Cari berdasarkan nama atau kode siswa
2. **Kelas** - Filter berdasarkan tingkat kelas (X, XI, XII)
3. **Rombel** - Filter berdasarkan kelas rombongan (A, B, C)
4. **Angkatan** - Filter berdasarkan tahun angkatan (2024, 2025)

### Pagination Modes

#### 1. By Number (Default)

- 40 siswa per halaman
- Navigasi dengan nomor halaman
- Best untuk browsing semua siswa

#### 2. By Kelas

- Tampilkan semua siswa dalam satu kelas
- Otomatis filter berdasarkan kelas yang dipilih
- Best untuk melihat per tingkat

#### 3. By Rombel

- Tampilkan semua siswa dalam satu rombel
- Otomatis filter berdasarkan rombel yang dipilih
- Best untuk melihat per kelas rombongan

## 📝 Step-by-Step Import

### 1. Prepare CSV File

```bash
# Download template dari UI
# Atau buat manual dengan format di atas
```

### 2. Access Import Page

```
Navigate to: /admin/students
Click: "📥 Import Data Siswa"
```

### 3. Upload & Preview

1. Click "Choose File" dan pilih CSV
2. Click "👁️ Preview Data" untuk melihat preview
3. Verifikasi data sudah benar
4. Click "✅ Confirm Import"

### 4. Verify Import

- Check total students count
- Use filters untuk verifikasi data
- Check per kelas/rombel

## 🛠️ Database Migration

Sebelum menggunakan fitur import, jalankan migration:

```bash
# Run migration untuk menambahkan field kelas, rombel, angkatan
supabase db push

# Atau manual via SQL Editor di Supabase Dashboard
```

Migration file: `supabase/migrations/20251014000003_add_student_class_fields.sql`

## 🔧 API Functions

### Bulk Create Students

```typescript
import { db } from '$lib/supabase';

const students = [
	{
		student_code: 'INSPIRE2025AS',
		student_name: 'Ahmad Syahid',
		kelas: 'X',
		rombel: 'A',
		angkatan: '2025',
		points: 0,
		level: 1
	}
	// ... more students
];

await db.bulkCreateStudents(students);
```

### Get Students with Filter

```typescript
const result = await db.getStudentsWithFilter({
	kelas: 'X',
	rombel: 'A',
	angkatan: '2025',
	search: 'Ahmad',
	limit: 40,
	offset: 0
});

console.log(result.students); // Array of students
console.log(result.total); // Total count
```

### Get Unique Values

```typescript
const values = await db.getUniqueValues();
console.log(values.kelas); // ['X', 'XI', 'XII']
console.log(values.rombel); // ['A', 'B', 'C']
console.log(values.angkatan); // ['2024', '2025']
```

## ⚠️ Common Issues

### Issue: "Header yang diperlukan tidak ditemukan"

**Solution:** Pastikan CSV memiliki header `student_code` dan `student_name` di baris pertama.

### Issue: "Gagal import data"

**Possible causes:**

1. Duplicate student_code
2. Invalid CSV format
3. Missing required fields
4. Database connection error

**Solution:**

- Check CSV format
- Ensure student_code unique
- Verify database connection

### Issue: Filter tidak bekerja

**Solution:**

- Clear browser cache
- Reload page
- Check if data has kelas/rombel/angkatan values

## 📊 Best Practices

### 1. Data Organization

```
Kelas:    X, XI, XII (tingkat)
Rombel:   A, B, C, D (kelas rombongan)
Angkatan: 2024, 2025, 2026 (tahun masuk)
```

### 2. Student Code Format

```
Format: [PREFIX][YEAR][INITIALS]
Example: INSPIRE2025AS
- INSPIRE: Program name
- 2025: Angkatan
- AS: Initials (Ahmad Syahid)
```

### 3. Bulk Import Tips

- Import per angkatan untuk data yang terorganisir
- Gunakan template yang sudah disediakan
- Preview data sebelum confirm
- Backup data sebelum import besar

### 4. Filter Strategy

```
Scenario 1: Lihat semua siswa kelas X
→ Filter: Kelas = X, Pagination = By Kelas

Scenario 2: Lihat siswa X-A saja
→ Filter: Kelas = X, Rombel = A

Scenario 3: Lihat angkatan 2025
→ Filter: Angkatan = 2025, Pagination = By Number
```

## 🔐 Security

- ✅ Admin-only access
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ File type validation (.csv only)
- ✅ Data sanitization

## 📈 Performance

- Bulk insert optimized for large datasets
- Indexed fields (kelas, rombel, angkatan)
- Efficient pagination queries
- Client-side preview (first 10 rows)

## 🚀 Future Enhancements

- [ ] Excel (.xlsx) support
- [ ] Batch update existing students
- [ ] Export filtered data to CSV
- [ ] Import history & rollback
- [ ] Duplicate detection & merge
- [ ] Photo upload via CSV (URLs)

## 📞 Support

Jika ada masalah dengan import:

1. Check format CSV sesuai template
2. Verify migration sudah dijalankan
3. Check browser console untuk error
4. Contact admin untuk bantuan

---

**Last Updated:** October 2025  
**Version:** 1.0.0

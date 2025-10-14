# 📊 Students Table - Feature Documentation

## Overview

Halaman `/admin/students` menyediakan sistem manajemen siswa yang lengkap dengan filtering, pagination, import CSV, dan **column visibility settings**.

---

## ✨ Features

### 1. **Column Visibility Toggle** ⭐ NEW!

Memungkinkan admin untuk memilih kolom mana yang ingin ditampilkan pada tabel.

#### **Columns Available:**

- ✅ **Code** - Student code (KANAVIID2025)
- ✅ **Name** - Student name
- ✅ **Kelas** - Class (X, XI, XII)
- ✅ **Rombel** - Homeroom (A, B, C)
- ✅ **Angkatan** - Year (2024, 2025)
- ✅ **Points** - Total points earned
- ✅ **Level** - Current level

#### **How to Use:**

```
1. Click "⚙️ Columns (7)" button di kanan atas tabel
2. Check/uncheck kolom yang ingin ditampilkan
3. Settings otomatis tersimpan di localStorage
4. Click "Reset to Default" untuk kembalikan semua kolom
5. Click di luar dropdown untuk menutup
```

#### **Persistent Storage:**

```javascript
localStorage key: 'admin-students-columns'

Default value:
{
  code: true,
  name: true,
  kelas: true,
  rombel: true,
  angkatan: true,
  points: true,
  level: true
}
```

#### **UI Design:**

```
┌─────────────────────────────────────────────────────┐
│ 📚 Students List (40 of 62)                         │
│                                                     │
│               [⚙️ Columns (5)] [Items per page: 10]│
│                      ▼                              │
│               ┌──────────────┐                      │
│               │Show/Hide Cols│                      │
│               │☑ Code        │                      │
│               │☑ Name        │                      │
│               │☐ Kelas       │                      │
│               │☐ Rombel      │                      │
│               │☑ Angkatan    │                      │
│               │☑ Points      │                      │
│               │☑ Level       │                      │
│               │              │                      │
│               │[Reset Default]│                      │
│               └──────────────┘                      │
└─────────────────────────────────────────────────────┘
```

---

### 2. **Import Students** 📥

Import data siswa dari file CSV/Excel.

#### **Features:**

- ✅ Auto-generate `student_code` jika tidak ada
- ✅ Deteksi konflik (duplicate detection)
- ✅ Preview data sebelum import
- ✅ Smart import (add new only atau all)
- ✅ Pagination preview (10 items per page)

**Format CSV:**

```csv
student_name,kelas,rombel,angkatan,student_code,points,level
John Doe,XI,A,2024,JOHNDOEXIA2024,0,1
Jane Smith,XII,B,2023,,,
```

---

### 3. **Filters** 🔍

Filter siswa berdasarkan multiple criteria.

#### **Available Filters:**

- 🔎 **Search** - By name or code
- 📚 **Kelas** - X, XI, XII
- 🏠 **Rombel** - A, B, C, D
- 📅 **Angkatan** - 2023, 2024, 2025
- 🧹 **Clear All** - Reset semua filter

#### **Behavior:**

- Real-time search (onkeyup)
- Auto-reset to page 1 saat filter berubah
- Dropdown auto-populated dari database

---

### 4. **Pagination** 📄

Navigate data dengan efisien.

#### **Options:**

- Items per page: `10, 20, 30, 40, 50`
- Default: `10` items
- Page numbers: Max 5 visible
- Previous/Next buttons

#### **UI:**

```
[← Previous] [1] [2] [3] [4] [5] [Next →]

Page 3 of 12 • Total: 240 students
```

---

### 5. **Quick Stats** 📊

Display aggregated statistics.

```
┌─────────────────┬─────────────────┬─────────────────┐
│ 👥 Active       │ ⭐ Total Points │ 📊 Avg Points  │
│    Students     │                 │                 │
│       45        │      3,250      │       72        │
└─────────────────┴─────────────────┴─────────────────┘
```

---

## 🎯 Best Practices

### **Column Visibility:**

1. **Default**: All columns visible
2. **Mobile**: Hide Kelas, Rombel, Angkatan (show only Code, Name, Points, Level)
3. **Export**: Show all columns untuk data lengkap
4. **Presentation**: Hide Code, show Name + Stats only

### **Performance:**

- ✅ Server-side filtering & pagination
- ✅ Indexed database columns (kelas, rombel, angkatan)
- ✅ Lazy loading (only fetch visible page)
- ✅ Client-side state for UI preferences

### **UX:**

- ✅ Click outside to close dropdown
- ✅ Visual feedback (hover, active states)
- ✅ Badge counter shows visible columns
- ✅ Settings persist across sessions

---

## 🔧 Technical Implementation

### **Column Visibility State:**

```typescript
interface ColumnVisibility {
	code: boolean;
	name: boolean;
	kelas: boolean;
	rombel: boolean;
	angkatan: boolean;
	points: boolean;
	level: boolean;
}

let visibleColumns = $state<ColumnVisibility>(defaultColumns);
const visibleColumnCount = $derived(Object.values(visibleColumns).filter((v) => v).length);
```

### **Persist to localStorage:**

```typescript
function loadColumnSettings() {
	if (!browser) return;
	const saved = localStorage.getItem('admin-students-columns');
	if (saved) {
		visibleColumns = JSON.parse(saved);
	}
}

function saveColumnSettings() {
	if (!browser) return;
	localStorage.setItem('admin-students-columns', JSON.stringify(visibleColumns));
}
```

### **Toggle Column:**

```typescript
function toggleColumn(column: keyof ColumnVisibility) {
	visibleColumns[column] = !visibleColumns[column];
	saveColumnSettings(); // Auto-save
}
```

### **Click Outside Handler:**

```typescript
function handleClickOutside(event: MouseEvent) {
	const target = event.target as HTMLElement;
	if (!target.closest('.column-settings-container')) {
		showColumnSettings = false;
	}
}

$effect(() => {
	if (browser && showColumnSettings) {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}
});
```

### **Conditional Rendering:**

```svelte
<thead>
	<tr>
		{#if visibleColumns.code}
			<th>Code</th>
		{/if}
		{#if visibleColumns.name}
			<th>Name</th>
		{/if}
		<!-- ... other columns ... -->
	</tr>
</thead>
```

---

## 🚀 Future Enhancements

### **Planned Features:**

1. ⏳ **Column Reordering** - Drag & drop untuk ubah urutan kolom
2. ⏳ **Export to CSV** - Export dengan kolom yang visible saja
3. ⏳ **Saved Presets** - Simpan multiple column configurations
4. ⏳ **Inspect Student** - Detail view per siswa
5. ⏳ **Bulk Actions** - Edit/delete multiple students
6. ⏳ **Sort by Column** - Click header untuk sort

### **Mobile Optimization:**

1. ⏳ **Card View** - Alternative untuk tabel di mobile
2. ⏳ **Swipe Actions** - Quick actions di mobile
3. ⏳ **Responsive Columns** - Auto-hide certain columns di mobile

---

## 📖 Related Documentation

- [Import Students Guide](./IMPORT-STUDENTS-GUIDE.md)
- [Database Schema](./DATABASE.md)
- [Admin Features](./ADMIN-FEATURES.md)

---

**Last Updated:** October 14, 2025  
**Version:** 1.0.0  
**Feature Status:** ✅ Production Ready

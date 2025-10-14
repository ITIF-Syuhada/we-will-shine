# 📊 Students Table - Feature Documentation

## Overview

Halaman `/admin/students` menyediakan sistem manajemen siswa yang lengkap dengan filtering, pagination, import CSV, dan **column visibility settings**.

---

## ✨ Features

### 1. **Column Visibility Toggle** ⭐ NEW!

Memungkinkan admin untuk memilih kolom mana yang ingin ditampilkan pada tabel.

#### **Columns Available:**

- ✅ **Code** - Student code with copy button (KANAVIID2025)
- ✅ **Name** - Student name
- ✅ **Kelas** - Class (X, XI, XII)
- ✅ **Rombel** - Homeroom (A, B, C)
- ✅ **Angkatan** - Year (2024, 2025)
- ✅ **Points** - Total points earned
- ✅ **Level** - Current level
- ✅ **Actions** - Inspect button for detailed view ⭐ NEW!

#### **How to Use:**

```
1. Click "⚙️ Columns (8)" button di kanan atas tabel
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
  level: true,
  actions: true
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

### 6. **Student Detail Modal** 🔍 NEW!

View comprehensive student information in a professional modal.

#### **Features:**

- ✅ Student basic info (Kelas, Rombel, Angkatan, Join date)
- ✅ Stats cards (Points, Level, Activity score)
- ✅ Login history with device information
- ✅ Recent activities with timestamps
- ✅ Real-time data from database

#### **Login History Displays:**

- Browser & OS information
- IP address (optional)
- Active/Expired session status
- Login & logout timestamps
- Device type detection

#### **Recent Activities Shows:**

- Activity type (login, quiz, chat, achievement)
- Page URL visited
- Duration (in minutes)
- Points earned per activity
- Activity metadata (JSON)

#### **How to Use:**

```
1. Click "🔍 Inspect" button pada row student
2. Modal akan muncul dengan detail lengkap
3. Scroll untuk melihat login history & activities
4. Close dengan:
   • Click "Close" button
   • Press Escape key
   • Click outside modal (backdrop)
```

#### **Modal Features:**

- Sticky header & footer (always visible)
- Scrollable content area
- Backdrop blur effect
- Body scroll lock when open
- Keyboard navigation (Escape to close)
- Click outside to close
- Responsive grid layouts

---

### 7. **Copy Student Code** 📋 NEW!

Quick copy student codes to clipboard.

#### **Features:**

- Input field design (fixed width for consistency)
- SVG copy icon (no emoji)
- Visual feedback (checkmark for 2 seconds)
- Positioned at right edge of input
- Monospace font for codes

#### **How to Use:**

```
1. Hover over student code input field
2. Click clipboard icon on the right
3. Icon changes to checkmark (✓)
4. Code copied to clipboard!
```

---

### 8. **Activity Tracking System** 📊 NEW!

Comprehensive tracking system for student sessions and activities.

#### **Tracked Data:**

**Sessions:**

- Login timestamp
- Device information (browser, OS, device type)
- IP address
- Session status (active/expired)
- Logout timestamp
- Last activity timestamp

**Activities:**

- Activity type (login, quiz, chat, achievement, etc)
- Page URL
- Duration (seconds)
- Points earned
- Activity metadata (flexible JSON)
- Timestamps

#### **Database Tables:**

```sql
student_sessions         - Individual login sessions
student_activity_log     - Detailed activity tracking
student_login_stats      - Aggregated statistics
```

#### **How It Works:**

```
1. Student login via /unlock page
2. System creates session in database
3. Device info auto-detected & saved
4. Login activity logged
5. Session ID stored in localStorage
6. Future activities linked to session
7. Admin can view all data in Inspect modal
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

### 9. **Database Cleanup Script** 🧹 NEW!

Utility script untuk reset data dan remove duplicates.

#### **Features:**

- ✅ Remove duplicate students (keep oldest)
- ✅ Reset all points and levels to 0 and 1
- ✅ Clear all tracking data (sessions, activities, stats)
- ✅ Detailed logging of cleanup process

#### **Usage:**

```bash
npx tsx scripts/cleanup-students.ts
```

#### **What It Does:**

1. Fetch all students from database
2. Identify duplicates by student_code
3. Keep oldest entry, delete newer duplicates
4. Reset points: 0, level: 1 for all remaining students
5. Clear student_sessions table
6. Clear student_activity_log table
7. Clear student_login_stats table
8. Display summary statistics

#### **When to Use:**

- Fresh start with clean data
- Remove test/duplicate entries
- Reset tracking system
- Before major data migration
- After bulk import with issues

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
	actions: boolean; // NEW!
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

### **Copy to Clipboard:**

```typescript
let copiedCode = $state<string | null>(null);

async function copyCode(code: string) {
	if (!browser) return;
	try {
		await navigator.clipboard.writeText(code);
		copiedCode = code;
		setTimeout(() => {
			copiedCode = null;
		}, 2000);
	} catch (err) {
		console.error('Failed to copy:', err);
	}
}
```

### **Student Detail Modal:**

```typescript
// Modal state
let selectedStudent = $state<Student | null>(null);
let isModalOpen = $state(false);

// Open modal
function openStudentDetail(student: Student) {
	selectedStudent = student;
	isModalOpen = true;
}

// Close modal
function closeModal() {
	isModalOpen = false;
	setTimeout(() => {
		selectedStudent = null;
	}, 300); // Wait for animation
}
```

### **Activity Tracking Functions:**

```typescript
// Create session on login
const session = await db.createStudentSession(studentId, {
	browser: 'Chrome',
	os: 'Windows 10',
	deviceType: 'desktop',
	ipAddress: '192.168.1.100',
	userAgent: navigator.userAgent
});

// Log activity
await db.logStudentActivity(
	studentId,
	sessionId,
	'login',
	{ welcome_points: 50 },
	window.location.href
);

// Update session activity
await db.updateSessionActivity(sessionId);

// Close session on logout
await db.closeStudentSession(sessionId);
```

---

## 🚀 Future Enhancements

### **Implemented Features:**

1. ✅ **Column Visibility** - Toggle show/hide columns
2. ✅ **Copy Student Code** - One-click copy to clipboard
3. ✅ **Inspect Student** - Detailed modal view with login history & activities ⭐ NEW!
4. ✅ **Activity Tracking** - Real-time session and activity logging ⭐ NEW!

### **Planned Features:**

1. ⏳ **Column Reordering** - Drag & drop untuk ubah urutan kolom
2. ⏳ **Export to CSV** - Export dengan kolom yang visible saja
3. ⏳ **Saved Presets** - Simpan multiple column configurations
4. ⏳ **Bulk Actions** - Edit/delete multiple students
5. ⏳ **Sort by Column** - Click header untuk sort
6. ⏳ **Edit Student** - Update student data from modal

### **Mobile Optimization:**

1. ⏳ **Card View** - Alternative untuk tabel di mobile
2. ⏳ **Swipe Actions** - Quick actions di mobile
3. ⏳ **Responsive Columns** - Auto-hide certain columns di mobile

---

## 📖 Related Documentation

- [Import Students Guide](./IMPORT-STUDENTS-GUIDE.md) - CSV import process
- [Admin Structure](./ADMIN-STRUCTURE.md) - Admin portal architecture
- [Admin Guide](./ADMIN-GUIDE.md) - Admin dashboard usage
- [Ecosystem Vision](./ECOSYSTEM-VISION.md) - Overall system vision

## 🛠️ Maintenance Scripts

### Cleanup Script

```bash
# Remove duplicates and reset data
npx tsx scripts/cleanup-students.ts
```

### Database Migration

```bash
# Apply latest migrations
pnpx supabase db push --password 'YOUR_PASSWORD'
```

## 📊 Database Schema

### Tables Used:

- `students` - Main student data
- `student_sessions` - Login session tracking
- `student_activity_log` - Detailed activity logs
- `student_login_stats` - Aggregated statistics

### Key Indexes:

- `idx_students_kelas` - Fast filtering by class
- `idx_students_rombel` - Fast filtering by homeroom
- `idx_students_angkatan` - Fast filtering by year
- `idx_sessions_student` - Fast session lookups
- `idx_activity_student` - Fast activity lookups

---

**Last Updated:** October 14, 2025  
**Version:** 2.0.0  
**Feature Status:** ✅ Production Ready with Activity Tracking

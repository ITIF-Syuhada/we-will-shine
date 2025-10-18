# 🗺️ Routing Structure

> **Last Updated**: October 2025  
> **Version**: 2.0.0 (After Refactoring)

## 📋 Table of Contents

- [Overview](#overview)
- [URL Structure](#url-structure)
- [Session Management](#session-management)
- [Student Routes](#student-routes)
- [Admin Routes](#admin-routes)
- [Authentication Flow](#authentication-flow)
- [Migration Guide](#migration-guide)

---

## 🎯 Overview

Aplikasi **We Will Shine** menggunakan struktur routing yang intuitif dan aman dengan session-based authentication.

### Key Features

✅ **Clean URLs** - Tidak ada parameter code di URL  
✅ **Session-based Auth** - Student code disimpan di `sessionStorage`  
✅ **Intuitive Paths** - `/app` untuk siswa, `/dashboard` untuk admin  
✅ **Secure** - Session hilang saat tab ditutup

---

## 🌐 URL Structure

### Development

```
http://localhost:5173/
├── /                      ← Landing page
├── /unlock                ← Student login dengan code
├── /app/                  ← Student portal (authenticated)
│   ├── /app/              ← Home siswa
│   ├── /app/careers       ← Eksplorasi karir
│   ├── /app/careers/:id   ← Detail karir
│   ├── /app/quiz          ← Quiz kepribadian
│   ├── /app/achievements  ← Pencapaian siswa
│   ├── /app/dreams        ← Halaman impian
│   ├── /app/analytics     ← Analytics siswa
│   └── /app/ai-mentor     ← AI Mentor chat
│
└── /dashboard/            ← Admin panel (authenticated)
    ├── /dashboard/        ← Admin home
    ├── /dashboard/login   ← Admin login
    ├── /dashboard/overview      ← Student overview
    ├── /dashboard/students      ← Manage students
    ├── /dashboard/analytics     ← Platform analytics
    ├── /dashboard/settings      ← App settings
    ├── /dashboard/qr-generator  ← Generate QR codes
    └── /dashboard/migrate-codes ← Migrate student codes
```

### Production (GitHub Pages)

```
https://username.github.io/we-will-shine/
├── /we-will-shine/
├── /we-will-shine/unlock
├── /we-will-shine/app/
│   └── ... (same as development)
│
└── /we-will-shine/dashboard/
    └── ... (same as development)
```

---

## 🔐 Session Management

### Implementation

File: `src/lib/stores/session.ts`

```typescript
// Store student code
setStudentCode('NAYIKUVIIIC2025');

// Get student code
const code = getStudentCode(); // Returns: 'NAYIKUVIIIC2025'

// Check if logged in
const isLoggedIn = isStudentLoggedIn(); // Returns: true/false

// Clear session (logout)
clearStudentCode();
```

### Storage Details

- **Storage Type**: `sessionStorage` (not `localStorage`)
- **Key**: `student_code`
- **Lifetime**: Hingga tab/browser ditutup
- **Security**: Tidak tersimpan permanent, lebih aman

### Why sessionStorage?

✅ **Auto-expire** - Session hilang saat tab ditutup  
✅ **Privacy** - Tidak tersimpan permanent di device  
✅ **Security** - Lebih aman untuk data sensitif  
❌ **Tradeoff** - User harus login ulang setiap buka tab baru

---

## 👨‍🎓 Student Routes

### Base Path: `/app`

Semua route student menggunakan base path `/app/` tanpa parameter code.

### Route Groups

#### **(main)** - Main Features

```
src/routes/app/(main)/
├── +layout.svelte          ← Layout dengan navbar & header
├── +layout.ts              ← CSR only, no SSR
├── +page.svelte            ← Home page siswa
├── careers/
│   ├── +page.svelte        ← Daftar karir
│   └── [id]/
│       └── +page.svelte    ← Detail karir
├── quiz/
│   └── +page.svelte        ← Quiz kepribadian
├── achievements/
│   └── +page.svelte        ← Pencapaian
├── dreams/
│   └── +page.svelte        ← Halaman impian
└── analytics/
    └── +page.svelte        ← Analytics siswa
```

#### **(ai-mentor)** - AI Mentor

```
src/routes/app/(ai-mentor)/
└── ai-mentor/
    ├── +layout.svelte      ← Full-screen layout
    └── +page.svelte        ← AI Chat interface
```

### Layout Features

**Main Layout** (`(main)/+layout.svelte`):

- ✅ Dashboard Header (top)
- ✅ Dashboard Navbar (bottom)
- ✅ Session validation
- ✅ Auto-redirect jika tidak login

**AI Mentor Layout** (`(ai-mentor)/ai-mentor/+layout.svelte`):

- ✅ Full-screen mode
- ✅ No header/navbar
- ✅ Dedicated untuk chat experience

### Navigation Component

**DashboardNavbar** (`src/lib/components/DashboardNavbar.svelte`):

```svelte
<!-- Navigation items -->
<a href="{base}/app">Home</a>
<a href="{base}/app/careers">Karir</a>
<a href="{base}/app/ai-mentor">AI</a>
<a href="{base}/app/quiz">Quiz</a>
<a href="{base}/app/achievements">Trophy</a>
```

**Key Changes**:

- ❌ Tidak lagi menggunakan `$page.params.code`
- ✅ Semua link menggunakan static `/app` base path

---

## 👨‍💼 Admin Routes

### Base Path: `/dashboard`

Semua route admin menggunakan base path `/dashboard/`.

### Structure

```
src/routes/dashboard/
├── +layout.svelte          ← Admin layout dengan auth check
├── +page.svelte            ← Admin home (quick actions)
├── login/
│   └── +page.svelte        ← Admin login page
├── overview/
│   └── +page.svelte        ← Student overview & stats
├── students/
│   └── +page.svelte        ← Manage students (CRUD)
├── analytics/
│   └── +page.svelte        ← Platform analytics & insights
├── settings/
│   └── +page.svelte        ← App settings (AI API, DB, etc)
├── qr-generator/
│   └── +page.svelte        ← Generate student QR codes
└── migrate-codes/
    └── +page.svelte        ← Migrate student code formats
```

### Admin Authentication

**Layout** (`dashboard/+layout.svelte`):

```svelte
// Check if admin is logged in
if (!$adminStore) {
  goto(`${base}/dashboard/login`);
}
```

**Admin Store** (`src/lib/stores/admin.ts`):

- Username & password validation
- Session management
- Role-based access (future)

---

## 🔄 Authentication Flow

### Student Login Flow

```
┌─────────────┐
│   Landing   │
│   Page (/)  │
└──────┬──────┘
       │
       v
┌─────────────┐
│   Unlock    │  ← User input student code
│   /unlock   │
└──────┬──────┘
       │
       v
┌─────────────────────┐
│  Validate Code      │  ← Check di Supabase database
│  db.getStudent()    │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│  Save to Session    │  ← setStudentCode(code)
│  sessionStorage     │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│  Redirect to App    │  ← goto(`${base}/app`)
│  /app/              │
└─────────────────────┘
```

### App Layout Protection

```
┌─────────────┐
│  App Layout │
│  (onMount)  │
└──────┬──────┘
       │
       v
┌──────────────────┐
│  Check Session   │  ← getStudentCode()
│  & User Progress │
└──────┬───────────┘
       │
       ├── ✅ Valid → Continue
       │
       └── ❌ Invalid → Redirect to /unlock
```

### Admin Login Flow

```
┌─────────────────┐
│ Dashboard Login │  ← Username & password
│ /dashboard/login│
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Validate Auth  │  ← Check credentials
│  adminStore     │
└────────┬────────┘
         │
         v
┌─────────────────────┐
│  Set Admin Session  │  ← Save to store
│  localStorage       │
└────────┬────────────┘
         │
         v
┌─────────────────────┐
│ Redirect Dashboard  │  ← goto(`${base}/dashboard`)
│  /dashboard/        │
└─────────────────────┘
```

---

## 📦 Migration Guide

### From Old Structure (v1.x)

**Old URL Structure:**

```
/dashboard/[code]/          ← Student portal
/admin/                     ← Admin panel
```

**New URL Structure (v2.0):**

```
/app/                       ← Student portal
/dashboard/                 ← Admin panel
```

### Breaking Changes

#### 1. **Student Routes**

**Before:**

```svelte
<!-- Navigation dengan code parameter -->
<a href="{base}/dashboard/{$page.params.code}/careers"> Karir </a>

<!-- Redirect dengan code -->
goto(`${base}/dashboard/${code}/quiz`);
```

**After:**

```svelte
<!-- Navigation tanpa code parameter -->
<a href="{base}/app/careers"> Karir </a>

<!-- Redirect tanpa code -->
goto(`${base}/app/quiz`);
```

#### 2. **Admin Routes**

**Before:**

```svelte
<a href="{base}/admin/students">Students</a>
```

**After:**

```svelte
<a href="{base}/dashboard/students">Students</a>
```

#### 3. **Authentication**

**Before:**

```svelte
// Code di URL params const code = $page.params.code;
```

**After:**

```svelte
// Code di session import {getStudentCode} from '$lib/stores/session'; const code = getStudentCode();
```

### Update Checklist

- [ ] Update all navigation links
- [ ] Update all `goto()` redirects
- [ ] Update layout authentication checks
- [ ] Update components that use `$page.params.code`
- [ ] Test login flow
- [ ] Test navigation between pages
- [ ] Test logout/session clearing

---

## 🧪 Testing

### Manual Testing

1. **Student Login**

   ```
   1. Go to /unlock
   2. Enter student code
   3. Verify redirect to /app
   4. Check sessionStorage has 'student_code'
   ```

2. **Student Navigation**

   ```
   1. Click all navbar items
   2. Verify URLs don't have [code] parameter
   3. Verify navigation works correctly
   ```

3. **Session Persistence**

   ```
   1. Login as student
   2. Navigate to different pages
   3. Refresh page → Should stay logged in
   4. Close tab → Session should clear
   5. Open new tab → Should redirect to /unlock
   ```

4. **Admin Routes**
   ```
   1. Go to /dashboard/login
   2. Login with admin credentials
   3. Verify all admin routes accessible
   4. Verify URLs use /dashboard prefix
   ```

### Automated Testing

```bash
# Run development server
pnpm dev

# Test routes in browser
# Student: http://localhost:5173/app
# Admin: http://localhost:5173/dashboard

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## 📚 Related Documentation

- [Admin Guide](./ADMIN-GUIDE.md) - Panduan lengkap admin panel
- [Admin Structure](./ADMIN-STRUCTURE.md) - Struktur folder admin
- [Quick Start](./QUICK-START.md) - Getting started guide
- [Session Store](../src/lib/stores/session.ts) - Session management code

---

## 🔍 Troubleshooting

### Issue: "Redirect loop to /unlock"

**Cause**: Session tidak tersimpan dengan benar

**Solution**:

```typescript
// Check if sessionStorage is working
console.log(getStudentCode()); // Should return code

// Manually set code for testing
setStudentCode('TEST2025XXX');
```

### Issue: "Cannot read params.code"

**Cause**: Masih menggunakan old routing pattern

**Solution**: Update code untuk tidak menggunakan `$page.params.code`

```svelte
// ❌ Old const code = $page.params.code; // ✅ New import {getStudentCode} from '$lib/stores/session';
const code = getStudentCode();
```

### Issue: "Admin routes not working"

**Cause**: Masih menggunakan `/admin/` prefix

**Solution**: Update semua link ke `/dashboard/`

```svelte
// ❌ Old
<a href="{base}/admin/students">

// ✅ New
<a href="{base}/dashboard/students">
```

---

## 📝 Notes

- Session menggunakan `sessionStorage`, bukan `localStorage`
- Student code tidak pernah muncul di URL (lebih aman)
- Semua route student menggunakan `/app` base path
- Semua route admin menggunakan `/dashboard` base path
- Layout groups `(main)` dan `(ai-mentor)` untuk organization

---

**Maintained by**: IT Team We Will Shine  
**Last Review**: October 2025  
**Status**: ✅ Active & Production-Ready

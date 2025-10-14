# 📐 Admin Portal Structure Guide

Dokumentasi struktur dan pattern yang digunakan di Admin Portal untuk konsistensi dan maintainability.

## 🏗️ File Structure

```
/admin
├── +layout.svelte           # Centralized auth, header, navigation
├── +page.svelte             # Main dashboard with quick actions
├── login/+page.svelte       # Authentication page
├── overview/+page.svelte    # Dashboard with charts & leaderboards
├── settings/+page.svelte    # AI API & system configuration
├── analytics/+page.svelte   # Platform metrics & charts
├── students/+page.svelte    # Student management with tracking
├── qr-generator/+page.svelte# QR code generation
├── migrate-codes/+page.svelte# Student code migration tool
└── auth/+page.svelte        # Admin management (coming soon)
```

## 🎨 Standard Page Structure

Semua halaman admin mengikuti pattern yang sama:

```svelte
<script lang="ts">
  // Imports
  // State management
  // Functions
</script>

<svelte:head>
  <title>{Page Title} - Admin</title>
</svelte:head>

<div class="space-y-6 pb-6">
  <!-- Page Header -->
  <div class="rounded-2xl border-2 border-{color}-200 bg-gradient-to-br from-{color}-100 to-{color2}-100 p-6 shadow-lg">
    <h1 class="text-2xl font-bold text-{color}-800">{Icon} {Page Title}</h1>
    <p class="text-sm text-{color}-600">{Page description}</p>
  </div>

  <!-- Page Content Sections -->
  <div class="rounded-2xl border-2 border-{color}-200 bg-white p-6 shadow-lg">
    <!-- Section content -->
  </div>
</div>
```

## 🎨 Color Scheme per Page

| Page         | Primary Color | Gradient                | Icon |
| ------------ | ------------- | ----------------------- | ---- |
| Dashboard    | Purple        | purple-100 → pink-100   | 🏠   |
| Overview     | Purple        | purple-100 → pink-100   | 📊   |
| Analytics    | Purple        | purple-100 → pink-100   | 📈   |
| Students     | Green         | green-100 → emerald-100 | 👥   |
| QR Generator | Blue          | blue-100 → cyan-100     | 📱   |
| Settings     | Purple        | purple-100 → pink-100   | ⚙️   |

## 📦 Common Components

### Page Header Pattern

```svelte
<div
	class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-lg"
>
	<h1 class="text-2xl font-bold text-purple-800">📊 Page Title</h1>
	<p class="text-sm text-purple-600">Description text</p>
</div>
```

### Content Card Pattern

```svelte
<div class="rounded-2xl border-2 border-{color}-200 bg-white p-6 shadow-lg">
	<h2 class="mb-4 text-lg font-bold text-gray-800">Section Title</h2>
	<!-- Content -->
</div>
```

### Stat Card Pattern

```svelte
<div class="rounded-xl border-2 border-blue-200 bg-white p-4 shadow-md">
	<div class="mb-2 text-3xl">👥</div>
	<div class="text-sm text-gray-600">Label</div>
	<div class="text-2xl font-bold text-blue-600">{value}</div>
</div>
```

### Action Button Pattern

```svelte
<button
	onclick={handleAction}
	class="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
>
	✨ Action Text
</button>
```

## 🔐 Authentication Flow

### Layout (+layout.svelte)

- Centralized authentication check di `onMount`
- Redirect ke `/admin/login` jika belum login
- Skip auth check untuk `/admin/login` page
- Shared header & navigation untuk semua pages

### Page Components

- **Tidak perlu** auth check di setiap page
- **Tidak perlu** header/logout button (handled by layout)
- Fokus hanya pada page-specific logic

## 📊 Data Management

### Supabase Pages (Database-driven)

- `overview/+page.svelte` - Uses `db.getAllStudents()` with charts & leaderboards
- `students/+page.svelte` - Uses `db.getStudentsWithFilter()` with pagination
- `analytics/+page.svelte` - Uses `db.getStudentAnalytics()`
- `migrate-codes/+page.svelte` - Uses `db.getAllStudents()` for code migration

### Activity Tracking

- `StudentDetailModal.svelte` - Uses `db.getStudentDetailData()`
  - `db.getStudentSessions()` - Login history
  - `db.getStudentActivities()` - Activity logs
  - `db.getStudentLoginStats()` - Aggregated stats

### Local Data Pages

- `qr-generator/+page.svelte` - Uses `db.getAllStudents()` from Supabase

### Settings Store

- `settings/+page.svelte` - Uses `appSettings` store + localStorage
- AI configuration (API keys, providers)
- Database connection testing
- API integration (PT Koneksi)
- Persisted to localStorage
- Shared across entire app

## 🎯 Design Principles

### 1. **Consistency**

- Semua pages menggunakan spacing yang sama (`space-y-6 pb-6`)
- Header pattern yang seragam
- Color scheme yang konsisten per section

### 2. **Clarity**

- Clear page titles dengan emoji icons
- Descriptive subtitles
- Visual hierarchy dengan proper sizing

### 3. **Responsiveness**

- Grid layouts untuk berbagai screen sizes
- Mobile-first approach
- Touch-friendly buttons

### 4. **Accessibility**

- Proper semantic HTML
- High contrast text
- Clear focus states

### 5. **Performance**

- Lazy loading where appropriate
- Optimized re-renders dengan Svelte `$derived`
- Efficient data fetching

## 🚀 Adding New Admin Pages

### Step 1: Create Page File

```bash
touch src/routes/admin/new-page/+page.svelte
```

### Step 2: Use Standard Template

```svelte
<script lang="ts">
	// Your imports and logic
</script>

<svelte:head>
	<title>New Page - Admin</title>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-lg"
	>
		<h1 class="text-2xl font-bold text-purple-800">🆕 New Page</h1>
		<p class="text-sm text-purple-600">Page description</p>
	</div>

	<!-- Content -->
</div>
```

### Step 3: Add to Navigation

Update `src/routes/admin/+layout.svelte`:

```svelte
const navItems = [
  // ... existing items
  { path: '/new-page', icon: '🆕', label: 'New Page' }
];
```

### Step 4: Update Dashboard

Add quick action card di `src/routes/admin/+page.svelte`

## 📝 Code Style Guidelines

### TypeScript

- Use `$state` for reactive local state
- Use `$derived` for computed values
- Proper typing for all variables
- Use interfaces for complex types

### CSS/Tailwind

- Use Tailwind utility classes
- Consistent spacing scale
- Color consistency per section
- Responsive modifiers (`sm:`, `lg:`)

### Component Organization

```svelte
<script lang="ts">
	// 1. Imports
	// 2. Props (if any)
	// 3. State variables
	// 4. Derived/computed values
	// 5. Functions
	// 6. Lifecycle (onMount, etc)
</script>

<svelte:head>
	<!-- Meta tags, title -->
</svelte:head>

<!-- Template markup -->
```

## 🔧 Maintenance Tips

### When Updating a Page:

1. ✅ Keep the standard structure
2. ✅ Use existing color schemes
3. ✅ Follow spacing patterns
4. ✅ Test responsiveness
5. ✅ Check accessibility

### When Adding Features:

1. ✅ Consider reusability (extract components if needed)
2. ✅ Maintain consistency with existing pages
3. ✅ Update documentation
4. ✅ Test across all admin pages

### When Refactoring:

1. ✅ Update all pages simultaneously
2. ✅ Run format & lint
3. ✅ Test navigation flow
4. ✅ Verify authentication

## 📚 Related Documentation

- [ADMIN_SETUP.md](../ADMIN_SETUP.md) - Setup instructions
- [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) - Database setup
- [ROADMAP.md](../ROADMAP.md) - Future features

---

**Last Updated:** October 2025
**Status:** ✅ Standardized & Production Ready

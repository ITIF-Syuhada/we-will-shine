# Changelog

All notable changes to We Will Shine - Career Quest project.

**Created by:** [@sandikodev](https://github.com/sandikodev)  
_"Atas rasa syukur telah mendapat kesempatan mengajar anak-anak SMP IT Masjid Syuhada yang soleh dan solehah"_

---

## [2.0.0] - 2025-10-18

### 🎯 BREAKING CHANGES - Routing Refactoring

#### Refactored - URL Structure

**Major routing overhaul untuk URL yang lebih intuitif dan aman:**

**Student Routes:**

- ❌ **OLD**: `/dashboard/[code]/` - Code sebagai URL parameter
- ✅ **NEW**: `/app/` - Clean URL tanpa code parameter
- 💾 **NEW**: Student code tersimpan di `localStorage` dengan auto-expiry 7 hari

**Admin Routes:**

- ❌ **OLD**: `/admin/`
- ✅ **NEW**: `/dashboard/`

**Why This Change?**

- ✅ **Cleaner URLs** - No more long codes in browser address bar
- ✅ **Better Security** - Code not exposed in URL (history, screenshots, etc)
- ✅ **More Intuitive** - `/app` clearly indicates student portal
- ✅ **Professional** - `/dashboard` is industry standard for admin panel

#### Added - Session Management

**New Session Store** (`src/lib/stores/session.ts`):

```typescript
// Core functions
setStudentCode(code: string)         // Save to localStorage with 7-day expiry
getStudentCode(): string             // Retrieve & auto-validate expiry
clearStudentCode()                   // Logout/clear session
isStudentLoggedIn(): boolean         // Check login status
getSessionInfo(): SessionData | null // Get full session data (debug)
getSessionRemainingTime(): number    // Get remaining time in ms
```

**Features:**

- ✅ Writable Svelte store + localStorage sync
- ✅ Auto-expiry after 7 days (configurable)
- ✅ Automatic expired session cleanup
- ✅ Timestamp validation for security
- ✅ Persistent across tabs/windows
- ✅ Type-safe with TypeScript
- ✅ Works seamlessly with SvelteKit

#### Modified - Authentication Flow

**Unlock Page** (`src/routes/unlock/+page.svelte`):

- ✅ Now saves code to `localStorage` (7-day expiry) via `setStudentCode()`
- ✅ Redirects to `/app` instead of `/dashboard/[code]`

**App Layout** (`src/routes/app/(main)/+layout.svelte`):

- ✅ Checks session via `getStudentCode()` instead of URL params
- ✅ Auto-redirects to `/unlock` if session invalid
- ✅ No more dependency on `$page.params.code`

**Homepage** (`src/routes/+page.svelte`):

- ✅ Redirects logged-in users to `/app` instead of `/dashboard/[code]`

#### Modified - Navigation Components

**DashboardNavbar** (`src/lib/components/DashboardNavbar.svelte`):

- ✅ Base path changed from `/dashboard/${code}` to `/app`
- ✅ All nav links updated:
  - `/app` - Home
  - `/app/careers` - Karir
  - `/app/ai-mentor` - AI
  - `/app/quiz` - Quiz
  - `/app/achievements` - Trophy

**Admin Panel** (all admin pages):

- ✅ All routes moved from `/admin/*` to `/dashboard/*`
- ✅ Updated links in:
  - `/dashboard/+page.svelte` - Admin home
  - `/dashboard/+layout.svelte` - Admin layout
  - `/dashboard/overview/+page.svelte` - Overview page
  - `/dashboard/settings/+page.svelte` - Settings page

#### Fixed - Linter Errors

- ✅ Removed unused `update` from session store
- ✅ Removed unused `studentCode` import from layout
- ✅ Removed unused `page` import from careers & quiz pages
- ✅ All TypeScript errors resolved

#### Added - Documentation

**New Documentation:**

- 📄 `docs/ROUTING-STRUCTURE.md` - Complete routing guide
  - URL structure (dev & production)
  - Session management API
  - Authentication flow diagrams
  - Migration guide from v1.x
  - Troubleshooting guide

**Updated Documentation:**

- 📄 `README.md` - Added URL structure section
- 📄 `README.md` - Added routing documentation link

#### Technical Details

**Files Renamed (git mv):**

```
src/routes/dashboard/ → src/routes/app/
src/routes/admin/     → src/routes/dashboard/
```

**Folder Structure Changes:**

```
Before:
src/routes/
├── dashboard/(main)/[code]/    ← Student routes
└── admin/                      ← Admin routes

After:
src/routes/
├── app/(main)/                 ← Student routes (no [code])
└── dashboard/                  ← Admin routes
```

**Route Groups:**

- `(main)` - Student features dengan navbar
- `(ai-mentor)` - AI chat full-screen mode

#### Migration Guide

**For Developers:**

1. **Update Navigation Links:**

   ```svelte
   <!-- OLD -->
   <a href="{base}/dashboard/{$page.params.code}/careers">

   <!-- NEW -->
   <a href="{base}/app/careers">
   ```

2. **Update Redirects:**

   ```typescript
   // OLD
   goto(`${base}/dashboard/${code}/quiz`);

   // NEW
   goto(`${base}/app/quiz`);
   ```

3. **Update Authentication Checks:**

   ```typescript
   // OLD
   const code = $page.params.code;

   // NEW
   import { getStudentCode } from '$lib/stores/session';
   const code = getStudentCode();
   ```

**For Users:**

- ⚠️ **Breaking**: Existing bookmarks dengan `/dashboard/[code]` tidak akan work
- ✅ **Solution**: Users harus login ulang via `/unlock`
- ✅ Session auto-expires saat tab ditutup (lebih aman)

#### Benefits

✅ **Security** - Code tidak lagi terexpose di URL  
✅ **Privacy** - Session auto-clear saat tab ditutup  
✅ **UX** - Cleaner, more professional URLs  
✅ **Maintainability** - Easier to manage routes  
✅ **Standards** - Follows industry best practices

#### Statistics

- 📦 **24 files changed** (20 renamed, 4 modified, 1 new)
- ➕ **98 insertions** | ➖ **40 deletions**
- ✅ **Zero linter errors**
- ✅ **Zero TypeScript errors**
- ✅ **Build successful**

---

## [1.0.0] - 2025-10-13

### 🎉 Initial Release - Complete Application

#### Added - Student App

**Core Features:**

- Landing page dengan welcome screen
- Unlock system dengan 22 kode unik (INSPIRE2025XXX format)
- Personal dashboard dengan progress tracking
- 8 Karir Teknologi lengkap dengan nilai Islam:
  - Software Developer
  - UI/UX Designer
  - Data Analyst
  - Digital Marketing Specialist
  - Cybersecurity Specialist
  - AI/ML Engineer
  - Content Creator & Educator
  - Islamic Tech Entrepreneur
- Personality Quiz (6 pertanyaan) dengan motivasi personal
- AI Mentor Chat dengan contextual responses
- Dream Board dengan CRUD operations
- Achievement System (8 achievements)
- Gamifikasi: Points, Levels, Progress bars

**Data Files:**

- `src/lib/data/students.ts` - 22 siswa SMP IT Masjid Syuhada
- `src/lib/data/careers.ts` - 8 profesi detail
- `src/lib/data/questionnaire.ts` - 6 quiz questions
- `src/lib/data/motivations.ts` - Personal motivation generator
- `src/lib/data/achievements.ts` - 8 achievement definitions

**State Management:**

- `src/lib/stores/user.ts` - Svelte stores dengan localStorage persistence
- Auto-save progress
- Derived stores untuk computed values

#### Added - Admin Panel

**Admin Features:**

- Admin login dengan password protection
- Dashboard overview dengan quick stats
- Students management (list, search, filter, track progress)
- Analytics & reporting (engagement, leaderboard, popularity)
- QR Code generator untuk sticker coklat (purple-themed)
- CSV export untuk data analysis
- Print-optimized sticker layout

**Admin Routes:**

- `/admin` - Login page
- `/admin/dashboard` - Overview
- `/admin/students` - Student management
- `/admin/analytics` - Reports & analytics
- `/admin/qr-generator` - QR generation

**Dependencies Added:**

- `@supabase/supabase-js` - Ready for backend integration
- `qrcode` - QR code generation

#### Design System

**Color Palette - Soft & Playful:**

- Soft Purple (#A78BFA) - Primary
- Soft Pink (#F9A8D4) - Secondary
- Soft Blue (#93C5FD) - Accent
- Soft Green (#86EFAC) - Success
- Soft Yellow (#FDE68A) - Warning
- Multi-color gradient background

**UI Components:**

- Rounded corners (rounded-xl, rounded-2xl, rounded-3xl)
- Soft borders (border-2) dengan pastel colors
- Gentle shadows (shadow-sm, shadow-md, shadow-xl)
- Smooth transitions & hover effects
- Mobile-optimized spacing

**Typography:**

- Mobile: text-xs, text-[10px], text-[11px]
- Desktop: text-sm to text-2xl
- Responsive font scaling

#### Mobile Optimization

**Bottom Navigation:**

- Fixed sticky navbar (Instagram/WhatsApp style)
- 5 main menus: Home, Karir, AI, Quiz, Trophy
- Touch-friendly button sizes
- Active state dengan gradient background
- Icon-first dengan labels

**Compact Layout:**

- Super compact header (py-2, smaller icons)
- Quote: full width horizontal layout
- Karir/Mood/Impian: 1 row (grid-cols-3)
- Optimized spacing & typography
- Minimal padding untuk max content

#### Testing

**Playwright E2E Tests:**

- Navigation tests (`tests/navigation.spec.ts`)
- Sverdle game tests (`tests/sverdle.spec.ts`)
- Coverage: routing, interactions, localStorage

**CI/CD:**

- GitHub Actions workflow untuk testing
- Auto-deploy ke GitHub Pages
- Test reports sebagai artifacts

#### Documentation

**Docs Created:**

- `docs/ADMIN-GUIDE.md` - Admin panel documentation
- `docs/CAREER-QUEST-APP.md` - Application features
- `docs/DEVELOPMENT-JOURNEY.md` - Development process & timeline
- `docs/ROADMAP.md` - **Future development roadmap (Phase 2-6, Vision 2027)**
- `docs/SUPABASE-MIGRATION-GUIDE.md` - Upgrade localStorage → Supabase Database
- `docs/FIX-SVERDLE-404.md` - Technical fix details
- `docs/TESTING-GUIDE.md` - Testing guidelines
- `docs/WORKFLOWS-GUIDE.md` - GitHub Actions guide
- `README.md` - Updated dengan features overview

### Fixed

**Sverdle 404 Error:**

- Mengubah halaman Sverdle dari server-side (cookies) menjadi client-side only (localStorage)
- Enable prerendering untuk static HTML generation
- Compatible dengan GitHub Pages static hosting

**TypeScript Errors:**

- Fix nullable types di career detail page
- Add proper type interfaces untuk admin
- Remove unused variables

**Linter Issues:**

- Add keys untuk #each blocks
- Fix class ordering (Tailwind)
- Remove unused imports

### Changed

**Layout & Navigation:**

- Hapus layout bawaan SvelteKit (Header/Footer default)
- Implement bottom navbar untuk mobile
- Improve active route detection logic

**Wording:**

- "Bu Guru" → "Ustadz & Ustadzah" (universal)
- Hapus mention "7D Putri" di UI (applicable untuk semua kelas)

**Color Scheme:**

- Purple-600 → Purple-100/200 (soft pastels)
- Pink-500 → Pink-50/100 (gentle)
- Background: Multi-color soft gradient
- Borders: Tipis dengan warna pastel

**Performance:**

- Optimized bundle size (~600KB)
- Lazy loading images
- Minimal re-renders dengan Svelte 5 runes

### Technical Details

**Stack:**

- SvelteKit 2.0 (Svelte 5)
- TailwindCSS 4.x
- TypeScript
- Playwright (E2E testing)
- GitHub Pages (deployment)

**Architecture:**

- Client-side only (SSR=false untuk dashboard)
- LocalStorage untuk persistence
- Svelte stores untuk state management
- Static site generation (SSG)

**Browser Support:**

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive: Mobile-first design

### Deployment

**Live URLs:**

- Student App: `https://itif-syuhada.github.io/we-will-shine/`
- Admin Panel: `https://itif-syuhada.github.io/we-will-shine/admin`

**Deployment Process:**

- Push to `main` branch
- GitHub Actions runs tests
- Build static site
- Deploy to GitHub Pages
- Live dalam ~3-5 menit

### Security

**Admin:**

- Simple password protection (localStorage)
- Password default: `WeWillShine2025!`
- Session persistence

**Student Data:**

- Client-side storage (localStorage)
- Privacy-friendly (no server storage)
- No sensitive data collected

### Known Limitations

**Current (LocalStorage):**

- Admin analytics limited to single device
- No real-time sync across devices
- Data not backed up to cloud

**Workaround:**

- Use same device untuk admin
- Atau upgrade ke Supabase untuk real database

### Future Enhancements

See `docs/DEVELOPMENT-JOURNEY.md` untuk detailed roadmap.

**Planned:**

- [ ] Supabase integration
- [ ] Real AI (Gemini/OpenAI)
- [ ] Multi-class support
- [ ] Advanced analytics
- [ ] Social features

---

## [0.0.1] - 2025-10-12

### Added

- Initial SvelteKit setup
- GitHub Pages configuration
- Sverdle demo game
- About page
- Basic routing

---

**For detailed development journey, see:** `docs/DEVELOPMENT-JOURNEY.md`  
**For admin guide, see:** `docs/ADMIN-GUIDE.md`  
**For app features, see:** `docs/CAREER-QUEST-APP.md`

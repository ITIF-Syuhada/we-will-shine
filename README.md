# 🌟 We Will Shine - Career Quest

Aplikasi web interaktif untuk eksplorasi karir teknologi dengan perspektif Islam, dibuat sebagai hadiah penuh cinta dari Ustadz & Ustadzah untuk siswa-siswi SMP IT Masjid Syuhada.

## ✨ Tentang Project

**We Will Shine** adalah aplikasi Career Quest yang membantu siswa:

- 🎯 Mengeksplorasi 8 karir teknologi masa depan
- 🧠 Memahami kepribadian melalui quiz interaktif
- 🤖 Belajar dengan AI Mentor
- ✨ Merencanakan impian melalui Dream Board
- 🏆 Termotivasi dengan gamifikasi (points, levels, achievements)
- ☪️ Memahami nilai Islam dalam setiap profesi

**Origin Story:** Hadiah balasan untuk siswa yang memberikan sepatu kepada guru - bukan hanya coklat manis, tapi juga aplikasi yang memberi nilai edukatif untuk masa depan mereka.

---

## 🎯 Features

### **Student App:**

- ✅ **Unlock System** - Login dengan kode unik dari coklat
- ✅ **8 Karir Teknologi** - Software Dev, UI/UX, Data Analyst, AI/ML, dll
- ✅ **Personality Quiz** - 6 pertanyaan dengan motivasi personal 300+ kata
- ✅ **AI Mentor** - Chat interaktif untuk guidance
- ✅ **Dream Board** - Tulis & track impian masa depan
- ✅ **Gamifikasi** - Points, levels, 8 achievements
- ✅ **Mobile-Optimized** - Bottom navbar, compact layout

### **Admin Panel:**

- ✅ **Students Management** - Track 22 siswa & progress
- ✅ **Analytics** - Engagement, leaderboard, career popularity
- ✅ **QR Generator** - Generate QR codes untuk sticker coklat
- ✅ **Export Data** - Download CSV untuk reporting

---

## 🚀 Quick Start

Project SvelteKit yang dikonfigurasi untuk deployment ke GitHub Pages.

## 🚀 Cara Deploy ke GitHub Pages

### 1. Persiapan Repository GitHub

1. Buat repository baru di GitHub dengan nama **we-will-shine**
2. Push project ini ke repository GitHub:

```sh
git init
git add .
git commit -m "Initial commit: SvelteKit with GitHub Pages setup"
git branch -M main
git remote add origin https://github.com/USERNAME/we-will-shine.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda.

### 2. Konfigurasi GitHub Pages

1. Buka repository di GitHub
2. Pergi ke **Settings** > **Pages**
3. Pada **Source**, pilih **GitHub Actions**

### 3. Update Base Path (Jika Diperlukan)

Jika nama repository GitHub Anda berbeda dari `we-will-shine`, update file `svelte.config.js`:

```js
paths: {
	base: process.env.NODE_ENV === 'production' ? '/nama-repository-anda' : '';
}
```

### 4. Deploy Otomatis

Setiap kali Anda push ke branch `main`, GitHub Actions akan otomatis:

- Build aplikasi SvelteKit
- Deploy ke GitHub Pages

Website akan tersedia di: `https://USERNAME.github.io/we-will-shine/`

## 💻 Development Lokal

Install dependencies:

```sh
pnpm install
```

Jalankan development server:

```sh
pnpm run dev

# atau buka di browser secara otomatis
pnpm run dev --open
```

## 🏗️ Build Manual

Untuk membuat production build:

```sh
pnpm run build
```

Preview production build:

```sh
pnpm run preview
```

## 🧪 Testing

Jalankan end-to-end tests dengan Playwright:

```sh
# Run tests headless
pnpm run test:e2e

# Run tests dengan UI mode (interactive)
pnpm run test:e2e:ui
```

Test coverage meliputi:

- ✅ Navigation antar halaman
- ✅ Sverdle game functionality (keyboard input, game state, localStorage)
- ✅ Halaman About dan How-to-play

## 📁 Struktur Project

- `src/routes/` - Halaman dan routing aplikasi
- `static/` - File static (favicon, images, dll)
- `.github/workflows/` - GitHub Actions workflow untuk deployment
- `svelte.config.js` - Konfigurasi SvelteKit dengan adapter-static

## 🔧 Konfigurasi Penting

### svelte.config.js

- Menggunakan `@sveltejs/adapter-static` untuk static site generation
- Base path disesuaikan untuk GitHub Pages
- Fallback ke `404.html` untuk SPA routing

### src/routes/+layout.ts

- `prerender: true` - Pre-render semua halaman
- `trailingSlash: 'always'` - Tambahkan trailing slash untuk kompatibilitas

### static/.nojekyll

- File ini mencegah GitHub Pages menggunakan Jekyll
- Penting untuk file/folder yang dimulai dengan underscore

## 🛠️ Troubleshooting

### CSS/JS tidak load

Pastikan base path di `svelte.config.js` sesuai dengan nama repository.

### 404 saat refresh halaman

Pastikan `fallback: '404.html'` ada di konfigurasi adapter.

### Build gagal di GitHub Actions

Periksa log di tab **Actions** di repository GitHub Anda.

### Halaman dengan server-side logic tidak berfungsi di GitHub Pages

GitHub Pages hanya mendukung static files. Halaman yang menggunakan:

- Server actions (form actions)
- Server-side rendering (SSR)
- Cookies atau session

Harus diubah menjadi client-side only:

1. Hapus `+page.server.ts` atau set `export const ssr = false`
2. Set `export const prerender = true` di `+page.ts`
3. Gunakan localStorage atau client-side state management
4. Verifikasi dengan `pnpm run build` bahwa file `.html` ter-generate di folder `build/`

**Contoh**: Halaman Sverdle sudah diperbaiki dari server-side (cookies) menjadi client-side (localStorage). Lihat `CHANGELOG.md` untuk detail.

## 📚 Dokumentasi Project

### **Guides untuk Tim:**

- 📖 [Development Journey](docs/DEVELOPMENT-JOURNEY.md) - Complete development timeline & decisions
- 🗺️ [Project Roadmap](docs/ROADMAP.md) - **Future plans & feature ideas (Phase 2-6)**
- 🎓 [Admin Guide](docs/ADMIN-GUIDE.md) - Panduan menggunakan admin dashboard
- 📱 [Career Quest App](docs/CAREER-QUEST-APP.md) - Student app features & usage
- 🔄 [Supabase Migration](docs/SUPABASE-MIGRATION-GUIDE.md) - Upgrade localStorage → Database
- 🧪 [Testing Guide](docs/TESTING-GUIDE.md) - Playwright E2E testing
- 🔧 [Fix Sverdle 404](docs/FIX-SVERDLE-404.md) - Technical fix documentation
- ⚙️ [Workflows Guide](docs/WORKFLOWS-GUIDE.md) - GitHub Actions & CI/CD

### **External Docs:**

- [SvelteKit](https://kit.svelte.dev/)
- [adapter-static](https://kit.svelte.dev/docs/adapter-static)
- [GitHub Pages](https://docs.github.com/en/pages)
- [Supabase](https://supabase.com/docs)

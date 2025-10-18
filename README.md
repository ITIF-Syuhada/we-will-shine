# 🌟 We Will Shine - Career Quest

Aplikasi web interaktif untuk eksplorasi karir teknologi dengan perspektif Islam, dibuat sebagai hadiah penuh cinta dari Ustadz & Ustadzah untuk siswa-siswi SMP IT Masjid Syuhada.

## ✨ Tentang Project

**We Will Shine** adalah platform career guidance & student wellbeing yang membantu siswa:

- 🎯 Mengeksplorasi 8 karir teknologi masa depan
- 🧠 Memahami kepribadian melalui quiz interaktif
- 🤖 Belajar dengan AI Mentor
- ✨ Merencanakan impian melalui Dream Board
- 🏆 Termotivasi dengan gamifikasi (points, levels, achievements)
- ☪️ Memahami nilai Islam dalam setiap profesi

### **Origin Story:**

Project ini **diinisiasi dan digagas oleh [sandikodev](https://github.com/sandikodev)** atas rasa syukur telah mendapat kesempatan untuk mengajar anak-anak SMP IT Masjid Syuhada yang soleh dan solehah.

Berawal dari hadiah sepatu yang diberikan siswa kepada guru, project ini menjadi hadiah balasan - bukan hanya coklat manis, tapi aplikasi yang memberi nilai edukatif untuk masa depan mereka. Sebuah bentuk terima kasih yang berbuah manfaat berkelanjutan. 💝

### **🌍 Our Vision: Free & Open Source for All Schools**

We Will Shine akan menjadi **platform open source** untuk membantu Guru BK di seluruh Indonesia:

- 💝 Memberikan siswa **tempat aman untuk curhat**
- 🤖 **AI yang peduli** sebagai teman bicara
- 📊 **Data insights** untuk Guru BK (privacy-first)
- 🏫 **100% gratis** untuk semua sekolah
- 🌟 **Open source** - dikembangkan bersama komunitas

→ Read full vision: [Open Source Vision](docs/OPEN-SOURCE-VISION.md) | [Ethics Framework](docs/ETHICS-FRAMEWORK.md)

---

## 🎯 Features

### **Student App** (`/app`):

- ✅ **Unlock System** - Login dengan kode unik dari coklat
- ✅ **Session-based Auth** - Code tersimpan di sessionStorage (secure)
- ✅ **8 Karir Teknologi** - Software Dev, UI/UX, Data Analyst, AI/ML, dll
- ✅ **Personality Quiz** - 6 pertanyaan dengan motivasi personal 300+ kata
- ✅ **AI Mentor** - Chat interaktif untuk guidance
- ✅ **Dream Board** - Tulis & track impian masa depan
- ✅ **Gamifikasi** - Points, levels, 8 achievements
- ✅ **Mobile-Optimized** - Bottom navbar, compact layout
- ✅ **Clean URLs** - Tidak ada code parameter di URL

### **Admin Panel** (`/dashboard`):

- ✅ **Students Management** - Track 22 siswa & progress
- ✅ **Analytics** - Engagement, leaderboard, career popularity
- ✅ **QR Generator** - Generate QR codes untuk sticker coklat
- ✅ **Export Data** - Download CSV untuk reporting
- ✅ **Column Visibility** - Customize table columns display

---

## 🗺️ URL Structure

### Development

```
http://localhost:5173/
├── /               ← Landing page
├── /unlock         ← Student login (dengan code)
├── /app/           ← Student portal ⭐
│   ├── /careers    ← Eksplorasi karir
│   ├── /quiz       ← Quiz kepribadian
│   ├── /achievements ← Pencapaian
│   └── /ai-mentor  ← AI chat
└── /dashboard/     ← Admin panel ⭐
    ├── /students   ← Manage students
    ├── /analytics  ← Analytics
    └── /settings   ← Configuration
```

→ Dokumentasi lengkap: [Routing Structure](docs/ROUTING-STRUCTURE.md)

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
- 🗺️ [Project Roadmap](docs/ROADMAP.md) - **Future plans (Phase 2-8, Vision 2030)**
- 🌍 [Open Source Vision](docs/OPEN-SOURCE-VISION.md) - **Free platform untuk semua sekolah**
- 🔒 [Ethics Framework](docs/ETHICS-FRAMEWORK.md) - **Privacy & ethical AI guidelines**
- 🎓 [Admin Guide](docs/ADMIN-GUIDE.md) - Panduan menggunakan admin dashboard
- 📱 [Career Quest App](docs/CAREER-QUEST-APP.md) - Student app features & usage
- 🛣️ [Routing Structure](docs/ROUTING-STRUCTURE.md) - **URL structure & session management** ⭐ NEW
- 🔄 [Supabase Migration](docs/SUPABASE-MIGRATION-GUIDE.md) - Upgrade localStorage → Database
- 🧪 [Testing Guide](docs/TESTING-GUIDE.md) - Playwright E2E testing
- 🔧 [Fix Sverdle 404](docs/FIX-SVERDLE-404.md) - Technical fix documentation
- ⚙️ [Workflows Guide](docs/WORKFLOWS-GUIDE.md) - GitHub Actions & CI/CD

### **Contributing:**

- 🤝 [Contributing Guide](CONTRIBUTING.md) - **How to contribute to this project**
- 📜 [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines
- 🔒 [Security Policy](SECURITY.md) - Report vulnerabilities
- 📄 [License](LICENSE) - MIT License

### **External Docs:**

- [SvelteKit](https://kit.svelte.dev/)
- [adapter-static](https://kit.svelte.dev/docs/adapter-static)
- [GitHub Pages](https://docs.github.com/en/pages)
- [Supabase](https://supabase.com/docs)

---

## 🤝 Contributing

We welcome contributions from everyone! Whether you're a developer, designer, educator, or student - there's a way for you to help.

**Ways to Contribute:**

- 💻 Code (features, bug fixes, improvements)
- 📚 Documentation (guides, translations)
- 🎨 Design (UI/UX, accessibility)
- 🧪 Testing (bug reports, QA)
- 💬 Community (support, discussions)

**Quick Start:**

```bash
# Fork & clone the repo
git clone https://github.com/YOUR_USERNAME/we-will-shine.git

# Install dependencies
pnpm install

# Start development
pnpm run dev

# Run tests
pnpm run test
```

→ Read full guide: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 👥 Contributors

This project exists thanks to all the people who contribute.

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- This will be auto-generated -->

**Founder & Creator:**

- [@sandikodev](https://github.com/sandikodev) - Founder, Creator & Lead Developer

**Core Team:**

- [@ITIF-Syuhada](https://github.com/ITIF-Syuhada) - Organization Account

**Want to be listed here?** Make a contribution and you'll be added automatically!

<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**

- ✅ Free to use for any purpose
- ✅ Free to modify and distribute
- ✅ Free for commercial use
- ✅ Just keep the license notice

---

## 🙏 Acknowledgments

**Created by:**

- 💻 [@sandikodev](https://github.com/sandikodev) - Founder & Creator
  - _"Atas rasa syukur telah mendapat kesempatan mengajar anak-anak SMP IT Masjid Syuhada yang soleh dan solehah"_

**Special Thanks:**

- 💝 Siswa-siswi 7D Putri (untuk inspirasi hadiah sepatu & menjadi pilot users)
- 🎓 SMP IT Masjid Syuhada (untuk kepercayaan dan dukungan)
- 👨‍🏫 Ustadz & Ustadzah (untuk guidance dan feedback)
- 👨‍💻 All contributors & supporters
- 🌟 Open source community

**Built with:**

- [SvelteKit](https://kit.svelte.dev/) - Framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Supabase](https://supabase.com/) - Backend (planned)
- [Gemini AI](https://deepmind.google/technologies/gemini/) - AI (planned)

---

## 📞 Contact & Support

**For Schools:**

- 📧 Email: schools@wewillshine.dev
- 📅 Book Demo: [calendly.com/wewillshine](https://calendly.com/wewillshine)

**For Contributors:**

- 💬 GitHub Discussions
- 🐛 GitHub Issues
- 📧 Email: hello@wewillshine.dev

**For Partnerships:**

- 🤝 Email: partnerships@wewillshine.dev
- 💰 Sponsorship: [wewillshine.dev/sponsor](https://wewillshine.dev/sponsor)

**Security:**

- 🔒 Email: security@wewillshine.dev
- 📋 See: [SECURITY.md](SECURITY.md)

---

## ⭐ Star This Repo!

If you find this project useful, please consider giving it a star! It helps us reach more schools and contributors.

[![GitHub stars](https://img.shields.io/github/stars/ITIF-Syuhada/we-will-shine?style=social)](https://github.com/ITIF-Syuhada/we-will-shine/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ITIF-Syuhada/we-will-shine?style=social)](https://github.com/ITIF-Syuhada/we-will-shine/network/members)

---

## 🚀 Roadmap

**Current:** v1.0 - Career Quest (MVP)  
**Next:** v2.0 - Mental Health & BK Dashboard  
**Future:** Open Source National Platform

→ See full roadmap: [ROADMAP.md](docs/ROADMAP.md)

---

**We Will Shine - Inspiring Tomorrow's Tech Leaders, Supporting Mental Health Today** 🌟💝

_"Built with ❤️ for students, by people who care"_

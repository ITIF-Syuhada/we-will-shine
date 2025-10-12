# We Will Shine

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
    base: process.env.NODE_ENV === 'production' ? '/nama-repository-anda' : ''
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

## 📚 Dokumentasi

- [SvelteKit](https://kit.svelte.dev/)
- [adapter-static](https://kit.svelte.dev/docs/adapter-static)
- [GitHub Pages](https://docs.github.com/en/pages)

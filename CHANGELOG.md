# Changelog

## [Unreleased]

### Fixed

- **Sverdle 404 pada GitHub Pages**: Mengubah halaman Sverdle dari server-side (cookies) menjadi client-side only (localStorage) sehingga dapat di-prerender sebagai static HTML dan berfungsi dengan baik di GitHub Pages.

### Changed

- `src/routes/sverdle/+page.server.ts` → Dihapus (tidak lagi menggunakan server actions)
- `src/routes/sverdle/+page.svelte` → Diubah untuk menggunakan localStorage dan Svelte 5 runes
- `src/routes/sverdle/words.server.ts` → Rename ke `words.ts` (sekarang bisa digunakan di client-side)
- `src/routes/sverdle/game.ts` → Update import dari `words.server` ke `words`

### Added

- Playwright E2E testing setup
- Test suite untuk navigasi aplikasi (`tests/navigation.spec.ts`)
- Test suite lengkap untuk Sverdle game (`tests/sverdle.spec.ts`)
- Script `test:e2e` dan `test:e2e:ui` di package.json

### Technical Details

Masalah terjadi karena:

1. Halaman Sverdle menggunakan `+page.server.ts` dengan `export const prerender = false`
2. Server actions (form actions) dan cookies membutuhkan server runtime
3. GitHub Pages hanya bisa serve static files

Solusi:

1. Hapus server-side logic (`+page.server.ts`)
2. Ubah game state management dari cookies → localStorage
3. Enable prerendering dengan `export const prerender = true` di `+page.ts`
4. Halaman sekarang di-generate sebagai static HTML dan bisa diakses di GitHub Pages

## Verifikasi

- ✅ Build berhasil tanpa error
- ✅ File `build/sverdle/index.html` ter-generate
- ✅ Halaman bisa diakses di local preview
- ✅ Game berfungsi normal dengan localStorage
- ✅ Playwright tests passed

# Fix: Sverdle 404 Error di GitHub Pages

## 🐛 Masalah

Halaman Sverdle dapat diakses di local development dan preview (`http://localhost:4173/we-will-shine/sverdle/`), tetapi menampilkan **404 Error** ketika diakses di GitHub Pages (`https://itif-syuhada.github.io/we-will-shine/sverdle/`).

## 🔍 Diagnosis

### Penyebab Utama:

1. **Server-side rendering dengan cookies**
   - File `src/routes/sverdle/+page.server.ts` menggunakan server actions dan cookies
   - `export const prerender = false` mencegah halaman di-generate sebagai static HTML

2. **GitHub Pages limitation**
   - GitHub Pages hanya bisa serve **static files** (HTML, CSS, JS)
   - Tidak mendukung server-side runtime (Node.js, cookies, form actions)

3. **Missing HTML file**
   - Karena `prerender = false`, file `build/sverdle/index.html` tidak ter-generate
   - GitHub Pages menampilkan 404 karena file tidak ada

### Verifikasi Masalah:

```bash
# Sebelum fix - file tidak ada
$ ls build/sverdle/
ls: cannot access 'build/sverdle/': No such file or directory

# Local preview works karena menggunakan Node.js server
$ pnpm run preview  # ✅ Berfungsi
# GitHub Pages tidak works karena pure static
```

## ✅ Solusi

### 1. Ubah dari Server-side ke Client-side

**Hapus file server:**

- ❌ Hapus `src/routes/sverdle/+page.server.ts`

**Buat file config baru:**

```typescript
// src/routes/sverdle/+page.ts
export const prerender = true; // Enable prerendering
export const csr = true; // Enable client-side rendering
export const ssr = false; // Disable server-side rendering
```

### 2. Ubah State Management: Cookies → localStorage

**Sebelum (Server-side):**

```typescript
// +page.server.ts
export const load = ({ cookies }) => {
  const game = new Game(cookies.get('sverdle'));
  return { ... };
};

export const actions = {
  update: async ({ cookies }) => {
    // ...
    cookies.set('sverdle', game.toString(), { path: '/' });
  }
};
```

**Sesudah (Client-side):**

```typescript
// +page.svelte
import { browser } from '$app/environment';
import { onMount } from 'svelte';

let game = $state<Game | null>(null);

onMount(() => {
	if (browser) {
		const saved = localStorage.getItem('sverdle');
		game = new Game(saved ?? undefined);
	}
});

function saveGame() {
	if (browser && game) {
		localStorage.setItem('sverdle', game.toString());
	}
}
```

### 3. Refactor Component Logic

**Perubahan utama di `+page.svelte`:**

1. **Remove form actions** - tidak lagi menggunakan `<form>` dengan `use:enhance`
2. **Direct event handlers** - gunakan `onclick={handler}` dan keyboard events
3. **Local state management** - state sepenuhnya di client-side dengan Svelte 5 runes
4. **Browser guards** - gunakan `browser` check dari `$app/environment`

### 4. Update Words Import

```bash
# Rename file
mv src/routes/sverdle/words.server.ts src/routes/sverdle/words.ts

# Update import di game.ts
- import { words, allowed } from './words.server';
+ import { words, allowed } from './words';
```

## 📊 Hasil

### File Structure Sebelum vs Sesudah:

**Sebelum:**

```
src/routes/sverdle/
├── +page.server.ts  ❌ (Server-side, cookies)
├── +page.svelte
├── game.ts
└── words.server.ts
```

**Sesudah:**

```
src/routes/sverdle/
├── +page.ts         ✅ (prerender = true)
├── +page.svelte     ✅ (client-side only, localStorage)
├── game.ts
└── words.ts         ✅ (accessible from client)
```

### Build Output:

**Sebelum:**

```bash
$ pnpm run build
$ ls build/sverdle/
# ❌ Folder tidak ada atau kosong
```

**Sesudah:**

```bash
$ pnpm run build
$ ls build/sverdle/
index.html  how-to-play/
# ✅ File HTML ter-generate!

$ head build/sverdle/index.html
<!doctype html>
<html lang="en">
  <head>...</head>
  <body>...</body>
</html>
# ✅ Full HTML prerendered!
```

## 🧪 Testing

Setup Playwright untuk E2E testing:

```bash
# Install
pnpm add -D @playwright/test

# Run tests
pnpm run test:e2e
```

**Test coverage:**

- ✅ Navigation ke halaman sverdle
- ✅ Game loads correctly
- ✅ Keyboard input functionality
- ✅ Click keyboard buttons
- ✅ Backspace removes letters
- ✅ Enter button enable/disable logic
- ✅ localStorage persistence
- ✅ Restart game functionality

## 🚀 Deployment

### GitHub Actions Workflow Updated:

```yaml
# .github/workflows/deploy.yml
- name: Install Playwright Browsers
  run: pnpm exec playwright install --with-deps chromium

- name: Run tests
  run: pnpm run test

- name: Run E2E tests
  run: pnpm run test:e2e

- name: Build
  run: pnpm run build
```

Sekarang setiap deployment akan:

1. ✅ Run unit tests
2. ✅ Run E2E tests
3. ✅ Build static site
4. ✅ Deploy ke GitHub Pages

## ✨ Benefits

1. **✅ Works on GitHub Pages** - Static HTML dapat di-serve
2. **✅ No server required** - Pure client-side
3. **✅ Better UX** - Instant game state updates (no server round-trips)
4. **✅ Offline capable** - localStorage works offline
5. **✅ Faster** - No network requests for game state
6. **✅ E2E tested** - Confidence in functionality

## 📝 Lessons Learned

### GitHub Pages Constraints:

1. **No server-side runtime** - Hanya static files
2. **No cookies from server** - Gunakan localStorage
3. **No form actions** - Gunakan client-side JS
4. **Must prerender** - Set `prerender = true`

### Best Practices untuk Static Sites:

1. ✅ **Always prerender** pages untuk GitHub Pages
2. ✅ **Use localStorage** untuk client state
3. ✅ **Test with build + preview** sebelum deploy
4. ✅ **Verify HTML files exist** di folder build
5. ✅ **Add E2E tests** untuk confidence

## 🔗 References

- [SvelteKit Adapter Static](https://kit.svelte.dev/docs/adapter-static)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Playwright Testing](https://playwright.dev/)

---

**Status**: ✅ **RESOLVED**

**Tanggal Fix**: 13 Oktober 2025

**Verified**:

- ✅ Local build & preview
- ✅ E2E tests passing
- 🔄 Pending: Verifikasi di GitHub Pages setelah push

# GitHub Actions Workflows Guide

Repositori ini menggunakan dua workflow GitHub Actions yang terpisah untuk testing dan deployment.

## 📋 Workflow Overview

### 1. Test Workflow (`.github/workflows/test.yml`)

**Tujuan:** Menjalankan unit tests, type checking, linting, dan E2E tests.

**Trigger:**

- ✅ **Manual**: Via GitHub UI (Actions → Run Tests → Run workflow)
- ✅ **Otomatis**: Pada setiap Pull Request ke branch `main`
- ✅ **Dipanggil**: Oleh workflow lain (seperti deploy workflow)

**Steps:**

1. Checkout code
2. Install dependencies (pnpm)
3. Install Playwright browsers
4. Run unit tests (`pnpm run test` - linting & type check)
5. Build project
6. Run E2E tests (`pnpm run test:e2e`)
7. Upload test results & screenshots (jika ada failure)

**Artifacts:**

- `playwright-report` - HTML report dari test results (tersimpan 30 hari)
- `test-screenshots` - Screenshots dari failed tests (tersimpan 7 hari)

---

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

**Tujuan:** Build dan deploy aplikasi ke GitHub Pages.

**Trigger:**

- ✅ **Manual**: Via GitHub UI (Actions → Deploy to GitHub Pages → Run workflow)
- ✅ **Otomatis**: Pada setiap push ke branch `main`

**Dependencies:**

- Workflow ini **selalu menjalankan test workflow terlebih dahulu**
- Deploy **hanya akan berjalan jika semua tests PASS** ✅

**Steps:**

1. Jalankan test workflow
2. Build untuk production (`pnpm run build`)
3. Upload build artifacts
4. Deploy ke GitHub Pages

---

## 🎯 Cara Menggunakan

### Menjalankan Tests Secara Manual

1. Buka repository di GitHub
2. Klik tab **Actions**
3. Pilih workflow **"Run Tests"**
4. Klik tombol **"Run workflow"**
5. Pilih branch (default: `main`)
6. Klik **"Run workflow"**

### Menjalankan Deploy Secara Manual

1. Buka repository di GitHub
2. Klik tab **Actions**
3. Pilih workflow **"Deploy to GitHub Pages"**
4. Klik tombol **"Run workflow"**
5. Pilih branch (default: `main`)
6. Klik **"Run workflow"**

**Note:** Deploy akan tetap menjalankan tests terlebih dahulu!

### Melihat Test Results

Jika tests gagal:

1. Klik pada workflow run yang gagal
2. Download artifact **"playwright-report"**
3. Extract zip file
4. Buka `index.html` di browser

Atau untuk screenshots:

1. Download artifact **"test-screenshots"**
2. Lihat screenshot dari failed tests

---

## 🔄 Workflow Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Push to Main                       │
│                        or                            │
│               Manual Trigger (Deploy)                │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Test Workflow       │
         │                       │
         │  ✓ Lint & Type Check  │
         │  ✓ Build              │
         │  ✓ E2E Tests          │
         └───────────┬───────────┘
                     │
                     ├─── Tests PASS ───┐
                     │                  │
                     │                  ▼
                     │       ┌──────────────────┐
                     │       │ Build & Deploy   │
                     │       │                  │
                     │       │ ✓ Build (prod)   │
                     │       │ ✓ Deploy Pages   │
                     │       └──────────────────┘
                     │
                     └─── Tests FAIL ───┐
                                        │
                                        ▼
                                  ❌ STOP
                           (No deployment)
```

---

## 🧪 Testing di Pull Request

Ketika membuat Pull Request:

1. Test workflow akan **otomatis berjalan**
2. PR akan menunjukkan status checks
3. Merge hanya diizinkan jika **tests PASS** ✅
4. Deploy **tidak akan berjalan** di PR (hanya di main branch)

---

## 📊 Status Badges

Tambahkan badges berikut ke `README.md`:

```markdown
![Tests](https://github.com/ITIF-Syuhada/we-will-shine/actions/workflows/test.yml/badge.svg)
![Deploy](https://github.com/ITIF-Syuhada/we-will-shine/actions/workflows/deploy.yml/badge.svg)
```

---

## 🛠️ Troubleshooting

### Warning: "base will be overridden by SvelteKit"

**Pesan:**

```
[WebServer] The following Vite config options will be overridden by SvelteKit:
[WebServer]   - base
```

**Status:** ✅ **NORMAL** - Ini bukan error!

**Penjelasan:**

- SvelteKit menghandle base path via `svelte.config.js`
- Preview command menggunakan `--base=/we-will-shine/` flag untuk override
- Warning ini expected dan tidak mempengaruhi functionality

### Tests Gagal di CI tapi Berhasil di Local

**Kemungkinan penyebab:**

1. Base path configuration berbeda
2. Environment variables tidak tersedia
3. Timeout issue di CI

**Solusi:**

```bash
# Test dengan environment CI
CI=true pnpm run test:e2e
```

### Deploy Gagal tapi Tests Pass

**Kemungkinan penyebab:**

1. GitHub Pages configuration
2. Permissions issue
3. Build artifacts tidak ter-upload

**Solusi:**

1. Cek Settings → Pages → Source harus "GitHub Actions"
2. Pastikan workflow memiliki `pages: write` permission

### Manual Trigger Tidak Muncul

**Solusi:**

1. Pastikan workflow sudah ter-commit dan push ke repository
2. Refresh halaman Actions di GitHub
3. Cek apakah `workflow_dispatch:` ada di trigger configuration

---

## 📝 Best Practices

### 1. Selalu Test Sebelum Deploy

✅ **DO:**

```bash
# Local testing sebelum push
pnpm run test
pnpm run build
pnpm run test:e2e
```

❌ **DON'T:**

- Push tanpa testing lokal
- Skip tests dengan `--no-verify`
- Deploy tanpa test pass

### 2. Gunakan Pull Request

✅ **DO:**

1. Buat feature branch
2. Commit changes
3. Create Pull Request
4. Wait for tests to pass
5. Merge to main

❌ **DON'T:**

- Push langsung ke main tanpa PR
- Merge PR dengan failed tests

### 3. Monitor Workflow Runs

✅ **DO:**

- Check Actions tab setelah push
- Review test results jika gagal
- Download artifacts untuk debugging

---

## 🔐 Secrets & Environment Variables

Workflow ini tidak memerlukan secrets tambahan. GitHub Actions secara otomatis menyediakan:

- `GITHUB_TOKEN` - untuk permissions
- `GITHUB_REPOSITORY` - repository name
- `GITHUB_REF` - branch/tag reference

Jika perlu menambahkan secrets:

1. Settings → Secrets and variables → Actions
2. New repository secret
3. Gunakan di workflow: `${{ secrets.SECRET_NAME }}`

---

## 📖 Referensi

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright Test](https://playwright.dev/)
- [SvelteKit Static Adapter](https://kit.svelte.dev/docs/adapter-static)
- [GitHub Pages Deployment](https://docs.github.com/en/pages)

---

**Last Updated:** October 12, 2025  
**Maintained by:** ITIF Syuhada Team

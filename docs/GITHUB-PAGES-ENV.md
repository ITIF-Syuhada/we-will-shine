# 🚀 GitHub Pages Environment Variables Setup

Panduan setup environment variables untuk deployment GitHub Pages dengan Supabase.

## ⚠️ Important Note

**GitHub Pages tidak support `.env` files!**  
Environment variables harus di-inject saat build time melalui GitHub Actions.

## 📋 Prerequisites

- GitHub repository
- Supabase project dengan URL dan Anon Key
- GitHub Actions workflow untuk deploy

## 🔐 Method 1: GitHub Secrets (Recommended)

### Step 1: Add Secrets to Repository

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add the following secrets:

```
Name: PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co

Name: PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbG...your-anon-key
```

### Step 2: Update GitHub Actions Workflow

Update `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build with environment variables
        env:
          PUBLIC_SUPABASE_URL: ${{ secrets.PUBLIC_SUPABASE_URL }}
          PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
        run: pnpm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: 'build'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Step 3: Verify

1. Push changes to `main` branch
2. Check Actions tab for build status
3. Test the deployed site

## 🛠️ Method 2: Vite Config (Build-time)

Alternative: Inject via Vite config during build.

Update `vite.config.ts`:

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'import.meta.env.PUBLIC_SUPABASE_URL': JSON.stringify(process.env.PUBLIC_SUPABASE_URL || ''),
		'import.meta.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(
			process.env.PUBLIC_SUPABASE_ANON_KEY || ''
		)
	}
});
```

Then in workflow:

```yaml
- name: Build
  env:
    PUBLIC_SUPABASE_URL: ${{ secrets.PUBLIC_SUPABASE_URL }}
    PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
  run: pnpm run build
```

## 📝 Method 3: Hardcode (Not Recommended)

**⚠️ Only for PUBLIC anon keys!**

Edit `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'eyJhbG...your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Cons:**

- ❌ Credentials in source code
- ❌ No flexibility for different environments
- ❌ Security risk if repo is public (but anon keys are meant to be public)

## 🧪 Testing Environment Variables

### Local Testing (Development)

1. Create `.env` file:

```bash
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

2. Run dev server:

```bash
pnpm dev
```

3. Check: http://localhost:5173/admin/settings
4. Click "Test Database Connection"

### Production Testing (GitHub Pages)

1. Deploy to GitHub Pages
2. Visit: `https://your-username.github.io/your-repo/admin/settings`
3. Click "Test Database Connection"
4. Should show: "✅ Database connection successful!"

## 🔍 Troubleshooting

### Issue: "Environment variables not configured"

**Solution:**

1. Check GitHub Secrets are added
2. Verify workflow uses secrets correctly
3. Re-run the workflow

### Issue: "Database connection failed"

**Possible causes:**

1. Wrong Supabase URL or Key
2. Network issues
3. Tables not created (run migrations)

**Solution:**

```bash
# Verify credentials
echo $PUBLIC_SUPABASE_URL
echo $PUBLIC_SUPABASE_ANON_KEY

# Run migrations
supabase db push
```

### Issue: "CORS error"

**Solution:**
Add your GitHub Pages domain to Supabase:

1. Go to Supabase Dashboard
2. Settings → API → CORS
3. Add: `https://your-username.github.io`

## 📊 Environment Variable Flow

```
┌─────────────────────────────────────────────┐
│  GitHub Secrets                              │
│  - PUBLIC_SUPABASE_URL                       │
│  - PUBLIC_SUPABASE_ANON_KEY                  │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  GitHub Actions Workflow                     │
│  env:                                        │
│    PUBLIC_SUPABASE_URL: ${{ secrets... }}    │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  Build Process (pnpm run build)              │
│  - Vite injects env vars                     │
│  - Creates static files                      │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  GitHub Pages Deployment                     │
│  - Serves static files                       │
│  - Env vars baked into JS bundle            │
└─────────────────────────────────────────────┘
```

## 🔒 Security Best Practices

### Do's ✅

- ✅ Use GitHub Secrets for sensitive data
- ✅ Use Supabase Row Level Security (RLS)
- ✅ Rotate keys periodically
- ✅ Use anon keys (not service keys!)
- ✅ Enable CORS properly

### Don'ts ❌

- ❌ Don't commit `.env` to git
- ❌ Don't use service keys in frontend
- ❌ Don't expose admin passwords
- ❌ Don't skip RLS policies

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Supabase Security](https://supabase.com/docs/guides/auth/row-level-security)
- [SvelteKit Environment Variables](https://kit.svelte.dev/docs/modules#$env-dynamic-public)

## 🎯 Quick Setup Checklist

- [ ] Create Supabase project
- [ ] Get Supabase URL and Anon Key
- [ ] Add secrets to GitHub repository
- [ ] Update GitHub Actions workflow
- [ ] Push to `main` branch
- [ ] Verify deployment
- [ ] Test database connection in Settings page
- [ ] Check all features work

---

**Last Updated:** October 2025  
**Status:** ✅ Ready for Production

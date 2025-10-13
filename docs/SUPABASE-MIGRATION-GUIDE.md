# Supabase Migration Guide

## 📋 Overview

Dokumentasi ini adalah panduan lengkap untuk **migrate** aplikasi We Will Shine dari **localStorage** ke **Supabase** untuk mendapatkan real-time database, backup otomatis, dan analytics yang lebih powerful.

**Status Current:** localStorage (client-side only)  
**Target:** Supabase (cloud database + localStorage sebagai cache)  
**Estimasi Waktu:** 1-2 jam untuk developer berpengalaman

---

## 🎯 Why Migrate to Supabase?

### **Benefits:**

**Real-time Data:**

- ✅ Admin bisa monitor dari device mana saja
- ✅ Data sync across devices
- ✅ Live updates tanpa refresh

**Better Analytics:**

- ✅ Comprehensive reporting
- ✅ Historical data tracking
- ✅ Advanced queries
- ✅ Data visualization

**Scalability:**

- ✅ Support hundreds/thousands of students
- ✅ Multiple classes management
- ✅ Multi-admin access

**Data Safety:**

- ✅ Auto backup
- ✅ Data persistence
- ✅ No data loss jika clear browser

**Advanced Features:**

- ✅ Notification system
- ✅ Student messaging
- ✅ Export advanced reports
- ✅ Role-based access control

### **Costs:**

**Supabase Free Tier:**

- 500MB Database
- 1GB File Storage
- 2GB Bandwidth/month
- Unlimited API requests
- 50,000 monthly active users

**Perfect untuk:**

- 22-200 siswa: ✅ FREE
- Ratusan siswa: ✅ FREE
- Ribuan siswa: Mungkin perlu paid tier (~$25/month)

---

## 📊 Database Schema

### **Tables to Create:**

#### **1. students**

```sql
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id VARCHAR(100) UNIQUE NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  class VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX idx_students_code ON students(code);
CREATE INDEX idx_students_class ON students(class);

-- Sample data
INSERT INTO students (student_id, code, name, class) VALUES
('adinda-salsabila', 'INSPIRE2025AS', 'ADINDA SALSABILA', '7D'),
('aisya-jasmine-nurmana', 'INSPIRE2025AJN', 'AISYA JASMINE NURMANA', '7D'),
-- ... insert all 22 students
```

#### **2. progress**

```sql
CREATE TABLE progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_code VARCHAR(20) REFERENCES students(code) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  explored_careers JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  dreams JSONB DEFAULT '[]'::jsonb,
  quote_count INTEGER DEFAULT 0,
  chat_count INTEGER DEFAULT 0,
  quiz_completed BOOLEAN DEFAULT FALSE,
  quiz_answers JSONB DEFAULT '[]'::jsonb,
  personal_motivation TEXT,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT unique_student_progress UNIQUE(student_code)
);

-- Index
CREATE INDEX idx_progress_student_code ON progress(student_code);
CREATE INDEX idx_progress_points ON progress(points DESC);
CREATE INDEX idx_progress_last_active ON progress(last_active DESC);

-- Auto update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### **3. analytics** (Optional - untuk historical tracking)

```sql
CREATE TABLE analytics_daily (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  total_logins INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  total_quiz_completed INTEGER DEFAULT 0,
  total_achievements_unlocked INTEGER DEFAULT 0,
  popular_careers JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_analytics_date ON analytics_daily(date DESC);
```

#### **4. admin_users** (Optional - untuk multiple admin)

```sql
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Use Supabase Auth for actual authentication
```

---

## 🔧 Step-by-Step Implementation

### **STEP 1: Setup Supabase Project**

**1.1. Create Supabase Account**

```
1. Kunjungi: https://supabase.com
2. Sign up (free account)
3. Create new project:
   - Project name: "we-will-shine"
   - Database password: (simpan dengan aman!)
   - Region: Singapore (terdekat dengan Indonesia)
```

**1.2. Get Credentials**

```
1. Buka Project Settings → API
2. Copy:
   - Project URL (e.g. https://xxxxx.supabase.co)
   - anon/public key
```

**1.3. Create Database Tables**

```
1. Buka SQL Editor di Supabase Dashboard
2. Copy-paste SQL schema dari section di atas
3. Run query
4. Verify tables created di Table Editor
```

---

### **STEP 2: Configure Environment Variables**

**2.1. Create `.env` file**

```bash
# .env (di root project)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**2.2. Update `.env.example`**

```bash
# .env.example
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**2.3. Update `.gitignore`**

```bash
# Pastikan .env tidak di-commit
.env
.env.*
!.env.example
```

---

### **STEP 3: Create Supabase Client**

**3.1. Create `src/lib/supabase.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client (runs in browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function untuk check connection
export async function testSupabaseConnection() {
	if (!browser) return false;

	try {
		const { data, error } = await supabase.from('students').select('count');
		return !error;
	} catch (e) {
		console.error('Supabase connection error:', e);
		return false;
	}
}
```

**3.2. Create TypeScript Types**

```typescript
// src/lib/types/database.types.ts
export interface Database {
	public: {
		Tables: {
			students: {
				Row: {
					id: string;
					student_id: string;
					code: string;
					name: string;
					class: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					student_id: string;
					code: string;
					name: string;
					class?: string;
				};
				Update: {
					name?: string;
					class?: string;
				};
			};
			progress: {
				Row: {
					id: string;
					student_code: string;
					points: number;
					level: number;
					explored_careers: number[];
					achievements: any[];
					dreams: any[];
					quote_count: number;
					chat_count: number;
					quiz_completed: boolean;
					quiz_answers: string[];
					personal_motivation: string | null;
					last_active: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					student_code: string;
					points?: number;
					level?: number;
					explored_careers?: number[];
					achievements?: any[];
					dreams?: any[];
				};
				Update: {
					points?: number;
					level?: number;
					explored_careers?: number[];
					achievements?: any[];
					dreams?: any[];
					quote_count?: number;
					chat_count?: number;
					quiz_completed?: boolean;
					quiz_answers?: string[];
					personal_motivation?: string;
					last_active?: string;
				};
			};
		};
	};
}
```

---

### **STEP 4: Update User Store (Hybrid Approach)**

**4.1. Update `src/lib/stores/user.ts`**

**Strategy: Hybrid (localStorage + Supabase)**

- localStorage: Cache untuk offline & fast load
- Supabase: Source of truth & sync

```typescript
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabase';
import type { Student } from '$lib/data/students';
import type { Achievement } from '$lib/data/achievements';
import { initialAchievements } from '$lib/data/achievements';

// ... existing interfaces ...

const STORAGE_KEY = 'we-will-shine-progress';

// Helper: Sync to Supabase
async function syncToSupabase(progress: UserProgress) {
	if (!browser) return;

	try {
		const { data, error } = await supabase.from('progress').upsert(
			{
				student_code: progress.studentCode,
				points: progress.points,
				level: progress.level,
				explored_careers: progress.exploredCareers,
				achievements: progress.achievements,
				dreams: progress.dreams,
				quote_count: progress.quoteCount,
				chat_count: progress.chatCount,
				quiz_completed: progress.quizCompleted,
				quiz_answers: progress.quizAnswers,
				personal_motivation: progress.personalMotivation,
				last_active: new Date().toISOString()
			},
			{
				onConflict: 'student_code'
			}
		);

		if (error) {
			console.error('Supabase sync error:', error);
		}
	} catch (e) {
		console.error('Failed to sync to Supabase:', e);
	}
}

// Helper: Load from Supabase
async function loadFromSupabase(studentCode: string): Promise<UserProgress | null> {
	if (!browser) return null;

	try {
		const { data, error } = await supabase
			.from('progress')
			.select('*')
			.eq('student_code', studentCode)
			.single();

		if (error || !data) return null;

		// Convert Supabase data to UserProgress
		return {
			studentCode: data.student_code,
			studentId: '', // Get from students table
			studentName: '', // Get from students table
			points: data.points,
			level: data.level,
			exploredCareers: data.explored_careers || [],
			achievements: data.achievements || initialAchievements,
			dreams: data.dreams || [],
			quoteCount: data.quote_count,
			chatCount: data.chat_count,
			quizCompleted: data.quiz_completed,
			quizAnswers: data.quiz_answers || [],
			personalMotivation: data.personal_motivation || ''
		};
	} catch (e) {
		console.error('Failed to load from Supabase:', e);
		return null;
	}
}

function createUserStore() {
	const { subscribe, set, update } = writable<UserProgress | null>(getInitialProgress());

	return {
		subscribe,
		set,
		update,

		// Updated login - dengan Supabase
		login: async (student: Student) => {
			// Check if progress exists in Supabase
			const supabaseProgress = await loadFromSupabase(student.code);

			let progress: UserProgress;

			if (supabaseProgress) {
				// User sudah pernah login - load dari Supabase
				progress = {
					...supabaseProgress,
					studentId: student.id,
					studentName: student.name
				};
			} else {
				// New user - create new progress
				progress = {
					studentCode: student.code,
					studentId: student.id,
					studentName: student.name,
					points: 0,
					level: 1,
					exploredCareers: [],
					achievements: initialAchievements,
					dreams: [],
					quoteCount: 0,
					chatCount: 0,
					quizCompleted: false,
					quizAnswers: [],
					personalMotivation: ''
				};
			}

			// Save to both localStorage & Supabase
			set(progress);
			if (browser) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
			}
			await syncToSupabase(progress);
		},

		// Updated addPoints - dengan Supabase sync
		addPoints: async (points: number) => {
			let updatedProgress: UserProgress | null = null;

			update((progress) => {
				if (!progress) return progress;
				const newPoints = progress.points + points;
				const newLevel = Math.floor(newPoints / 100) + 1;
				const updated = {
					...progress,
					points: newPoints,
					level: newLevel
				};
				updatedProgress = updated;

				// Save to localStorage
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});

			// Sync to Supabase (async)
			if (updatedProgress) {
				await syncToSupabase(updatedProgress);
			}
		}

		// Similar updates untuk semua methods...
		// exploreCareer, unlockAchievement, addDream, etc.
	};
}

export const userProgress = createUserStore();
```

---

### **STEP 5: Update Admin Pages**

**5.1. Update `src/routes/admin/students/+page.svelte`**

**Before (localStorage):**

```typescript
function loadStudentsData() {
	// Only loads from localStorage
	const stored = localStorage.getItem('we-will-shine-progress');
	// ...
}
```

**After (Supabase):**

```typescript
import { supabase } from '$lib/supabase';

async function loadStudentsData() {
	try {
		// Fetch ALL progress dari Supabase
		const { data: progressData, error } = await supabase.from('progress').select('*');

		if (error) throw error;

		// Map dengan student data
		const data = students.map((student) => {
			const progress = progressData?.find((p) => p.student_code === student.code);

			return {
				...student,
				hasLoggedIn: progress !== null && progress !== undefined,
				points: progress?.points || 0,
				level: progress?.level || 0,
				exploredCareers: progress?.explored_careers?.length || 0,
				quizCompleted: progress?.quiz_completed || false,
				dreamsCount: progress?.dreams?.length || 0,
				lastActive: progress?.last_active
					? new Date(progress.last_active).toLocaleDateString('id-ID')
					: 'Never'
			};
		});

		studentsData = data;
	} catch (e) {
		console.error('Error loading students:', e);
	}
}
```

**5.2. Update `src/routes/admin/analytics/+page.svelte`**

```typescript
import { supabase } from '$lib/supabase';

async function calculateAnalytics() {
	try {
		// Fetch from Supabase instead of localStorage
		const { data: progressData, error } = await supabase.from('progress').select('*');

		if (error) throw error;

		// Calculate stats
		let active = progressData?.length || 0;
		let totalPoints = progressData?.reduce((sum, p) => sum + (p.points || 0), 0) || 0;

		// ... rest of calculations

		// Real-time subscription (optional)
		const subscription = supabase
			.channel('progress-changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'progress'
				},
				(payload) => {
					console.log('Data changed!', payload);
					// Re-calculate analytics
					calculateAnalytics();
				}
			)
			.subscribe();

		// Cleanup on unmount
		return () => {
			subscription.unsubscribe();
		};
	} catch (e) {
		console.error('Error calculating analytics:', e);
	}
}
```

**5.3. Export CSV dengan Supabase Data**

```typescript
async function exportToCSV() {
	try {
		// Fetch all data
		const { data: progressData, error } = await supabase.from('progress').select(`
				*,
				students (
					name,
					code,
					class
				)
			`);

		if (error) throw error;

		// Generate CSV
		const csv = [
			['Nama', 'Kode', 'Kelas', 'Points', 'Level', 'Karir', 'Quiz', 'Last Active'].join(','),
			...progressData.map((p) =>
				[
					p.students.name,
					p.students.code,
					p.students.class || '-',
					p.points,
					p.level,
					p.explored_careers?.length || 0,
					p.quiz_completed ? 'Yes' : 'No',
					new Date(p.last_active).toLocaleDateString('id-ID')
				].join(',')
			)
		].join('\n');

		// Download
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `students-export-${new Date().toISOString().split('T')[0]}.csv`;
		link.click();
	} catch (e) {
		console.error('Export error:', e);
	}
}
```

---

### **STEP 6: Enable Row Level Security (RLS)**

**6.1. Enable RLS di Supabase Dashboard**

```sql
-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read students
CREATE POLICY "Students are viewable by everyone"
ON students FOR SELECT
USING (true);

-- Policy: Students can read their own progress
CREATE POLICY "Students can view own progress"
ON progress FOR SELECT
USING (auth.uid() IS NULL OR true);  -- For now, allow all

-- Policy: Students can insert their own progress
CREATE POLICY "Students can insert own progress"
ON progress FOR INSERT
WITH CHECK (true);  -- Adjust based on your auth

-- Policy: Students can update their own progress
CREATE POLICY "Students can update own progress"
ON progress FOR UPDATE
USING (true);  -- Adjust based on your auth

-- Policy: Only admins can delete (implement auth)
CREATE POLICY "Only admins can delete progress"
ON progress FOR DELETE
USING (false);  -- Adjust when you add admin auth
```

---

### **STEP 7: Testing Migration**

**7.1. Test Connection**

```typescript
// src/routes/+page.svelte (atau any page)
import { testSupabaseConnection } from '$lib/supabase';

onMount(async () => {
	const connected = await testSupabaseConnection();
	console.log('Supabase connected:', connected);
});
```

**7.2. Test Login Flow**

```
1. Login dengan kode siswa
2. Check browser console
3. Verify data tersimpan di Supabase (check Table Editor)
4. Login dari device lain dengan sama kode
5. Verify data sync
```

**7.3. Test Admin**

```
1. Login admin
2. Check students page → should show real data
3. Check analytics → should show aggregate
4. Verify real-time updates
```

---

### **STEP 8: Migration Strategy**

**Option A: Hard Migration (Recommended)**

```typescript
// Migrate existing localStorage data to Supabase

async function migrateLocalStorageToSupabase() {
	const stored = localStorage.getItem('we-will-shine-progress');
	if (!stored) return;

	try {
		const data = JSON.parse(stored);

		// Upload to Supabase
		const { error } = await supabase.from('progress').upsert({
			student_code: data.studentCode,
			points: data.points,
			level: data.level
			// ... all fields
		});

		if (!error) {
			console.log('Migration successful!');
			// Optionally clear localStorage after successful migration
			// localStorage.removeItem('we-will-shine-progress');
		}
	} catch (e) {
		console.error('Migration failed:', e);
	}
}

// Call on app init
onMount(() => {
	migrateLocalStorageToSupabase();
});
```

**Option B: Gradual Migration**

```typescript
// Keep both localStorage & Supabase
// localStorage = cache
// Supabase = source of truth

async function loadProgress(code: string) {
	// 1. Try Supabase first
	const supabaseData = await loadFromSupabase(code);
	if (supabaseData) {
		// Cache to localStorage
		localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseData));
		return supabaseData;
	}

	// 2. Fallback to localStorage
	const localData = getInitialProgress();
	if (localData) {
		// Migrate to Supabase
		await syncToSupabase(localData);
		return localData;
	}

	return null;
}
```

---

### **STEP 9: Environment Setup untuk Deployment**

**9.1. GitHub Secrets**

```
1. Buka GitHub Repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
```

**9.2. Update GitHub Actions Workflow**

```yaml
# .github/workflows/deploy.yml

- name: Build
  env:
    NODE_ENV: production
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
  run: pnpm run build
```

**9.3. Vercel Alternative (Optional)**

Jika mau hosting di Vercel instead of GitHub Pages (support SSR):

```bash
pnpm add -D @sveltejs/adapter-vercel

# svelte.config.js
import adapter from '@sveltejs/adapter-vercel';
```

---

## 🔐 Security Best Practices

### **1. Row Level Security (RLS)**

```sql
-- Students can only update their own progress
CREATE POLICY "Students update own progress"
ON progress FOR UPDATE
USING (
  student_code = (SELECT code FROM students WHERE id = auth.uid())
);
```

### **2. API Key Protection**

- ✅ Use environment variables
- ✅ Never commit `.env` to git
- ✅ Use GitHub Secrets untuk CI/CD
- ✅ Regenerate keys jika leaked

### **3. Admin Authentication**

**Upgrade admin ke Supabase Auth:**

```typescript
// src/routes/admin/+page.svelte
import { supabase } from '$lib/supabase';

async function handleLogin() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: adminEmail,
		password: adminPassword
	});

	if (error) {
		console.error('Login error:', error);
		return;
	}

	// Success
	goto('/admin/dashboard');
}
```

---

## 📊 Monitoring & Debugging

### **Supabase Dashboard:**

```
1. Table Editor → Lihat data real-time
2. SQL Editor → Run custom queries
3. Database → Monitor performance
4. Logs → Debug errors
5. API Docs → Auto-generated REST docs
```

### **Browser DevTools:**

```javascript
// Check Supabase calls di Network tab
// Filter by: "supabase.co"

// Test query di console:
const { data } = await supabase.from('progress').select('*');
console.log(data);
```

---

## 🧪 Testing Checklist

**Before Deploy:**

- [ ] Supabase tables created
- [ ] RLS policies configured
- [ ] Environment variables set
- [ ] Test login flow
- [ ] Test data persistence
- [ ] Test from multiple devices
- [ ] Test admin dashboard
- [ ] Test QR codes
- [ ] Test CSV export
- [ ] Monitor Supabase quota

**After Deploy:**

- [ ] Verify production connection
- [ ] Test dengan real students
- [ ] Monitor error logs
- [ ] Check Supabase usage
- [ ] Backup database
- [ ] Document any issues

---

## 🚨 Rollback Plan

**Jika Ada Masalah:**

**1. Quick Rollback (Keep localStorage)**

```typescript
// Di user store, disable Supabase sync sementara
// Comment out syncToSupabase() calls
// App tetap jalan dengan localStorage
```

**2. Full Rollback**

```bash
# Revert to commit sebelum Supabase
git revert HEAD
git push origin main
```

**3. Hybrid Mode**

```typescript
// Keep both active
// Supabase as optional enhancement
if (supabaseEnabled) {
	await syncToSupabase(data);
}
// localStorage always works
```

---

## 📈 Performance Optimization

### **Caching Strategy:**

```typescript
// Load from cache first (fast)
const cached = localStorage.getItem(STORAGE_KEY);
if (cached) {
	// Show immediately
	set(JSON.parse(cached));
}

// Then sync with Supabase (accurate)
const fresh = await loadFromSupabase(code);
if (fresh) {
	set(fresh);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
}
```

### **Debouncing Updates:**

```typescript
// Don't sync every addPoints call
// Batch updates

let syncTimeout: NodeJS.Timeout;

function debouncedSync(progress: UserProgress) {
	clearTimeout(syncTimeout);
	syncTimeout = setTimeout(() => {
		syncToSupabase(progress);
	}, 1000); // Sync after 1 second of inactivity
}
```

### **Optimistic Updates:**

```typescript
// Update UI immediately
// Sync to Supabase in background

function addPoints(points: number) {
	// Update UI (fast)
	update((progress) => ({ ...progress, points: progress.points + points }));

	// Sync to DB (background)
	syncToSupabase($userProgress).catch((err) => {
		console.error('Sync failed:', err);
		// Could retry or show offline indicator
	});
}
```

---

## 🔄 Real-time Features (Advanced)

### **Live Admin Dashboard:**

```typescript
// src/routes/admin/dashboard/+page.svelte

onMount(() => {
	// Initial load
	loadStats();

	// Subscribe to changes
	const channel = supabase
		.channel('progress-updates')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'progress'
			},
			(payload) => {
				console.log('Progress updated!', payload);
				// Reload stats
				loadStats();
			}
		)
		.subscribe();

	// Cleanup
	return () => {
		channel.unsubscribe();
	};
});
```

### **Live Leaderboard:**

```typescript
// Auto-update when any student gains points
const leaderboardChannel = supabase
	.channel('leaderboard')
	.on(
		'postgres_changes',
		{
			event: 'UPDATE',
			schema: 'public',
			table: 'progress',
			filter: 'points=gt.0'
		},
		() => {
			// Refresh leaderboard
			loadTopStudents();
		}
	)
	.subscribe();
```

---

## 📱 Offline Support (Progressive Enhancement)

### **Strategy: Offline-First**

```typescript
import { writable } from 'svelte/store';

// Track online status
export const isOnline = writable(navigator.onLine);

if (browser) {
	window.addEventListener('online', () => isOnline.set(true));
	window.addEventListener('offline', () => isOnline.set(false));
}

// Queue for offline actions
const offlineQueue = writable<any[]>([]);

async function syncToSupabase(data: any) {
	if (!navigator.onLine) {
		// Queue for later
		offlineQueue.update((q) => [...q, { action: 'sync', data }]);
		return;
	}

	try {
		await supabase.from('progress').upsert(data);
	} catch (e) {
		// Queue for retry
		offlineQueue.update((q) => [...q, { action: 'sync', data }]);
	}
}

// Process queue when back online
isOnline.subscribe((online) => {
	if (online) {
		processOfflineQueue();
	}
});
```

---

## 🎯 Migration Checklist

### **Pre-Migration:**

- [ ] Backup localStorage data (export JSON)
- [ ] Document current data structure
- [ ] Test Supabase in development
- [ ] Create migration script
- [ ] Plan rollback strategy

### **Migration:**

- [ ] Create Supabase project
- [ ] Setup database tables
- [ ] Configure RLS policies
- [ ] Add environment variables
- [ ] Update code (stores, admin pages)
- [ ] Test thoroughly
- [ ] Deploy to staging (optional)

### **Post-Migration:**

- [ ] Monitor Supabase logs
- [ ] Check error rates
- [ ] Verify data integrity
- [ ] Test with real users
- [ ] Document any issues
- [ ] Update team documentation

---

## 💰 Cost Estimation

### **Free Tier (Recommended untuk Start):**

```
Supabase Free:
- 500MB Database (cukup untuk 1000+ siswa)
- Unlimited API requests
- Social OAuth
- Real-time subscriptions

GitHub Pages Free:
- Unlimited bandwidth (static files)
- Custom domain support
- HTTPS included

Total: Rp 0/month ✅
```

### **If Need to Scale (Paid):**

```
Supabase Pro: $25/month
- 8GB Database
- No project pausing
- Daily backups
- Priority support

Estimated capacity:
- 10,000+ students
- Millions of API calls
- Advanced analytics
```

---

## 📞 Support Resources

### **Supabase:**

- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub: https://github.com/supabase/supabase

### **SvelteKit + Supabase:**

- Guide: https://supabase.com/docs/guides/getting-started/quickstarts/sveltekit
- Examples: https://github.com/supabase/examples

---

## 🎓 Training untuk Tim

### **Skills Required:**

- [ ] Basic SQL (CREATE TABLE, SELECT, UPDATE)
- [ ] Supabase dashboard navigation
- [ ] Environment variables concept
- [ ] Async/await JavaScript
- [ ] API error handling

### **Learning Path:**

1. Baca Supabase Getting Started
2. Buat test project kecil
3. Practice CRUD operations
4. Learn RLS policies
5. Implement di We Will Shine

**Estimasi Learning:** 4-8 jam untuk beginner

---

## ✅ Decision Matrix

### **Tetap localStorage jika:**

- ✅ Pilot project (< 50 siswa)
- ✅ Budget zero
- ✅ Privacy priority
- ✅ Simple requirements
- ✅ Single class only

### **Migrate ke Supabase jika:**

- ✅ Scale ke multiple classes (100+ siswa)
- ✅ Need real-time admin
- ✅ Want proper analytics
- ✅ Multi-admin access
- ✅ Historical data tracking
- ✅ Professional deployment

---

## 🚀 Next Steps (untuk Tim)

**Option 1: Keep Current (localStorage)**

```
✅ Deploy as-is
✅ Use for pilot
✅ Gather feedback
→ Decide later about Supabase
```

**Option 2: Implement Supabase Now**

```
1. Follow STEP 1-8 in this doc
2. Test in development
3. Deploy to production
4. Monitor & iterate
```

**Recommended:** Start dengan localStorage, migrate nanti jika needed!

---

**Last Updated:** October 13, 2025  
**Status:** Ready for Implementation  
**Difficulty:** Intermediate (2-4 hours)  
**Impact:** High (Real-time data, better analytics)

---

**Questions?** Contact development team atau create GitHub Issue!

**Created with ❤️ for We Will Shine Project**

# 📊 Activity Tracking System

Comprehensive documentation for the student activity tracking and session management system.

---

## 🎯 Overview

The activity tracking system monitors student behavior, login patterns, and engagement across the platform. It provides admins with detailed insights into how students interact with the application.

### **Key Components:**

1. **Session Management** - Track login/logout sessions
2. **Activity Logging** - Record all student actions
3. **Statistics Aggregation** - Compute engagement metrics
4. **Device Detection** - Identify browsers, OS, and device types

---

## 🗄️ Database Schema

### 1. **student_sessions** Table

Tracks individual login sessions.

| Column           | Type      | Description                         |
| ---------------- | --------- | ----------------------------------- |
| id               | uuid      | Primary key                         |
| student_id       | uuid      | Foreign key to students table       |
| session_token    | uuid      | Unique session identifier           |
| is_active        | boolean   | Session status (true = active)      |
| device_type      | varchar   | mobile, tablet, desktop             |
| browser          | varchar   | Chrome, Firefox, Safari, etc        |
| os               | varchar   | Windows, macOS, Android, iOS        |
| ip_address       | varchar   | IP address (optional)               |
| user_agent       | text      | Full user agent string              |
| login_at         | timestamp | When session started                |
| last_activity_at | timestamp | Last activity in this session       |
| logout_at        | timestamp | When session ended (null if active) |
| created_at       | timestamp | Record creation time                |

**Indexes:**

- `idx_sessions_student` on `student_id`
- `idx_sessions_active` on `is_active`

---

### 2. **student_activity_log** Table

Detailed log of all student activities.

| Column           | Type      | Description                     |
| ---------------- | --------- | ------------------------------- |
| id               | uuid      | Primary key                     |
| student_id       | uuid      | Foreign key to students table   |
| session_id       | uuid      | Foreign key to student_sessions |
| activity_type    | varchar   | login, quiz, chat, achievement  |
| activity_data    | jsonb     | Flexible metadata               |
| page_url         | text      | URL where activity occurred     |
| duration_seconds | integer   | Time spent (optional)           |
| created_at       | timestamp | When activity occurred          |

**Indexes:**

- `idx_activity_student` on `student_id`
- `idx_activity_session` on `session_id`
- `idx_activity_type` on `activity_type`

**Activity Types:**

- `login` - Student logged in
- `logout` - Student logged out
- `page_view` - Visited a page
- `quiz` - Completed a quiz
- `chat` - Interacted with AI mentor
- `achievement` - Unlocked an achievement
- `career_explore` - Explored a career
- `dream_add` - Added a dream/goal

---

### 3. **student_login_stats** Table

Aggregated statistics (updated by triggers).

| Column                  | Type      | Description                   |
| ----------------------- | --------- | ----------------------------- |
| student_id              | uuid      | Primary key, FK to students   |
| total_logins            | integer   | Total login count             |
| first_login_at          | timestamp | First time logged in          |
| last_login_at           | timestamp | Most recent login             |
| last_logout_at          | timestamp | Most recent logout            |
| total_sessions          | integer   | Total session count           |
| active_sessions         | integer   | Currently active sessions     |
| longest_session_minutes | integer   | Longest session duration      |
| total_activity_count    | integer   | Total activities logged       |
| most_used_device        | varchar   | Most common device type       |
| most_used_browser       | varchar   | Most common browser           |
| activity_by_hour        | jsonb     | Activity distribution by hour |
| activity_by_day         | jsonb     | Activity distribution by day  |
| current_streak_days     | integer   | Current login streak          |
| longest_streak_days     | integer   | Longest login streak          |
| updated_at              | timestamp | Last stats update             |

---

## 🔧 API Functions

### Session Management

#### Create Session (on login)

```typescript
import { db } from '$lib/supabase';
import { getDeviceInfo } from '$lib/utils/deviceDetect';

const deviceInfo = getDeviceInfo();
const session = await db.createStudentSession(studentId, {
	browser: deviceInfo.browser,
	os: deviceInfo.os,
	deviceType: deviceInfo.deviceType,
	ipAddress: '192.168.1.100', // Optional
	userAgent: deviceInfo.userAgent
});

// Store session ID for future tracking
localStorage.setItem('student_session_id', session.id);
```

#### Update Session Activity

```typescript
const sessionId = localStorage.getItem('student_session_id');
if (sessionId) {
	await db.updateSessionActivity(sessionId);
}
```

#### Close Session (on logout)

```typescript
const sessionId = localStorage.getItem('student_session_id');
if (sessionId) {
	await db.closeStudentSession(sessionId);
	localStorage.removeItem('student_session_id');
}
```

---

### Activity Logging

#### Log Activity

```typescript
const studentId = 'uuid-here';
const sessionId = localStorage.getItem('student_session_id');

await db.logStudentActivity(
	studentId,
	sessionId!,
	'quiz', // activity type
	{
		// activity data (flexible JSON)
		quiz_id: 'career-exploration',
		score: 85,
		time_taken: 120,
		correct_answers: 17,
		total_questions: 20
	},
	'/dashboard/quiz', // page URL
	120 // duration in seconds
);
```

#### Activity Type Examples

```typescript
// Login
await db.logStudentActivity(studentId, sessionId, 'login', {
	welcome_points: 50
});

// Quiz Completion
await db.logStudentActivity(studentId, sessionId, 'quiz', {
	quiz_id: 'career-exploration',
	score: 85,
	points_earned: 10
});

// AI Chat
await db.logStudentActivity(studentId, sessionId, 'chat', {
	topic: 'Software Engineering',
	message_count: 5,
	duration: 300
});

// Achievement
await db.logStudentActivity(studentId, sessionId, 'achievement', {
	achievement_id: 'first-quiz-master',
	points_earned: 20
});
```

---

### Data Retrieval

#### Get Student Sessions

```typescript
// Get last 10 sessions
const sessions = await db.getStudentSessions(studentId, 10);

sessions.forEach((session) => {
	console.log(`Login: ${session.login_at}`);
	console.log(`Browser: ${session.browser} on ${session.os}`);
	console.log(`Status: ${session.is_active ? 'Active' : 'Expired'}`);
});
```

#### Get Student Activities

```typescript
// Get last 10 activities
const activities = await db.getStudentActivities(studentId, 10);

activities.forEach((activity) => {
	console.log(`Type: ${activity.activity_type}`);
	console.log(`Page: ${activity.page_url}`);
	console.log(`Data:`, activity.activity_data);
});
```

#### Get Combined Data

```typescript
// Get all data at once
const data = await db.getStudentDetailData(studentId);

console.log('Sessions:', data.sessions);
console.log('Activities:', data.activities);
console.log('Stats:', data.stats);
```

---

## 🛠️ Device Detection

### Utility Functions

Located in `src/lib/utils/deviceDetect.ts`:

```typescript
import { getDeviceInfo, detectBrowser, detectOS, detectDeviceType } from '$lib/utils/deviceDetect';

// Get all device info
const info = getDeviceInfo();
// Returns: { browser, os, deviceType, userAgent }

// Individual detection
const browser = detectBrowser(navigator.userAgent); // 'Chrome'
const os = detectOS(navigator.userAgent); // 'Windows 10'
const deviceType = detectDeviceType(navigator.userAgent); // 'desktop'
```

### Supported Detection

**Browsers:**

- Chrome, Firefox, Safari, Opera, Edge
- Samsung Browser, Internet Explorer

**Operating Systems:**

- Windows (7, 8, 8.1, 10)
- macOS, Linux
- Android, iOS

**Device Types:**

- Desktop, Mobile, Tablet

---

## 📈 Implementation Flow

### 1. Login Flow (Unlock Page)

```svelte
<script lang="ts">
	import { db } from '$lib/supabase';
	import { getDeviceInfo } from '$lib/utils/deviceDetect';

	async function handleLogin(studentCode: string) {
		// 1. Validate student
		const student = await db.getStudent(studentCode);

		// 2. Create session
		const deviceInfo = getDeviceInfo();
		const session = await db.createStudentSession(student.id, deviceInfo);

		// 3. Store session ID
		localStorage.setItem('student_session_id', session.id);

		// 4. Log login activity
		await db.logStudentActivity(
			student.id,
			session.id,
			'login',
			{ welcome_points: 50 },
			window.location.href
		);

		// 5. Redirect to dashboard
		goto('/dashboard');
	}
</script>
```

### 2. Activity Tracking (Any Page)

```svelte
<script lang="ts">
	import { db } from '$lib/supabase';
	import { onMount } from 'svelte';

	onMount(() => {
		const sessionId = localStorage.getItem('student_session_id');
		if (sessionId) {
			// Update last activity timestamp
			db.updateSessionActivity(sessionId);

			// Log page view
			const studentId = getCurrentStudentId(); // Your function
			db.logStudentActivity(
				studentId,
				sessionId,
				'page_view',
				{ page_name: 'Quiz Page' },
				window.location.href
			);
		}
	});
</script>
```

### 3. Logout Flow

```svelte
<script lang="ts">
	import { db } from '$lib/supabase';

	async function handleLogout() {
		const sessionId = localStorage.getItem('student_session_id');
		if (sessionId) {
			// Close session
			await db.closeStudentSession(sessionId);

			// Clear localStorage
			localStorage.removeItem('student_session_id');
		}

		// Redirect to home
		goto('/');
	}
</script>
```

---

## 🎨 Admin UI Components

### Student Detail Modal

Component: `src/lib/components/StudentDetailModal.svelte`

**Props:**

```typescript
interface Props {
	student: Student | null;
	isOpen: boolean;
	onClose: () => void;
}
```

**Usage:**

```svelte
<script>
	let selectedStudent = $state<Student | null>(null);
	let isModalOpen = $state(false);

	function openModal(student: Student) {
		selectedStudent = student;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<StudentDetailModal student={selectedStudent} isOpen={isModalOpen} onClose={closeModal} />
```

**Modal Sections:**

1. Header - Student name & code
2. Info Cards - Kelas, Rombel, Angkatan, Join date
3. Stats Cards - Points, Level, Activity score
4. Login History - Sessions with device info
5. Recent Activities - Last 10 activities
6. Footer - Close & Edit buttons

---

## 🔒 Privacy & Security

### Data Collection

**What We Track:**

- ✅ Login/logout times
- ✅ Browser & OS information
- ✅ Device type (mobile/tablet/desktop)
- ✅ Page visits
- ✅ Activity types & durations
- ⚠️ IP address (optional, can be disabled)

**What We DON'T Track:**

- ❌ Personal messages content
- ❌ Quiz answers (only completion status)
- ❌ Location data (GPS)
- ❌ Keystrokes or mouse movements

### GDPR Compliance

- ✅ Minimal data collection
- ✅ Clear purpose for each data point
- ✅ Data retention policies
- ✅ User can request data deletion
- ✅ Aggregated stats only for analytics

### Security Measures

- ✅ Session tokens (UUID v4)
- ✅ Automatic session expiry
- ✅ IP address optional
- ✅ No sensitive data in activity_data
- ✅ Row Level Security (RLS) in Supabase

---

## 📊 Analytics & Insights

### Available Metrics

**From student_sessions:**

- Total logins per student
- Login frequency patterns
- Device preferences (mobile vs desktop)
- Browser distribution
- Active vs expired sessions
- Session duration statistics

**From student_activity_log:**

- Most popular features
- Time spent per activity type
- Engagement patterns (hourly/daily)
- Feature usage frequency
- Points earning patterns

**From student_login_stats:**

- Login streaks (current & longest)
- First login date
- Last login date
- Activity distribution
- Device & browser preferences

### Example Queries

```typescript
// Get most active students (last 7 days)
const recentActivities = await supabase
	.from('student_activity_log')
	.select('student_id, count(*)')
	.gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
	.group('student_id')
	.order('count', { ascending: false })
	.limit(10);

// Get login patterns by hour
const hourlyLogins = await supabase
	.from('student_sessions')
	.select('login_at')
	.gte('login_at', startDate)
	.lte('login_at', endDate);

// Calculate hourly distribution
const byHour = hourlyLogins.data.reduce((acc, session) => {
	const hour = new Date(session.login_at).getHours();
	acc[hour] = (acc[hour] || 0) + 1;
	return acc;
}, {});
```

---

## 🚀 Implementation Guide

### Step 1: Setup (Already Done ✅)

```bash
# 1. Run migration
pnpx supabase db push

# 2. Migration file applied:
# supabase/migrations/20251014000004_add_student_activity_tracking.sql
```

### Step 2: Track Login (Already Implemented ✅)

File: `src/routes/unlock/+page.svelte`

```typescript
// On successful login
const deviceInfo = getDeviceInfo();
const session = await db.createStudentSession(student.id, deviceInfo);
localStorage.setItem('student_session_id', session.id);

await db.logStudentActivity(
	student.id,
	session.id,
	'login',
	{ welcome_points: 50 },
	window.location.href
);
```

### Step 3: Track Activities (To Implement)

Add to any page where you want to track activities:

```typescript
// Example: Quiz completion
const sessionId = localStorage.getItem('student_session_id');
if (sessionId) {
	await db.logStudentActivity(
		studentId,
		sessionId,
		'quiz',
		{
			quiz_id: 'career-exploration',
			score: 85,
			points_earned: 10
		},
		'/dashboard/quiz',
		120 // duration in seconds
	);
}
```

### Step 4: Track Logout (To Implement)

```typescript
// On logout button click
const sessionId = localStorage.getItem('student_session_id');
if (sessionId) {
	await db.closeStudentSession(sessionId);
	localStorage.removeItem('student_session_id');
}
```

---

## 🎨 UI Components

### Student Detail Modal

**Location:** `src/lib/components/StudentDetailModal.svelte`

**Features:**

- Real-time data loading
- Loading states
- Error handling
- Responsive design
- Accessibility (ARIA labels, keyboard navigation)

**Data Display:**

```
┌─────────────────────────────────────────────┐
│ 👤 Student Name                             │
│ STUDENTCODE2025                             │
├─────────────────────────────────────────────┤
│ Info: [Kelas] [Angkatan] [Joined]          │
│ Stats: [Points] [Level] [Activity %]       │
├─────────────────────────────────────────────┤
│ 🔐 Login History                            │
│ • Chrome on Windows - Active - Oct 14 15:30│
│ • Safari on iPhone - Expired - Oct 13 10:20│
├─────────────────────────────────────────────┤
│ 📝 Recent Activities                        │
│ • Login - +50 pts - Oct 14 15:30           │
│ • Quiz - +10 pts - Oct 14 15:45            │
└─────────────────────────────────────────────┘
```

---

## 🧹 Maintenance

### Cleanup Script

**Location:** `scripts/cleanup-students.ts`

**Purpose:**

- Remove duplicate students
- Reset all progress (points, levels)
- Clear all tracking data
- Fresh start for testing

**Usage:**

```bash
npx tsx scripts/cleanup-students.ts
```

**What It Does:**

1. Fetch all students
2. Identify duplicates by student_code
3. Keep oldest, delete newer duplicates
4. Reset points: 0, level: 1
5. Clear student_sessions table
6. Clear student_activity_log table
7. Clear student_login_stats table
8. Display summary

---

## 📊 Best Practices

### 1. Session Management

✅ **DO:**

- Create session immediately after successful login
- Store session_id in localStorage
- Update last_activity_at periodically (every 5 minutes)
- Close session on explicit logout

❌ **DON'T:**

- Create multiple sessions for same student
- Store sensitive data in activity_data
- Track every mouse movement (too granular)
- Keep sessions active indefinitely

### 2. Activity Logging

✅ **DO:**

- Log meaningful activities (quiz, chat, achievement)
- Include relevant context in activity_data
- Use consistent activity_type naming
- Log page_url for navigation tracking

❌ **DON'T:**

- Log every page view (too noisy)
- Include personal/sensitive information
- Log without session_id
- Use activity_data for large binary data

### 3. Performance

✅ **DO:**

- Use indexes on frequently queried columns
- Limit activity log queries (last 10-50)
- Aggregate data in login_stats table
- Use database triggers for auto-updates

❌ **DON'T:**

- Query all activities without limit
- Perform heavy computations in real-time
- Skip pagination for large datasets
- Ignore database indexes

---

## 🔍 Troubleshooting

### Issue: No sessions showing in modal

**Possible Causes:**

1. Student hasn't logged in after tracking implementation
2. Session creation failed (check console)
3. Database connection issue

**Solution:**

- Ask student to logout and login again
- Check browser console for errors
- Verify database migration applied
- Test with `npx tsx scripts/cleanup-students.ts` then fresh login

### Issue: Activities not being logged

**Possible Causes:**

1. session_id not in localStorage
2. logStudentActivity() not called
3. Database permission issue

**Solution:**

- Verify session_id exists: `localStorage.getItem('student_session_id')`
- Check if logStudentActivity() is called in your code
- Verify Supabase RLS policies

### Issue: Duplicate sessions

**Possible Causes:**

1. Multiple login attempts
2. Session not closed properly
3. localStorage not cleared

**Solution:**

- Close old sessions before creating new one
- Implement proper logout flow
- Clear localStorage on logout

---

## 🚀 Future Enhancements

### Planned Features:

1. ⏳ **Real-time Dashboard** - Live activity feed
2. ⏳ **Session Analytics** - Average session duration, peak hours
3. ⏳ **Engagement Scoring** - Calculate engagement score per student
4. ⏳ **Anomaly Detection** - Detect unusual patterns
5. ⏳ **Export Reports** - PDF/CSV with activity data
6. ⏳ **Activity Heatmap** - Visual representation of activity patterns
7. ⏳ **Device Management** - View/manage active sessions
8. ⏳ **Geolocation** - Optional location tracking (with consent)

### Advanced Analytics:

- Time-series analysis of engagement
- Cohort analysis (by angkatan, kelas)
- Feature adoption rates
- Retention metrics
- Churn prediction

---

## 📖 Related Documentation

- [Students Table Features](./STUDENTS-TABLE-FEATURES.md) - Table UI & features
- [Admin Guide](./ADMIN-GUIDE.md) - Admin dashboard usage
- [Database Schema](./SUPABASE-MIGRATION-GUIDE.md) - Database structure

---

## 🔗 Quick Links

**Database Functions:**

- `createStudentSession()` - Create session
- `logStudentActivity()` - Log activity
- `updateSessionActivity()` - Update timestamp
- `closeStudentSession()` - Close session
- `getStudentSessions()` - Get sessions
- `getStudentActivities()` - Get activities
- `getStudentLoginStats()` - Get stats
- `getStudentDetailData()` - Get all data

**Utilities:**

- `getDeviceInfo()` - Get device information
- `detectBrowser()` - Detect browser
- `detectOS()` - Detect operating system
- `detectDeviceType()` - Detect device type

**Scripts:**

- `scripts/cleanup-students.ts` - Database cleanup

---

**Last Updated:** October 14, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

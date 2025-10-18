# We Will Shine - Technical Architecture & Implementation Guide

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Frontend Architecture](#frontend-architecture)
- [Backend Integration](#backend-integration)
- [Authentication Flow](#authentication-flow)
- [Data Models](#data-models)
- [API Specifications](#api-specifications)
- [Security Implementation](#security-implementation)
- [Deployment Strategy](#deployment-strategy)
- [Development Guidelines](#development-guidelines)
- [Testing Strategy](#testing-strategy)

---

## System Overview

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    We Will Shine Frontend                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Landing   │  │    App      │  │     Dashboard       │ │
│  │    Page     │  │  (Student)  │  │    (Admin)          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Auth      │  │   2USE      │  │    Settings         │ │
│  │  System     │  │ Dashboard   │  │   (BYOK)            │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    2USE Ecosystem                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   LLM       │  │   AI Agent  │  │    Analytics        │ │
│  │  Engine     │  │  Framework  │  │     Engine           │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Data      │  │ Integration │  │    Marketplace      │ │
│  │ Processing │  │    APIs     │  │    (Agents)         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                External Services                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   OpenAI    │  │   Claude     │  │     Gemini          │ │
│  │   (BYOK)    │  │   (BYOK)    │  │     (BYOK)          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Google    │  │   Sistem    │  │    Custom LLM       │ │
│  │    OAuth    │  │  Akademik   │  │    Providers        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: SvelteKit, TypeScript, Tailwind CSS
- **State Management**: Svelte Stores, localStorage/sessionStorage
- **Authentication**: OAuth 2.0, JWT, 2FA
- **Backend**: 2USE (Python/Node.js)
- **Database**: PostgreSQL, Redis
- **AI/ML**: OpenAI API, Anthropic Claude, Google AI
- **Deployment**: Docker, Kubernetes, GitHub Pages

---

## Frontend Architecture

### Route Structure

```
src/routes/
├── +page.svelte                    # Landing page
├── +error.svelte                   # Error page
├── +layout.svelte                  # Root layout
├── app/                            # Student application
│   ├── (main)/                     # Main student routes
│   │   ├── +layout.svelte          # Student layout
│   │   ├── +page.svelte            # Student dashboard
│   │   ├── careers/                # Career guidance
│   │   ├── quiz/                   # Learning assessments
│   │   └── profile/                # Student profile
│   └── (ai-mentor)/                # AI mentor routes
│       ├── +layout.svelte          # AI mentor layout
│       ├── +page.svelte            # AI mentor chat
│       └── sessions/               # Learning sessions
├── dashboard/                      # Admin dashboard
│   ├── +layout.svelte              # Admin layout
│   ├── +page.svelte                # Admin dashboard
│   ├── students/                    # Student management
│   ├── settings/                   # System settings
│   └── analytics/                  # Analytics dashboard
├── login/                          # Admin login
├── unlock/                         # Student unlock
└── 2use/                           # 2USE dashboard
    ├── +layout.svelte              # 2USE layout
    ├── +page.svelte                 # 2USE dashboard
    ├── agents/                      # AI agent management
    ├── marketplace/                # Agent marketplace
    └── workflows/                   # Visual workflow editor
```

### Component Architecture

```
src/lib/
├── components/                      # Reusable components
│   ├── ui/                         # Basic UI components
│   │   ├── Button.svelte
│   │   ├── Input.svelte
│   │   ├── Modal.svelte
│   │   └── Card.svelte
│   ├── forms/                      # Form components
│   │   ├── LoginForm.svelte
│   │   ├── SettingsForm.svelte
│   │   └── ProfileForm.svelte
│   ├── charts/                     # Data visualization
│   │   ├── ProgressChart.svelte
│   │   ├── AnalyticsChart.svelte
│   │   └── LearningPath.svelte
│   └── ai/                         # AI-specific components
│       ├── ChatInterface.svelte
│       ├── AgentCard.svelte
│       └── WorkflowEditor.svelte
├── stores/                         # State management
│   ├── session.ts                  # Session management
│   ├── settings.ts                 # App settings
│   ├── user.ts                     # User state
│   └── ai.ts                       # AI state
├── utils/                          # Utility functions
│   ├── auth.ts                     # Authentication helpers
│   ├── api.ts                      # API client
│   ├── validation.ts               # Form validation
│   └── analytics.ts                # Analytics helpers
└── types/                          # TypeScript definitions
    ├── user.ts                     # User types
    ├── ai.ts                       # AI types
    └── api.ts                      # API types
```

### State Management Strategy

```typescript
// Session Store (localStorage with auto-expiry)
interface SessionData {
	code: string;
	timestamp: number;
	expiresAt: number;
}

// User Store (reactive user state)
interface UserState {
	id: string;
	role: 'student' | 'admin' | 'teacher';
	profile: UserProfile;
	preferences: UserPreferences;
	session: SessionData;
}

// AI Store (AI interaction state)
interface AIState {
	currentAgent: string;
	conversationHistory: Message[];
	learningProgress: ProgressData;
	mentalHealthStatus: HealthStatus;
}
```

---

## Backend Integration

### 2USE API Integration

```typescript
// API Client Configuration
interface USEConfig {
	baseUrl: string;
	apiKey: string;
	timeout: number;
	retryAttempts: number;
}

// API Endpoints
const API_ENDPOINTS = {
	// Authentication
	AUTH: {
		LOGIN: '/auth/login',
		REFRESH: '/auth/refresh',
		LOGOUT: '/auth/logout',
		VERIFY: '/auth/verify'
	},

	// AI Services
	AI: {
		CHAT: '/ai/chat',
		AGENTS: '/ai/agents',
		WORKFLOWS: '/ai/workflows',
		ANALYTICS: '/ai/analytics'
	},

	// User Management
	USERS: {
		PROFILE: '/users/profile',
		PREFERENCES: '/users/preferences',
		PROGRESS: '/users/progress'
	},

	// Learning
	LEARNING: {
		PATHS: '/learning/paths',
		ASSESSMENTS: '/learning/assessments',
		RECOMMENDATIONS: '/learning/recommendations'
	}
};
```

### Data Flow Architecture

```typescript
// Request Flow
class APIRequest {
	async send(endpoint: string, data: any): Promise<APIResponse> {
		// 1. Authentication check
		const token = await this.getValidToken();

		// 2. Request preparation
		const request = this.prepareRequest(endpoint, data, token);

		// 3. Send to 2USE
		const response = await this.sendToUSE(request);

		// 4. Process response
		return this.processResponse(response);
	}

	private async getValidToken(): Promise<string> {
		// Check token validity and refresh if needed
	}

	private prepareRequest(endpoint: string, data: any, token: string): Request {
		// Prepare authenticated request
	}

	private async sendToUSE(request: Request): Promise<Response> {
		// Send to 2USE backend
	}

	private processResponse(response: Response): APIResponse {
		// Process and validate response
	}
}
```

---

## Authentication Flow

### Dual Authentication System

#### 1. Public Users (Google OAuth)

```typescript
// Google OAuth Flow
class GoogleAuth {
	async initiateLogin(): Promise<void> {
		const authUrl = this.buildAuthUrl();
		window.location.href = authUrl;
	}

	async handleCallback(code: string): Promise<UserSession> {
		const tokens = await this.exchangeCodeForTokens(code);
		const userInfo = await this.getUserInfo(tokens.access_token);
		return this.createSession(userInfo, tokens);
	}

	private buildAuthUrl(): string {
		const params = new URLSearchParams({
			client_id: GOOGLE_CLIENT_ID,
			redirect_uri: GOOGLE_REDIRECT_URI,
			scope: 'openid email profile',
			response_type: 'code',
			state: this.generateState()
		});

		return `https://accounts.google.com/oauth/authorize?${params}`;
	}
}
```

#### 2. School-Affiliated Users (2FA)

```typescript
// School Authentication Flow
class SchoolAuth {
	async login(credentials: SchoolCredentials): Promise<AuthResponse> {
		// 1. Validate credentials with school system
		const validation = await this.validateWithSchool(credentials);

		if (!validation.valid) {
			throw new Error('Invalid credentials');
		}

		// 2. Initiate 2FA
		const twoFactorToken = await this.initiate2FA(validation.userId);

		return {
			requires2FA: true,
			twoFactorToken,
			userId: validation.userId
		};
	}

	async verify2FA(token: string, code: string): Promise<UserSession> {
		const verification = await this.verifyTwoFactorCode(token, code);

		if (!verification.valid) {
			throw new Error('Invalid 2FA code');
		}

		return this.createSchoolSession(verification.user);
	}
}
```

### Session Management

```typescript
// Session Store Implementation
class SessionManager {
	private readonly SESSION_KEY = 'student_session';
	private readonly EXPIRY_DAYS = 7;

	setSession(sessionData: SessionData): void {
		const session: SessionData = {
			...sessionData,
			timestamp: Date.now(),
			expiresAt: Date.now() + this.EXPIRY_DAYS * 24 * 60 * 60 * 1000
		};

		localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
	}

	getSession(): SessionData | null {
		const stored = localStorage.getItem(this.SESSION_KEY);
		if (!stored) return null;

		try {
			const session: SessionData = JSON.parse(stored);

			if (Date.now() > session.expiresAt) {
				this.clearSession();
				return null;
			}

			return session;
		} catch {
			this.clearSession();
			return null;
		}
	}

	clearSession(): void {
		localStorage.removeItem(this.SESSION_KEY);
	}

	isSessionValid(): boolean {
		return this.getSession() !== null;
	}
}
```

---

## Data Models

### User Models

```typescript
// User Profile
interface UserProfile {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: UserRole;
	schoolId?: string;
	studentCode?: string;
	preferences: UserPreferences;
	createdAt: Date;
	updatedAt: Date;
}

// User Preferences
interface UserPreferences {
	language: string;
	theme: 'light' | 'dark' | 'auto';
	notifications: NotificationSettings;
	learning: LearningPreferences;
	privacy: PrivacySettings;
}

// Learning Preferences
interface LearningPreferences {
	learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	subjects: string[];
	goals: LearningGoal[];
	timezone: string;
}
```

### AI Models

```typescript
// AI Agent
interface AIAgent {
	id: string;
	name: string;
	description: string;
	type: 'mentor' | 'psychologist' | 'psychiatrist' | 'custom';
	capabilities: AgentCapability[];
	configuration: AgentConfig;
	createdBy: string;
	isPublic: boolean;
	rating: number;
	usageCount: number;
}

// Learning Session
interface LearningSession {
	id: string;
	userId: string;
	agentId: string;
	topic: string;
	messages: ChatMessage[];
	progress: SessionProgress;
	startedAt: Date;
	endedAt?: Date;
	duration?: number;
}

// Mental Health Assessment
interface MentalHealthAssessment {
	id: string;
	userId: string;
	assessmentType: 'stress' | 'anxiety' | 'depression' | 'general';
	questions: AssessmentQuestion[];
	responses: AssessmentResponse[];
	score: number;
	recommendations: string[];
	assessedAt: Date;
}
```

### Analytics Models

```typescript
// Learning Analytics
interface LearningAnalytics {
	userId: string;
	period: 'daily' | 'weekly' | 'monthly';
	metrics: {
		studyTime: number;
		sessionsCompleted: number;
		goalsAchieved: number;
		productivityScore: number;
		stressLevel: number;
		engagementScore: number;
	};
	trends: AnalyticsTrend[];
	insights: LearningInsight[];
	generatedAt: Date;
}

// Progress Tracking
interface ProgressTracking {
	userId: string;
	subject: string;
	currentLevel: number;
	targetLevel: number;
	completionPercentage: number;
	milestones: Milestone[];
	nextSteps: string[];
	lastUpdated: Date;
}
```

---

## API Specifications

### REST API Endpoints

#### Authentication Endpoints

```typescript
// POST /api/auth/login
interface LoginRequest {
	email: string;
	password: string;
	authType: 'google' | 'school';
}

interface LoginResponse {
	success: boolean;
	token?: string;
	requires2FA?: boolean;
	twoFactorToken?: string;
	user?: UserProfile;
}

// POST /api/auth/verify-2fa
interface Verify2FARequest {
	token: string;
	code: string;
}

// POST /api/auth/refresh
interface RefreshRequest {
	refreshToken: string;
}
```

#### AI Service Endpoints

```typescript
// POST /api/ai/chat
interface ChatRequest {
	message: string;
	agentId: string;
	context?: ChatContext;
	sessionId?: string;
}

interface ChatResponse {
	message: string;
	agentId: string;
	sessionId: string;
	timestamp: Date;
	metadata?: ChatMetadata;
}

// GET /api/ai/agents
interface GetAgentsRequest {
	type?: string;
	category?: string;
	search?: string;
	limit?: number;
	offset?: number;
}

interface GetAgentsResponse {
	agents: AIAgent[];
	total: number;
	hasMore: boolean;
}
```

#### Learning Endpoints

```typescript
// GET /api/learning/progress
interface GetProgressRequest {
	userId: string;
	subject?: string;
	period?: string;
}

interface GetProgressResponse {
	progress: ProgressTracking;
	analytics: LearningAnalytics;
	recommendations: string[];
}

// POST /api/learning/assess
interface AssessmentRequest {
	userId: string;
	assessmentType: string;
	responses: AssessmentResponse[];
}

interface AssessmentResponse {
	questionId: string;
	answer: string | number;
	timestamp: Date;
}
```

---

## Security Implementation

### Data Protection

```typescript
// Encryption Service
class EncryptionService {
	private readonly algorithm = 'AES-GCM';
	private readonly keyLength = 256;

	async encrypt(data: string, key: string): Promise<string> {
		const cryptoKey = await this.importKey(key);
		const iv = crypto.getRandomValues(new Uint8Array(12));
		const encrypted = await crypto.subtle.encrypt(
			{ name: this.algorithm, iv },
			cryptoKey,
			new TextEncoder().encode(data)
		);

		return this.serialize(encrypted, iv);
	}

	async decrypt(encryptedData: string, key: string): Promise<string> {
		const { data, iv } = this.deserialize(encryptedData);
		const cryptoKey = await this.importKey(key);
		const decrypted = await crypto.subtle.decrypt({ name: this.algorithm, iv }, cryptoKey, data);

		return new TextDecoder().decode(decrypted);
	}
}
```

### Input Validation

```typescript
// Validation Schemas
const validationSchemas = {
	userProfile: z.object({
		name: z.string().min(2).max(100),
		email: z.string().email(),
		role: z.enum(['student', 'admin', 'teacher']),
		preferences: z.object({
			language: z.string().min(2).max(10),
			theme: z.enum(['light', 'dark', 'auto']),
			notifications: z.object({
				email: z.boolean(),
				push: z.boolean(),
				sms: z.boolean()
			})
		})
	}),

	chatMessage: z.object({
		message: z.string().min(1).max(1000),
		agentId: z.string().uuid(),
		context: z
			.object({
				subject: z.string().optional(),
				difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional()
			})
			.optional()
	})
};
```

### Rate Limiting

```typescript
// Rate Limiter
class RateLimiter {
	private readonly limits = new Map<string, RateLimit>();

	async checkLimit(identifier: string, action: string): Promise<boolean> {
		const key = `${identifier}:${action}`;
		const limit = this.limits.get(key);

		if (!limit) {
			this.limits.set(key, {
				count: 1,
				resetTime: Date.now() + this.getResetTime(action)
			});
			return true;
		}

		if (Date.now() > limit.resetTime) {
			limit.count = 1;
			limit.resetTime = Date.now() + this.getResetTime(action);
			return true;
		}

		if (limit.count >= this.getMaxRequests(action)) {
			return false;
		}

		limit.count++;
		return true;
	}

	private getMaxRequests(action: string): number {
		const limits = {
			chat: 100, // 100 messages per hour
			login: 5, // 5 login attempts per hour
			api: 1000, // 1000 API calls per hour
			upload: 10 // 10 file uploads per hour
		};

		return limits[action] || 100;
	}
}
```

---

## Deployment Strategy

### Environment Configuration

```typescript
// Environment Variables
interface EnvironmentConfig {
	// Application
	NODE_ENV: 'development' | 'production' | 'test';
	PORT: number;
	BASE_URL: string;

	// Database
	DATABASE_URL: string;
	REDIS_URL: string;

	// Authentication
	JWT_SECRET: string;
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;

	// AI Services
	OPENAI_API_KEY: string;
	ANTHROPIC_API_KEY: string;
	GOOGLE_AI_API_KEY: string;

	// 2USE Integration
	USE_API_URL: string;
	USE_API_KEY: string;

	// Monitoring
	SENTRY_DSN: string;
	LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run lint
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

---

## Development Guidelines

### Code Standards

```typescript
// TypeScript Configuration
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Component Guidelines

```typescript
// Component Structure Template
<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentProps } from './types';

  // Props
  export let prop1: string;
  export let prop2: number = 0;
  export let prop3: boolean = false;

  // State
  let state1: string = '';
  let state2: number = 0;

  // Computed values
  $: computedValue = prop1 + prop2;

  // Lifecycle
  onMount(() => {
    // Component initialization
  });

  // Methods
  function handleClick() {
    // Event handling
  }
</script>

<!-- Template -->
<div class="component-container">
  <h2>{prop1}</h2>
  <button on:click={handleClick}>
    Click me
  </button>
</div>

<!-- Styles -->
<style>
  .component-container {
    @apply p-4 bg-white rounded-lg shadow-md;
  }
</style>
```

### Error Handling

```typescript
// Error Handling Strategy
class ErrorHandler {
	static handle(error: Error, context: string): void {
		console.error(`[${context}] ${error.message}`, error);

		// Send to monitoring service
		if (typeof window !== 'undefined' && window.Sentry) {
			window.Sentry.captureException(error, {
				tags: { context },
				level: 'error'
			});
		}

		// Show user-friendly message
		this.showUserMessage(error);
	}

	private static showUserMessage(error: Error): void {
		const message = this.getUserFriendlyMessage(error);
		// Show toast notification or modal
	}

	private static getUserFriendlyMessage(error: Error): string {
		const messages = {
			NetworkError: 'Koneksi internet bermasalah. Silakan coba lagi.',
			ValidationError: 'Data yang dimasukkan tidak valid.',
			AuthenticationError: 'Sesi telah berakhir. Silakan login kembali.',
			PermissionError: 'Anda tidak memiliki izin untuk melakukan aksi ini.'
		};

		return messages[error.name] || 'Terjadi kesalahan. Silakan coba lagi.';
	}
}
```

---

## Testing Strategy

### Unit Testing

```typescript
// Test Configuration
import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Component from './Component.svelte';

describe('Component', () => {
	beforeEach(() => {
		// Setup
	});

	it('should render correctly', () => {
		const { getByText } = render(Component, {
			props: { prop1: 'test' }
		});

		expect(getByText('test')).toBeInTheDocument();
	});

	it('should handle user interaction', async () => {
		const { getByRole } = render(Component);
		const button = getByRole('button');

		await fireEvent.click(button);

		// Assertions
	});
});
```

### Integration Testing

```typescript
// API Integration Tests
describe('API Integration', () => {
	it('should authenticate user successfully', async () => {
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: 'test@example.com',
				password: 'password123'
			})
		});

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.token).toBeDefined();
	});
});
```

### E2E Testing

```typescript
// Playwright E2E Tests
import { test, expect } from '@playwright/test';

test('user can complete learning session', async ({ page }) => {
	await page.goto('/app');

	// Login
	await page.fill('[data-testid="email"]', 'student@example.com');
	await page.fill('[data-testid="password"]', 'password123');
	await page.click('[data-testid="login-button"]');

	// Navigate to AI mentor
	await page.click('[data-testid="ai-mentor-nav"]');

	// Start conversation
	await page.fill('[data-testid="chat-input"]', 'Hello, I need help with math');
	await page.click('[data-testid="send-button"]');

	// Verify response
	await expect(page.locator('[data-testid="chat-message"]')).toContainText("I'd be happy to help");
});
```

---

## Conclusion

This technical architecture document provides a comprehensive guide for implementing We Will Shine as a frontend for the 2USE ecosystem. The architecture emphasizes:

1. **Modularity**: Clear separation of concerns between frontend and backend
2. **Scalability**: Architecture that can grow with user demand
3. **Security**: Comprehensive security measures for data protection
4. **Maintainability**: Clean code structure and testing strategies
5. **Performance**: Optimized for speed and efficiency

The implementation should follow these guidelines to ensure a robust, secure, and scalable platform that can effectively serve the educational community while maintaining the highest standards of quality and user experience.

---

_Last Updated: December 2024_  
_Version: 1.0_  
_Next Review: March 2025_

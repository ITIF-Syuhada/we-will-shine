# We Will Shine - API Documentation & Integration Guide

## 📋 Table of Contents

- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Core APIs](#core-apis)
- [AI Services](#ai-services)
- [Learning APIs](#learning-apis)
- [Analytics APIs](#analytics-apis)
- [Webhooks](#webhooks)
- [SDKs & Libraries](#sdks--libraries)
- [Rate Limits](#rate-limits)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## API Overview

### Base URLs

- **Production**: `https://api.we-will-shine.org/v1`
- **Staging**: `https://staging-api.we-will-shine.org/v1`
- **Development**: `http://localhost:3000/api/v1`

### API Versioning

- **Current Version**: v1
- **Version Header**: `API-Version: v1`
- **Deprecation Policy**: 6 months notice for breaking changes

### Response Format

All API responses follow a consistent format:

```json
{
	"success": true,
	"data": {
		// Response data
	},
	"meta": {
		"timestamp": "2024-12-01T10:00:00Z",
		"requestId": "req_123456789",
		"version": "v1"
	},
	"errors": []
}
```

### Error Format

```json
{
	"success": false,
	"data": null,
	"meta": {
		"timestamp": "2024-12-01T10:00:00Z",
		"requestId": "req_123456789",
		"version": "v1"
	},
	"errors": [
		{
			"code": "VALIDATION_ERROR",
			"message": "Invalid email format",
			"field": "email",
			"details": {
				"expected": "valid email address",
				"received": "invalid-email"
			}
		}
	]
}
```

---

## Authentication

### Authentication Methods

#### 1. JWT Token Authentication

```http
Authorization: Bearer <jwt_token>
```

#### 2. API Key Authentication

```http
X-API-Key: <api_key>
```

#### 3. OAuth 2.0 (for third-party integrations)

```http
Authorization: Bearer <oauth_access_token>
```

### Token Management

#### Login Endpoint

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "authType": "google" | "school"
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"refreshToken": "refresh_token_here",
		"expiresIn": 3600,
		"user": {
			"id": "user_123",
			"email": "user@example.com",
			"name": "John Doe",
			"role": "student",
			"permissions": ["read:profile", "write:learning"]
		}
	}
}
```

#### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

#### Logout

```http
POST /auth/logout
Authorization: Bearer <jwt_token>
```

### School Authentication (2FA)

#### Step 1: Initial Login

```http
POST /auth/school-login
Content-Type: application/json

{
  "studentCode": "NAYIKUVIIIC2025",
  "password": "password123"
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"requires2FA": true,
		"twoFactorToken": "2fa_token_here",
		"userId": "user_123",
		"message": "Please check your registered device for 2FA code"
	}
}
```

#### Step 2: Verify 2FA

```http
POST /auth/verify-2fa
Content-Type: application/json

{
  "twoFactorToken": "2fa_token_here",
  "code": "123456"
}
```

---

## Core APIs

### User Management

#### Get User Profile

```http
GET /users/profile
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
	"success": true,
	"data": {
		"id": "user_123",
		"email": "user@example.com",
		"name": "John Doe",
		"avatar": "https://cdn.we-will-shine.org/avatars/user_123.jpg",
		"role": "student",
		"schoolId": "school_456",
		"studentCode": "NAYIKUVIIIC2025",
		"preferences": {
			"language": "id",
			"theme": "light",
			"notifications": {
				"email": true,
				"push": true,
				"sms": false
			},
			"learning": {
				"learningStyle": "visual",
				"difficulty": "intermediate",
				"subjects": ["mathematics", "physics"],
				"goals": [
					{
						"id": "goal_1",
						"title": "Improve math skills",
						"target": "advanced",
						"deadline": "2024-06-01"
					}
				]
			}
		},
		"createdAt": "2024-01-01T00:00:00Z",
		"updatedAt": "2024-12-01T10:00:00Z"
	}
}
```

#### Update User Profile

```http
PUT /users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Smith",
  "preferences": {
    "theme": "dark",
    "notifications": {
      "email": false
    }
  }
}
```

#### Get User Preferences

```http
GET /users/preferences
Authorization: Bearer <jwt_token>
```

#### Update User Preferences

```http
PUT /users/preferences
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "learning": {
    "learningStyle": "auditory",
    "difficulty": "advanced",
    "subjects": ["mathematics", "physics", "chemistry"]
  },
  "privacy": {
    "dataSharing": false,
    "analytics": true
  }
}
```

### Learning Progress

#### Get Learning Progress

```http
GET /learning/progress
Authorization: Bearer <jwt_token>
Query Parameters:
- subject: string (optional)
- period: "daily" | "weekly" | "monthly" (default: "weekly")
- startDate: ISO date string (optional)
- endDate: ISO date string (optional)
```

**Response:**

```json
{
	"success": true,
	"data": {
		"userId": "user_123",
		"period": "weekly",
		"metrics": {
			"studyTime": 1440, // minutes
			"sessionsCompleted": 12,
			"goalsAchieved": 3,
			"productivityScore": 85,
			"stressLevel": 2, // 1-5 scale
			"engagementScore": 92
		},
		"trends": [
			{
				"date": "2024-11-25",
				"studyTime": 120,
				"productivityScore": 80,
				"stressLevel": 3
			},
			{
				"date": "2024-11-26",
				"studyTime": 150,
				"productivityScore": 85,
				"stressLevel": 2
			}
		],
		"insights": [
			{
				"type": "achievement",
				"message": "Great job! You've improved your math skills by 15% this week.",
				"confidence": 0.9
			},
			{
				"type": "recommendation",
				"message": "Consider taking breaks every 45 minutes to maintain focus.",
				"confidence": 0.8
			}
		],
		"generatedAt": "2024-12-01T10:00:00Z"
	}
}
```

#### Update Learning Goal

```http
PUT /learning/goals/{goalId}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Master calculus",
  "target": "advanced",
  "deadline": "2024-06-01",
  "milestones": [
    {
      "title": "Complete derivatives",
      "deadline": "2024-03-01"
    },
    {
      "title": "Complete integrals",
      "deadline": "2024-05-01"
    }
  ]
}
```

---

## AI Services

### Chat API

#### Send Message

```http
POST /ai/chat
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "I need help with calculus derivatives",
  "agentId": "agent_math_tutor",
  "context": {
    "subject": "mathematics",
    "difficulty": "intermediate",
    "currentTopic": "derivatives",
    "sessionId": "session_789"
  },
  "sessionId": "session_789" // optional, will create new if not provided
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"message": "I'd be happy to help you with calculus derivatives! Let's start with the basic concept. A derivative represents the rate of change of a function at any given point...",
		"agentId": "agent_math_tutor",
		"sessionId": "session_789",
		"timestamp": "2024-12-01T10:00:00Z",
		"metadata": {
			"confidence": 0.95,
			"responseTime": 1.2,
			"tokensUsed": 150,
			"suggestions": [
				"Would you like to see some examples?",
				"Should we practice some problems?",
				"Do you want to learn about the chain rule?"
			]
		}
	}
}
```

#### Get Chat History

```http
GET /ai/chat/sessions/{sessionId}
Authorization: Bearer <jwt_token>
Query Parameters:
- limit: number (default: 50)
- offset: number (default: 0)
```

#### Get Available Agents

```http
GET /ai/agents
Authorization: Bearer <jwt_token>
Query Parameters:
- type: "mentor" | "psychologist" | "psychiatrist" | "custom"
- category: string
- search: string
- limit: number (default: 20)
- offset: number (default: 0)
```

**Response:**

```json
{
	"success": true,
	"data": {
		"agents": [
			{
				"id": "agent_math_tutor",
				"name": "Math Tutor AI",
				"description": "Specialized in mathematics tutoring",
				"type": "mentor",
				"capabilities": ["algebra", "calculus", "geometry", "statistics"],
				"rating": 4.8,
				"usageCount": 1250,
				"isPublic": true,
				"createdBy": "user_123",
				"configuration": {
					"personality": "encouraging",
					"difficulty": "adaptive",
					"teachingStyle": "socratic"
				}
			}
		],
		"total": 1,
		"hasMore": false
	}
}
```

### Mental Health Assessment

#### Start Assessment

```http
POST /ai/mental-health/assess
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "assessmentType": "stress",
  "userId": "user_123"
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"assessmentId": "assessment_456",
		"assessmentType": "stress",
		"questions": [
			{
				"id": "q1",
				"question": "How often do you feel overwhelmed by your studies?",
				"type": "scale",
				"options": {
					"min": 1,
					"max": 5,
					"labels": ["Never", "Rarely", "Sometimes", "Often", "Always"]
				}
			},
			{
				"id": "q2",
				"question": "What situations make you feel most stressed?",
				"type": "multiple_choice",
				"options": [
					"Exams and tests",
					"Assignment deadlines",
					"Public speaking",
					"Group projects",
					"Online learning"
				]
			}
		],
		"estimatedDuration": 5, // minutes
		"createdAt": "2024-12-01T10:00:00Z"
	}
}
```

#### Submit Assessment Responses

```http
POST /ai/mental-health/assess/{assessmentId}/responses
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "responses": [
    {
      "questionId": "q1",
      "answer": 3
    },
    {
      "questionId": "q2",
      "answer": ["Exams and tests", "Assignment deadlines"]
    }
  ]
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"assessmentId": "assessment_456",
		"score": 6.5, // out of 10
		"level": "moderate",
		"recommendations": [
			{
				"type": "technique",
				"title": "Breathing Exercises",
				"description": "Practice 4-7-8 breathing technique daily",
				"priority": "high",
				"estimatedTime": "5 minutes"
			},
			{
				"type": "resource",
				"title": "Study Planning",
				"description": "Create a detailed study schedule to reduce last-minute stress",
				"priority": "medium",
				"estimatedTime": "30 minutes"
			}
		],
		"nextAssessment": "2024-12-15T10:00:00Z",
		"completedAt": "2024-12-01T10:05:00Z"
	}
}
```

---

## Learning APIs

### Learning Paths

#### Get Learning Paths

```http
GET /learning/paths
Authorization: Bearer <jwt_token>
Query Parameters:
- subject: string
- difficulty: "beginner" | "intermediate" | "advanced"
- duration: "short" | "medium" | "long"
```

**Response:**

```json
{
	"success": true,
	"data": {
		"paths": [
			{
				"id": "path_calculus_101",
				"title": "Calculus Fundamentals",
				"description": "Learn the basics of calculus",
				"subject": "mathematics",
				"difficulty": "beginner",
				"estimatedDuration": 480, // minutes
				"modules": [
					{
						"id": "module_1",
						"title": "Introduction to Limits",
						"duration": 60,
						"prerequisites": [],
						"objectives": ["Understand the concept of limits", "Calculate basic limits"]
					},
					{
						"id": "module_2",
						"title": "Derivatives",
						"duration": 120,
						"prerequisites": ["module_1"],
						"objectives": ["Learn derivative rules", "Apply derivatives to real problems"]
					}
				],
				"rating": 4.7,
				"enrollmentCount": 1250
			}
		]
	}
}
```

#### Enroll in Learning Path

```http
POST /learning/paths/{pathId}/enroll
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "userId": "user_123",
  "startDate": "2024-12-01T00:00:00Z",
  "targetCompletionDate": "2024-12-31T23:59:59Z"
}
```

#### Get Learning Progress

```http
GET /learning/paths/{pathId}/progress
Authorization: Bearer <jwt_token>
```

### Assessments

#### Create Assessment

```http
POST /learning/assessments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Calculus Quiz - Derivatives",
  "subject": "mathematics",
  "difficulty": "intermediate",
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "What is the derivative of x²?",
      "options": ["x", "2x", "x²", "2x²"],
      "correctAnswer": "2x",
      "points": 10
    },
    {
      "id": "q2",
      "type": "open_ended",
      "question": "Find the derivative of f(x) = 3x³ + 2x² - 5x + 1",
      "points": 20
    }
  ],
  "timeLimit": 30, // minutes
  "maxAttempts": 3
}
```

#### Submit Assessment

```http
POST /learning/assessments/{assessmentId}/submit
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "responses": [
    {
      "questionId": "q1",
      "answer": "2x"
    },
    {
      "questionId": "q2",
      "answer": "f'(x) = 9x² + 4x - 5"
    }
  ],
  "timeSpent": 25 // minutes
}
```

---

## Analytics APIs

### Learning Analytics

#### Get Learning Analytics

```http
GET /analytics/learning
Authorization: Bearer <jwt_token>
Query Parameters:
- userId: string
- period: "daily" | "weekly" | "monthly" | "yearly"
- startDate: ISO date string
- endDate: ISO date string
- subject: string (optional)
```

**Response:**

```json
{
	"success": true,
	"data": {
		"userId": "user_123",
		"period": "weekly",
		"metrics": {
			"totalStudyTime": 1440, // minutes
			"averageSessionLength": 45, // minutes
			"sessionsCompleted": 32,
			"goalsAchieved": 5,
			"productivityScore": 85,
			"engagementScore": 92,
			"stressLevel": 2.3, // 1-5 scale
			"learningVelocity": 1.2, // relative to baseline
			"retentionRate": 0.87
		},
		"trends": {
			"studyTime": {
				"trend": "increasing",
				"change": 15, // percentage
				"data": [
					{ "date": "2024-11-25", "value": 120 },
					{ "date": "2024-11-26", "value": 150 },
					{ "date": "2024-11-27", "value": 180 }
				]
			},
			"productivityScore": {
				"trend": "stable",
				"change": 2,
				"data": [
					{ "date": "2024-11-25", "value": 83 },
					{ "date": "2024-11-26", "value": 85 },
					{ "date": "2024-11-27", "value": 87 }
				]
			}
		},
		"insights": [
			{
				"type": "achievement",
				"title": "Consistent Learning Streak",
				"message": "You've maintained a 7-day learning streak!",
				"confidence": 0.95,
				"impact": "positive"
			},
			{
				"type": "recommendation",
				"title": "Optimize Study Schedule",
				"message": "Your productivity is highest between 9-11 AM. Consider scheduling difficult topics during this time.",
				"confidence": 0.82,
				"impact": "neutral"
			}
		],
		"generatedAt": "2024-12-01T10:00:00Z"
	}
}
```

### Performance Analytics

#### Get Performance Metrics

```http
GET /analytics/performance
Authorization: Bearer <jwt_token>
Query Parameters:
- userId: string
- subject: string (optional)
- assessmentType: string (optional)
- period: "daily" | "weekly" | "monthly"
```

**Response:**

```json
{
	"success": true,
	"data": {
		"userId": "user_123",
		"subject": "mathematics",
		"metrics": {
			"averageScore": 85.5,
			"highestScore": 98,
			"lowestScore": 72,
			"improvementRate": 12.5, // percentage
			"consistency": 0.82, // 0-1 scale
			"difficultyProgression": "steady",
			"timeToMastery": 45 // days
		},
		"assessments": [
			{
				"id": "assessment_1",
				"title": "Algebra Basics",
				"score": 78,
				"date": "2024-11-01T10:00:00Z",
				"timeSpent": 25
			},
			{
				"id": "assessment_2",
				"title": "Calculus Fundamentals",
				"score": 92,
				"date": "2024-11-15T10:00:00Z",
				"timeSpent": 35
			}
		],
		"recommendations": [
			{
				"type": "focus_area",
				"title": "Strengthen Algebra Foundation",
				"description": "Focus on algebraic manipulation skills",
				"priority": "high",
				"estimatedImpact": "15% score improvement"
			}
		]
	}
}
```

---

## Webhooks

### Webhook Configuration

#### Register Webhook

```http
POST /webhooks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/we-will-shine",
  "events": [
    "learning.progress.updated",
    "assessment.completed",
    "goal.achieved",
    "mental_health.assessment.completed"
  ],
  "secret": "your_webhook_secret",
  "active": true
}
```

#### Webhook Events

##### Learning Progress Updated

```json
{
	"event": "learning.progress.updated",
	"timestamp": "2024-12-01T10:00:00Z",
	"data": {
		"userId": "user_123",
		"subject": "mathematics",
		"progress": {
			"percentage": 75,
			"currentModule": "module_3",
			"timeSpent": 120,
			"score": 85
		}
	}
}
```

##### Assessment Completed

```json
{
	"event": "assessment.completed",
	"timestamp": "2024-12-01T10:00:00Z",
	"data": {
		"userId": "user_123",
		"assessmentId": "assessment_456",
		"score": 92,
		"timeSpent": 25,
		"attempts": 1,
		"improvement": 8
	}
}
```

##### Goal Achieved

```json
{
	"event": "goal.achieved",
	"timestamp": "2024-12-01T10:00:00Z",
	"data": {
		"userId": "user_123",
		"goalId": "goal_789",
		"title": "Complete Calculus Module",
		"achievedAt": "2024-12-01T10:00:00Z",
		"timeToAchievement": 14 // days
	}
}
```

---

## SDKs & Libraries

### JavaScript/TypeScript SDK

#### Installation

```bash
npm install @we-will-shine/sdk
```

#### Usage

```typescript
import { WeWillShineClient } from '@we-will-shine/sdk';

const client = new WeWillShineClient({
	apiKey: 'your_api_key',
	baseUrl: 'https://api.we-will-shine.org/v1'
});

// Authentication
const authResponse = await client.auth.login({
	email: 'user@example.com',
	password: 'password123'
});

// Chat with AI
const chatResponse = await client.ai.chat({
	message: 'Help me with calculus',
	agentId: 'agent_math_tutor'
});

// Get learning progress
const progress = await client.learning.getProgress({
	period: 'weekly'
});
```

### Python SDK

#### Installation

```bash
pip install we-will-shine-sdk
```

#### Usage

```python
from we_will_shine import WeWillShineClient

client = WeWillShineClient(
    api_key='your_api_key',
    base_url='https://api.we-will-shine.org/v1'
)

# Authentication
auth_response = client.auth.login(
    email='user@example.com',
    password='password123'
)

# Chat with AI
chat_response = client.ai.chat(
    message='Help me with calculus',
    agent_id='agent_math_tutor'
)

# Get learning progress
progress = client.learning.get_progress(period='weekly')
```

---

## Rate Limits

### Rate Limit Headers

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 60
```

### Rate Limit Tiers

#### Free Tier

- **Requests per hour**: 100
- **Concurrent requests**: 5
- **AI chat messages**: 50 per day
- **Assessments**: 10 per month

#### Premium Tier

- **Requests per hour**: 1,000
- **Concurrent requests**: 50
- **AI chat messages**: 500 per day
- **Assessments**: Unlimited

#### Enterprise Tier

- **Requests per hour**: 10,000
- **Concurrent requests**: 200
- **AI chat messages**: Unlimited
- **Assessments**: Unlimited
- **Priority support**: Yes

### Rate Limit Exceeded Response

```json
{
	"success": false,
	"data": null,
	"errors": [
		{
			"code": "RATE_LIMIT_EXCEEDED",
			"message": "Rate limit exceeded. Try again in 60 seconds.",
			"details": {
				"limit": 1000,
				"remaining": 0,
				"resetTime": "2024-12-01T11:00:00Z"
			}
		}
	]
}
```

---

## Error Handling

### Error Codes

#### Authentication Errors

- `INVALID_CREDENTIALS`: Invalid email or password
- `TOKEN_EXPIRED`: JWT token has expired
- `INVALID_TOKEN`: JWT token is invalid
- `ACCOUNT_LOCKED`: Account is temporarily locked
- `TWO_FA_REQUIRED`: Two-factor authentication required

#### Validation Errors

- `VALIDATION_ERROR`: Request validation failed
- `MISSING_FIELD`: Required field is missing
- `INVALID_FORMAT`: Field format is invalid
- `FIELD_TOO_LONG`: Field exceeds maximum length
- `FIELD_TOO_SHORT`: Field is below minimum length

#### Business Logic Errors

- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `RESOURCE_CONFLICT`: Resource conflict (e.g., duplicate email)
- `QUOTA_EXCEEDED`: User has exceeded their quota
- `FEATURE_NOT_AVAILABLE`: Feature not available for user tier

#### System Errors

- `INTERNAL_SERVER_ERROR`: Internal server error
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable
- `TIMEOUT`: Request timeout
- `RATE_LIMIT_EXCEEDED`: Rate limit exceeded
- `MAINTENANCE_MODE`: System is in maintenance mode

### Error Response Examples

#### Validation Error

```json
{
	"success": false,
	"data": null,
	"errors": [
		{
			"code": "VALIDATION_ERROR",
			"message": "Invalid email format",
			"field": "email",
			"details": {
				"expected": "valid email address",
				"received": "invalid-email"
			}
		},
		{
			"code": "FIELD_TOO_SHORT",
			"message": "Password must be at least 8 characters",
			"field": "password",
			"details": {
				"minimum": 8,
				"received": 6
			}
		}
	]
}
```

#### Permission Error

```json
{
	"success": false,
	"data": null,
	"errors": [
		{
			"code": "INSUFFICIENT_PERMISSIONS",
			"message": "You don't have permission to access this resource",
			"details": {
				"required": "admin",
				"current": "student"
			}
		}
	]
}
```

---

## Examples

### Complete Authentication Flow

```typescript
// 1. Login
const loginResponse = await fetch('/api/v1/auth/login', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		email: 'user@example.com',
		password: 'password123',
		authType: 'google'
	})
});

const loginData = await loginResponse.json();

if (loginData.success) {
	// Store token
	localStorage.setItem('token', loginData.data.token);

	// 2. Get user profile
	const profileResponse = await fetch('/api/v1/users/profile', {
		headers: {
			Authorization: `Bearer ${loginData.data.token}`
		}
	});

	const profileData = await profileResponse.json();
	console.log('User profile:', profileData.data);
}
```

### AI Chat Integration

```typescript
class AIChatService {
	private token: string;

	constructor(token: string) {
		this.token = token;
	}

	async sendMessage(message: string, agentId: string): Promise<string> {
		const response = await fetch('/api/v1/ai/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token}`
			},
			body: JSON.stringify({
				message,
				agentId,
				context: {
					subject: 'mathematics',
					difficulty: 'intermediate'
				}
			})
		});

		const data = await response.json();

		if (data.success) {
			return data.data.message;
		} else {
			throw new Error(data.errors[0].message);
		}
	}

	async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
		const response = await fetch(`/api/v1/ai/chat/sessions/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		});

		const data = await response.json();
		return data.success ? data.data.messages : [];
	}
}

// Usage
const chatService = new AIChatService(token);
const response = await chatService.sendMessage(
	'Help me understand derivatives',
	'agent_math_tutor'
);
console.log('AI Response:', response);
```

### Learning Progress Tracking

```typescript
class LearningTracker {
	private token: string;

	constructor(token: string) {
		this.token = token;
	}

	async getProgress(period: string = 'weekly'): Promise<LearningProgress> {
		const response = await fetch(`/api/v1/learning/progress?period=${period}`, {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		});

		const data = await response.json();
		return data.success ? data.data : null;
	}

	async updateGoal(goalId: string, updates: Partial<LearningGoal>): Promise<void> {
		const response = await fetch(`/api/v1/learning/goals/${goalId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token}`
			},
			body: JSON.stringify(updates)
		});

		const data = await response.json();
		if (!data.success) {
			throw new Error(data.errors[0].message);
		}
	}
}

// Usage
const tracker = new LearningTracker(token);
const progress = await tracker.getProgress('monthly');
console.log('Monthly progress:', progress.metrics);

// Update goal
await tracker.updateGoal('goal_123', {
	target: 'advanced',
	deadline: '2024-06-01'
});
```

---

## Conclusion

This API documentation provides comprehensive guidance for integrating with We Will Shine's platform. The API is designed to be:

1. **RESTful**: Following REST principles for consistency
2. **Secure**: Multiple authentication methods and rate limiting
3. **Scalable**: Built to handle high-volume requests
4. **Developer-friendly**: Clear documentation and SDKs
5. **Extensible**: Webhook support for real-time updates

For additional support or questions:

- **Documentation**: [docs.we-will-shine.org](https://docs.we-will-shine.org)
- **Support**: [support@we-will-shine.org](mailto:support@we-will-shine.org)
- **Community**: [discord.gg/we-will-shine](https://discord.gg/we-will-shine)

---

_Last Updated: December 2024_  
_Version: 1.0_  
_Next Review: March 2025_

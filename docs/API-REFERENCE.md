# We Will Shine - API Reference

## 📋 Table of Contents

- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Error Codes](#error-codes)
- [Rate Limits](#rate-limits)
- [SDKs](#sdks)
- [Examples](#examples)
- [Changelog](#changelog)

---

## API Overview

### Base URL

```
Production:  https://api.we-will-shine.org/v1
Staging:     https://staging-api.we-will-shine.org/v1
Development: http://localhost:3000/api/v1
```

### API Versioning

- **Current Version**: v1
- **Version Header**: `API-Version: v1`
- **Deprecation Policy**: 6 months notice for breaking changes

### Response Format

All API responses follow a consistent JSON format:

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

#### Login

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

## Endpoints

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
			"studyTime": 1440,
			"sessionsCompleted": 12,
			"goalsAchieved": 3,
			"productivityScore": 85,
			"stressLevel": 2,
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

### AI Services

#### Send Chat Message

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
  "sessionId": "session_789"
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
		"estimatedDuration": 5,
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
		"score": 6.5,
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
				"estimatedDuration": 480,
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
  "timeLimit": 30,
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
  "timeSpent": 25
}
```

### Analytics

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
			"totalStudyTime": 1440,
			"averageSessionLength": 45,
			"sessionsCompleted": 32,
			"goalsAchieved": 5,
			"productivityScore": 85,
			"engagementScore": 92,
			"stressLevel": 2.3,
			"learningVelocity": 1.2,
			"retentionRate": 0.87
		},
		"trends": {
			"studyTime": {
				"trend": "increasing",
				"change": 15,
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
			"improvementRate": 12.5,
			"consistency": 0.82,
			"difficultyProgression": "steady",
			"timeToMastery": 45
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

## Data Models

### User Models

#### UserProfile

```typescript
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

enum UserRole {
	STUDENT = 'student',
	TEACHER = 'teacher',
	ADMIN = 'admin'
}

interface UserPreferences {
	language: string;
	theme: 'light' | 'dark' | 'auto';
	notifications: NotificationSettings;
	learning: LearningPreferences;
	privacy: PrivacySettings;
}

interface LearningPreferences {
	learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	subjects: string[];
	goals: LearningGoal[];
	timezone: string;
}
```

#### LearningGoal

```typescript
interface LearningGoal {
	id: string;
	title: string;
	description?: string;
	subject: string;
	target: 'beginner' | 'intermediate' | 'advanced';
	deadline: Date;
	milestones: Milestone[];
	status: 'active' | 'completed' | 'paused' | 'cancelled';
	progress: number; // 0-100
	createdAt: Date;
	updatedAt: Date;
}

interface Milestone {
	id: string;
	title: string;
	description?: string;
	deadline: Date;
	status: 'pending' | 'completed' | 'overdue';
	completedAt?: Date;
}
```

### AI Models

#### AIAgent

```typescript
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
	createdAt: Date;
	updatedAt: Date;
}

interface AgentCapability {
	id: string;
	name: string;
	description: string;
	category: string;
	level: 'beginner' | 'intermediate' | 'advanced';
}

interface AgentConfig {
	personality: 'encouraging' | 'professional' | 'casual' | 'strict';
	difficulty: 'adaptive' | 'fixed';
	teachingStyle: 'socratic' | 'direct' | 'interactive';
	responseLength: 'short' | 'medium' | 'long';
	examples: boolean;
	practiceProblems: boolean;
}
```

#### LearningSession

```typescript
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
	status: 'active' | 'completed' | 'paused';
}

interface ChatMessage {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
	metadata?: MessageMetadata;
}

interface MessageMetadata {
	confidence?: number;
	responseTime?: number;
	tokensUsed?: number;
	suggestions?: string[];
	context?: Record<string, any>;
}

interface SessionProgress {
	topicsCovered: string[];
	conceptsLearned: string[];
	questionsAsked: number;
	examplesProvided: number;
	practiceProblemsSolved: number;
	confidenceLevel: number; // 1-5
	satisfactionRating?: number; // 1-5
}
```

#### MentalHealthAssessment

```typescript
interface MentalHealthAssessment {
	id: string;
	userId: string;
	assessmentType: 'stress' | 'anxiety' | 'depression' | 'general';
	questions: AssessmentQuestion[];
	responses: AssessmentResponse[];
	score: number;
	level: 'low' | 'moderate' | 'high' | 'severe';
	recommendations: MentalHealthRecommendation[];
	assessedAt: Date;
	nextAssessment?: Date;
}

interface AssessmentQuestion {
	id: string;
	question: string;
	type: 'scale' | 'multiple_choice' | 'text' | 'boolean';
	options?: QuestionOptions;
	required: boolean;
	order: number;
}

interface QuestionOptions {
	min?: number;
	max?: number;
	labels?: string[];
	choices?: string[];
	placeholder?: string;
}

interface AssessmentResponse {
	questionId: string;
	answer: string | number | boolean;
	timestamp: Date;
}

interface MentalHealthRecommendation {
	type: 'technique' | 'resource' | 'professional' | 'lifestyle';
	title: string;
	description: string;
	priority: 'low' | 'medium' | 'high';
	estimatedTime?: string;
	resources?: string[];
}
```

### Learning Models

#### LearningPath

```typescript
interface LearningPath {
	id: string;
	title: string;
	description: string;
	subject: string;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	estimatedDuration: number; // minutes
	modules: LearningModule[];
	prerequisites: string[];
	learningObjectives: string[];
	rating: number;
	enrollmentCount: number;
	createdBy: string;
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface LearningModule {
	id: string;
	title: string;
	description: string;
	duration: number; // minutes
	prerequisites: string[];
	objectives: string[];
	content: ModuleContent[];
	assessments: string[];
	order: number;
}

interface ModuleContent {
	id: string;
	type: 'text' | 'video' | 'audio' | 'interactive' | 'document';
	title: string;
	content: string;
	url?: string;
	duration?: number;
	order: number;
}
```

#### Assessment

```typescript
interface Assessment {
	id: string;
	title: string;
	description?: string;
	subject: string;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	questions: AssessmentQuestion[];
	timeLimit?: number; // minutes
	maxAttempts?: number;
	passingScore?: number;
	createdBy: string;
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface AssessmentQuestion {
	id: string;
	type: 'multiple_choice' | 'open_ended' | 'true_false' | 'matching' | 'fill_blank';
	question: string;
	options?: string[];
	correctAnswer?: string | string[];
	points: number;
	explanation?: string;
	order: number;
}

interface AssessmentSubmission {
	id: string;
	assessmentId: string;
	userId: string;
	responses: QuestionResponse[];
	score?: number;
	timeSpent: number; // minutes
	submittedAt: Date;
	gradedAt?: Date;
	feedback?: string;
}

interface QuestionResponse {
	questionId: string;
	answer: string | string[];
	timestamp: Date;
	timeSpent?: number; // seconds
}
```

### Analytics Models

#### LearningAnalytics

```typescript
interface LearningAnalytics {
	userId: string;
	period: 'daily' | 'weekly' | 'monthly' | 'yearly';
	metrics: LearningMetrics;
	trends: AnalyticsTrend[];
	insights: LearningInsight[];
	generatedAt: Date;
}

interface LearningMetrics {
	totalStudyTime: number; // minutes
	averageSessionLength: number; // minutes
	sessionsCompleted: number;
	goalsAchieved: number;
	productivityScore: number; // 0-100
	engagementScore: number; // 0-100
	stressLevel: number; // 1-5
	learningVelocity: number; // relative to baseline
	retentionRate: number; // 0-1
	improvementRate: number; // percentage
}

interface AnalyticsTrend {
	metric: string;
	trend: 'increasing' | 'decreasing' | 'stable';
	change: number; // percentage
	data: TrendDataPoint[];
}

interface TrendDataPoint {
	date: string;
	value: number;
}

interface LearningInsight {
	type: 'achievement' | 'recommendation' | 'warning' | 'prediction';
	title: string;
	message: string;
	confidence: number; // 0-1
	impact: 'positive' | 'negative' | 'neutral';
	actionable: boolean;
	priority?: 'low' | 'medium' | 'high';
}
```

---

## Error Codes

### Authentication Errors

- `INVALID_CREDENTIALS`: Invalid email or password
- `TOKEN_EXPIRED`: JWT token has expired
- `INVALID_TOKEN`: JWT token is invalid
- `ACCOUNT_LOCKED`: Account is temporarily locked
- `TWO_FA_REQUIRED`: Two-factor authentication required
- `TWO_FA_INVALID`: Invalid 2FA code
- `ACCOUNT_NOT_VERIFIED`: Account email not verified
- `PERMISSION_DENIED`: Insufficient permissions

### Validation Errors

- `VALIDATION_ERROR`: Request validation failed
- `MISSING_FIELD`: Required field is missing
- `INVALID_FORMAT`: Field format is invalid
- `FIELD_TOO_LONG`: Field exceeds maximum length
- `FIELD_TOO_SHORT`: Field is below minimum length
- `INVALID_EMAIL`: Email format is invalid
- `INVALID_PASSWORD`: Password doesn't meet requirements
- `INVALID_DATE`: Date format is invalid
- `INVALID_NUMBER`: Number format is invalid

### Business Logic Errors

- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `RESOURCE_CONFLICT`: Resource conflict (e.g., duplicate email)
- `QUOTA_EXCEEDED`: User has exceeded their quota
- `FEATURE_NOT_AVAILABLE`: Feature not available for user tier
- `ASSESSMENT_NOT_AVAILABLE`: Assessment not available for user
- `GOAL_NOT_ACHIEVABLE`: Goal deadline has passed
- `SESSION_EXPIRED`: Learning session has expired

### System Errors

- `INTERNAL_SERVER_ERROR`: Internal server error
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable
- `TIMEOUT`: Request timeout
- `RATE_LIMIT_EXCEEDED`: Rate limit exceeded
- `MAINTENANCE_MODE`: System is in maintenance mode
- `DATABASE_ERROR`: Database connection or query error
- `EXTERNAL_SERVICE_ERROR`: Error from external service
- `FILE_UPLOAD_ERROR`: File upload failed

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
- **File uploads**: 5 per day

#### Premium Tier

- **Requests per hour**: 1,000
- **Concurrent requests**: 50
- **AI chat messages**: 500 per day
- **Assessments**: Unlimited
- **File uploads**: 50 per day

#### Enterprise Tier

- **Requests per hour**: 10,000
- **Concurrent requests**: 200
- **AI chat messages**: Unlimited
- **Assessments**: Unlimited
- **File uploads**: Unlimited
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

## SDKs

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

## Changelog

### Version 1.0.0 (December 2024)

#### New Features

- **Authentication API**: JWT token-based authentication with refresh tokens
- **User Management**: Complete user profile and preferences management
- **AI Chat API**: Real-time chat with AI learning mentors
- **Learning Progress**: Comprehensive progress tracking and analytics
- **Mental Health Assessment**: AI-powered psychological assessments
- **Learning Paths**: Structured learning modules and courses
- **Assessments**: Create and submit educational assessments
- **Analytics**: Detailed learning and performance analytics

#### API Endpoints

- `POST /auth/login` - User authentication
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /learning/progress` - Get learning progress
- `POST /ai/chat` - Send chat message
- `GET /ai/agents` - Get available AI agents
- `POST /ai/mental-health/assess` - Start mental health assessment
- `GET /learning/paths` - Get learning paths
- `POST /learning/assessments` - Create assessment
- `GET /analytics/learning` - Get learning analytics

#### Data Models

- `UserProfile` - Complete user information
- `LearningGoal` - Learning objectives and milestones
- `AIAgent` - AI agent configuration and capabilities
- `LearningSession` - Chat session with AI
- `MentalHealthAssessment` - Psychological assessment data
- `LearningPath` - Structured learning modules
- `Assessment` - Educational assessments and questions
- `LearningAnalytics` - Progress and performance data

#### SDKs

- **JavaScript/TypeScript SDK**: `@we-will-shine/sdk`
- **Python SDK**: `we-will-shine-sdk`

#### Rate Limits

- **Free Tier**: 100 requests/hour, 50 AI messages/day
- **Premium Tier**: 1,000 requests/hour, 500 AI messages/day
- **Enterprise Tier**: 10,000 requests/hour, unlimited AI messages

---

## Conclusion

This API reference provides comprehensive documentation for integrating with We Will Shine's platform. The API is designed to be:

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

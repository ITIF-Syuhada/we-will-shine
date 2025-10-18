# We Will Shine - Deployment & DevOps Guide

## 📋 Table of Contents

- [Deployment Overview](#deployment-overview)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Staging Deployment](#staging-deployment)
- [Production Deployment](#production-deployment)
- [Docker Configuration](#docker-configuration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Logging](#monitoring--logging)
- [Security Configuration](#security-configuration)
- [Backup & Recovery](#backup--recovery)
- [Troubleshooting](#troubleshooting)

---

## Deployment Overview

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Production Environment                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Frontend  │  │   Backend   │  │      Database       │ │
│  │  (SvelteKit)│  │   (2USE)    │  │   (PostgreSQL)     │ │
│  │             │  │             │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │     CDN     │  │   Redis     │  │    Monitoring       │ │
│  │ (CloudFlare)│  │   Cache     │  │   (Sentry, DataDog) │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Deployment Environments

- **Development**: Local development environment
- **Staging**: Pre-production testing environment
- **Production**: Live production environment

### Technology Stack

- **Frontend**: SvelteKit, TypeScript, Tailwind CSS
- **Backend**: 2USE (Python/Node.js)
- **Database**: PostgreSQL, Redis
- **Infrastructure**: Docker, Kubernetes, AWS/GCP
- **CDN**: CloudFlare
- **Monitoring**: Sentry, DataDog, Prometheus

---

## Environment Setup

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **Docker**: Latest version
- **Git**: Latest version
- **PostgreSQL**: Version 14 or higher
- **Redis**: Version 6 or higher

### Environment Variables

#### Development (.env.local)

```bash
# Application
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/we_will_shine_dev
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# AI Services
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key

# 2USE Integration
USE_API_URL=http://localhost:8000
USE_API_KEY=your_use_api_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=debug

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=we-will-shine-dev
```

#### Staging (.env.staging)

```bash
# Application
NODE_ENV=staging
PORT=3000
BASE_URL=https://staging.we-will-shine.org

# Database
DATABASE_URL=postgresql://user:password@staging-db:5432/we_will_shine_staging
REDIS_URL=redis://staging-redis:6379

# Authentication
JWT_SECRET=your_staging_jwt_secret
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_staging_refresh_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_staging_google_client_id
GOOGLE_CLIENT_SECRET=your_staging_google_client_secret
GOOGLE_REDIRECT_URI=https://staging.we-will-shine.org/auth/google/callback

# AI Services
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key

# 2USE Integration
USE_API_URL=https://staging-api.we-will-shine.org
USE_API_KEY=your_staging_use_api_key

# Monitoring
SENTRY_DSN=your_staging_sentry_dsn
LOG_LEVEL=info

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=we-will-shine-staging
```

#### Production (.env.production)

```bash
# Application
NODE_ENV=production
PORT=3000
BASE_URL=https://we-will-shine.org

# Database
DATABASE_URL=postgresql://user:password@prod-db:5432/we_will_shine_prod
REDIS_URL=redis://prod-redis:6379

# Authentication
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_production_refresh_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_production_google_client_id
GOOGLE_CLIENT_SECRET=your_production_google_client_secret
GOOGLE_REDIRECT_URI=https://we-will-shine.org/auth/google/callback

# AI Services
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key

# 2USE Integration
USE_API_URL=https://api.we-will-shine.org
USE_API_KEY=your_production_use_api_key

# Monitoring
SENTRY_DSN=your_production_sentry_dsn
LOG_LEVEL=warn

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=we-will-shine-prod
```

---

## Local Development

### Quick Start

#### 1. Clone Repository

```bash
git clone https://github.com/koneksi-jaringan/we-will-shine.git
cd we-will-shine
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Setup Environment

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### 4. Setup Database

```bash
# Install PostgreSQL
# Create database
createdb we_will_shine_dev

# Run migrations
npm run db:migrate

# Seed development data
npm run db:seed
```

#### 5. Start Development Server

```bash
npm run dev
```

#### 6. Access Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000/api
- **Database**: localhost:5432
- **Redis**: localhost:6379

### Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Database commands
npm run db:migrate
npm run db:seed
npm run db:reset
npm run db:backup

# Docker commands
npm run docker:build
npm run docker:up
npm run docker:down
npm run docker:logs
```

### Development Tools

#### VS Code Extensions

- **Svelte for VS Code**: Svelte language support
- **TypeScript Importer**: Auto-import TypeScript modules
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **GitLens**: Git integration
- **Thunder Client**: API testing
- **Docker**: Docker integration

#### Recommended VS Code Settings

```json
{
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
	"typescript.preferences.importModuleSpecifier": "relative",
	"svelte.enable-ts-plugin": true,
	"files.associations": {
		"*.svelte": "svelte"
	}
}
```

---

## Staging Deployment

### Staging Environment Setup

#### 1. Infrastructure Setup

```bash
# Create staging environment
aws ec2 create-instance \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.medium \
  --key-name staging-key \
  --security-groups staging-sg \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Environment,Value=staging}]'
```

#### 2. Database Setup

```bash
# Create staging database
aws rds create-db-instance \
  --db-instance-identifier we-will-shine-staging \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password your_password \
  --allocated-storage 20
```

#### 3. Redis Setup

```bash
# Create Redis cluster
aws elasticache create-cache-cluster \
  --cache-cluster-id we-will-shine-staging-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1
```

#### 4. Application Deployment

```bash
# Build application
npm run build

# Create Docker image
docker build -t we-will-shine:staging .

# Tag for registry
docker tag we-will-shine:staging your-registry/we-will-shine:staging

# Push to registry
docker push your-registry/we-will-shine:staging

# Deploy to staging
kubectl apply -f k8s/staging/
```

### Staging Configuration

#### Kubernetes Deployment (k8s/staging/deployment.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: we-will-shine-staging
  namespace: staging
spec:
  replicas: 2
  selector:
    matchLabels:
      app: we-will-shine-staging
  template:
    metadata:
      labels:
        app: we-will-shine-staging
    spec:
      containers:
        - name: we-will-shine
          image: your-registry/we-will-shine:staging
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'staging'
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: we-will-shine-secrets
                  key: database-url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: we-will-shine-secrets
                  key: redis-url
          resources:
            requests:
              memory: '256Mi'
              cpu: '250m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
```

#### Service Configuration (k8s/staging/service.yaml)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: we-will-shine-staging-service
  namespace: staging
spec:
  selector:
    app: we-will-shine-staging
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

---

## Production Deployment

### Production Environment Setup

#### 1. Infrastructure Setup

```bash
# Create production environment
aws ec2 create-instance \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.large \
  --key-name production-key \
  --security-groups production-sg \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Environment,Value=production}]'
```

#### 2. Database Setup

```bash
# Create production database with high availability
aws rds create-db-instance \
  --db-instance-identifier we-will-shine-prod \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --master-username admin \
  --master-user-password your_password \
  --allocated-storage 100 \
  --multi-az \
  --backup-retention-period 7 \
  --storage-encrypted
```

#### 3. Redis Setup

```bash
# Create Redis cluster with replication
aws elasticache create-replication-group \
  --replication-group-id we-will-shine-prod-redis \
  --description "We Will Shine Production Redis" \
  --cache-node-type cache.t3.medium \
  --engine redis \
  --num-cache-clusters 2 \
  --automatic-failover-enabled
```

#### 4. Application Deployment

```bash
# Build production application
npm run build

# Create production Docker image
docker build -t we-will-shine:production .

# Tag for registry
docker tag we-will-shine:production your-registry/we-will-shine:production

# Push to registry
docker push your-registry/we-will-shine:production

# Deploy to production
kubectl apply -f k8s/production/
```

### Production Configuration

#### Kubernetes Deployment (k8s/production/deployment.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: we-will-shine-production
  namespace: production
spec:
  replicas: 5
  selector:
    matchLabels:
      app: we-will-shine-production
  template:
    metadata:
      labels:
        app: we-will-shine-production
    spec:
      containers:
        - name: we-will-shine
          image: your-registry/we-will-shine:production
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'production'
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: we-will-shine-secrets
                  key: database-url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: we-will-shine-secrets
                  key: redis-url
          resources:
            requests:
              memory: '512Mi'
              cpu: '500m'
            limits:
              memory: '1Gi'
              cpu: '1000m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
          securityContext:
            runAsNonRoot: true
            runAsUser: 1000
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
```

#### Horizontal Pod Autoscaler (k8s/production/hpa.yaml)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: we-will-shine-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: we-will-shine-production
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

---

## Docker Configuration

### Dockerfile

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Change ownership
RUN chown -R sveltekit:nodejs /app
USER sveltekit

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Docker Compose (docker-compose.yml)

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/we_will_shine_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - we-will-shine-network

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=we_will_shine_dev
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - we-will-shine-network

  redis:
    image: redis:6-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    networks:
      - we-will-shine-network

  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - we-will-shine-network

volumes:
  postgres_data:
  redis_data:

networks:
  we-will-shine-network:
    driver: bridge
```

### Nginx Configuration (nginx.conf)

```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /health {
            proxy_pass http://app/health;
            access_log off;
        }
    }

    server {
        listen 443 ssl;
        server_name localhost;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## CI/CD Pipeline

### GitHub Actions Workflow (.github/workflows/deploy.yml)

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'

    steps:
      - name: Deploy to Staging
        uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/staging/deployment.yaml
            k8s/staging/service.yaml
          images: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:develop
          namespace: staging

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy to Production
        uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/production/deployment.yaml
            k8s/production/service.yaml
            k8s/production/hpa.yaml
          images: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          namespace: production
```

### Deployment Scripts

#### Deploy Script (scripts/deploy.sh)

```bash
#!/bin/bash

set -e

# Configuration
ENVIRONMENT=${1:-staging}
VERSION=${2:-latest}
NAMESPACE=${ENVIRONMENT}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Deploying We Will Shine to ${ENVIRONMENT}...${NC}"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}kubectl is not installed or not in PATH${NC}"
    exit 1
fi

# Check if namespace exists
if ! kubectl get namespace ${NAMESPACE} &> /dev/null; then
    echo -e "${YELLOW}Creating namespace ${NAMESPACE}...${NC}"
    kubectl create namespace ${NAMESPACE}
fi

# Update image tag in deployment
echo -e "${YELLOW}Updating deployment with image tag ${VERSION}...${NC}"
kubectl set image deployment/we-will-shine-${ENVIRONMENT} \
  we-will-shine=your-registry/we-will-shine:${VERSION} \
  -n ${NAMESPACE}

# Wait for rollout to complete
echo -e "${YELLOW}Waiting for rollout to complete...${NC}"
kubectl rollout status deployment/we-will-shine-${ENVIRONMENT} -n ${NAMESPACE}

# Check deployment status
echo -e "${YELLOW}Checking deployment status...${NC}"
kubectl get pods -n ${NAMESPACE} -l app=we-will-shine-${ENVIRONMENT}

echo -e "${GREEN}Deployment to ${ENVIRONMENT} completed successfully!${NC}"
```

#### Rollback Script (scripts/rollback.sh)

```bash
#!/bin/bash

set -e

# Configuration
ENVIRONMENT=${1:-staging}
NAMESPACE=${ENVIRONMENT}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Rolling back We Will Shine in ${ENVIRONMENT}...${NC}"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}kubectl is not installed or not in PATH${NC}"
    exit 1
fi

# Rollback deployment
echo -e "${YELLOW}Rolling back deployment...${NC}"
kubectl rollout undo deployment/we-will-shine-${ENVIRONMENT} -n ${NAMESPACE}

# Wait for rollout to complete
echo -e "${YELLOW}Waiting for rollout to complete...${NC}"
kubectl rollout status deployment/we-will-shine-${ENVIRONMENT} -n ${NAMESPACE}

# Check deployment status
echo -e "${YELLOW}Checking deployment status...${NC}"
kubectl get pods -n ${NAMESPACE} -l app=we-will-shine-${ENVIRONMENT}

echo -e "${GREEN}Rollback in ${ENVIRONMENT} completed successfully!${NC}"
```

---

## Monitoring & Logging

### Application Monitoring

#### Health Check Endpoint

```typescript
// src/routes/health/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		// Check database connection
		await db.query('SELECT 1');

		// Check Redis connection
		await redis.ping();

		// Check external services
		const services = await Promise.allSettled([checkOpenAI(), checkAnthropic(), checkGoogleAI()]);

		const healthyServices = services.filter((s) => s.status === 'fulfilled').length;
		const totalServices = services.length;

		return json({
			status: 'healthy',
			timestamp: new Date().toISOString(),
			services: {
				database: 'healthy',
				redis: 'healthy',
				ai_services: `${healthyServices}/${totalServices} healthy`
			}
		});
	} catch (error) {
		return json(
			{
				status: 'unhealthy',
				timestamp: new Date().toISOString(),
				error: error.message
			},
			{ status: 500 }
		);
	}
};
```

#### Metrics Collection

```typescript
// src/lib/monitoring/metrics.ts
import { register, Counter, Histogram, Gauge } from 'prom-client';

// Request counter
export const requestCounter = new Counter({
	name: 'http_requests_total',
	help: 'Total number of HTTP requests',
	labelNames: ['method', 'route', 'status_code']
});

// Response time histogram
export const responseTimeHistogram = new Histogram({
	name: 'http_request_duration_seconds',
	help: 'Duration of HTTP requests in seconds',
	labelNames: ['method', 'route'],
	buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// Active connections gauge
export const activeConnectionsGauge = new Gauge({
	name: 'active_connections',
	help: 'Number of active connections'
});

// AI API usage counter
export const aiApiUsageCounter = new Counter({
	name: 'ai_api_usage_total',
	help: 'Total number of AI API calls',
	labelNames: ['provider', 'endpoint']
});

// Learning progress gauge
export const learningProgressGauge = new Gauge({
	name: 'learning_progress_percentage',
	help: 'Learning progress percentage',
	labelNames: ['user_id', 'subject']
});
```

### Logging Configuration

#### Winston Logger Setup

```typescript
// src/lib/logging/logger.ts
import winston from 'winston';
import { SENTRY_DSN } from '$env/static/private';

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.errors({ stack: true }),
		winston.format.json()
	),
	defaultMeta: { service: 'we-will-shine' },
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/combined.log' }),
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winston.format.simple())
		})
	]
});

// Add Sentry transport if DSN is provided
if (SENTRY_DSN) {
	const SentryTransport = require('winston-sentry-log').Sentry;
	logger.add(
		new SentryTransport({
			sentry: {
				dsn: SENTRY_DSN
			},
			level: 'error'
		})
	);
}

export default logger;
```

#### Request Logging Middleware

```typescript
// src/lib/middleware/request-logger.ts
import { logger } from '$lib/logging/logger';
import { requestCounter, responseTimeHistogram } from '$lib/monitoring/metrics';

export function requestLogger() {
	return async (request: Request, event: any) => {
		const start = Date.now();
		const method = request.method;
		const url = new URL(request.url);
		const route = url.pathname;

		try {
			const response = await event.next();
			const duration = (Date.now() - start) / 1000;

			// Log request
			logger.info('HTTP Request', {
				method,
				route,
				statusCode: response.status,
				duration,
				userAgent: request.headers.get('user-agent'),
				ip: request.headers.get('x-forwarded-for') || 'unknown'
			});

			// Update metrics
			requestCounter.inc({
				method,
				route,
				status_code: response.status
			});

			responseTimeHistogram.observe({ method, route }, duration);

			return response;
		} catch (error) {
			const duration = (Date.now() - start) / 1000;

			logger.error('HTTP Request Error', {
				method,
				route,
				error: error.message,
				duration,
				stack: error.stack
			});

			throw error;
		}
	};
}
```

### Sentry Integration

#### Sentry Configuration

```typescript
// src/lib/monitoring/sentry.ts
import * as Sentry from '@sentry/sveltekit';
import { SENTRY_DSN } from '$env/static/private';

Sentry.init({
	dsn: SENTRY_DSN,
	environment: process.env.NODE_ENV,
	tracesSampleRate: 0.1,
	profilesSampleRate: 0.1,
	beforeSend(event) {
		// Filter out sensitive data
		if (event.request?.data) {
			delete event.request.data.password;
			delete event.request.data.token;
		}
		return event;
	}
});

export default Sentry;
```

---

## Security Configuration

### Security Headers

#### Helmet Configuration

```typescript
// src/lib/security/helmet.ts
import helmet from 'helmet';

export const helmetConfig = helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
			fontSrc: ["'self'", 'https://fonts.gstatic.com'],
			imgSrc: ["'self'", 'data:', 'https:'],
			scriptSrc: ["'self'"],
			connectSrc: ["'self'", 'https://api.we-will-shine.org'],
			frameSrc: ["'none'"],
			objectSrc: ["'none'"],
			upgradeInsecureRequests: []
		}
	},
	hsts: {
		maxAge: 31536000,
		includeSubDomains: true,
		preload: true
	},
	noSniff: true,
	xssFilter: true,
	referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});
```

### Rate Limiting

#### Rate Limiter Configuration

```typescript
// src/lib/security/rate-limiter.ts
import { RateLimiter } from 'limiter';

export const rateLimiters = {
	// General API rate limiter
	api: new RateLimiter({
		tokensPerInterval: 1000,
		interval: 'hour',
		fireImmediately: true
	}),

	// Authentication rate limiter
	auth: new RateLimiter({
		tokensPerInterval: 5,
		interval: 'hour',
		fireImmediately: true
	}),

	// AI chat rate limiter
	chat: new RateLimiter({
		tokensPerInterval: 100,
		interval: 'hour',
		fireImmediately: true
	}),

	// File upload rate limiter
	upload: new RateLimiter({
		tokensPerInterval: 10,
		interval: 'hour',
		fireImmediately: true
	})
};

export async function checkRateLimit(limiter: RateLimiter, identifier: string): Promise<boolean> {
	try {
		await limiter.removeTokens(1);
		return true;
	} catch (error) {
		return false;
	}
}
```

### Input Validation

#### Validation Middleware

```typescript
// src/lib/security/validation.ts
import { z } from 'zod';
import { logger } from '$lib/logging/logger';

export const validationSchemas = {
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
	}),

	assessment: z.object({
		title: z.string().min(5).max(200),
		subject: z.string().min(2).max(50),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
		questions: z.array(
			z.object({
				id: z.string().uuid(),
				type: z.enum(['multiple_choice', 'open_ended', 'true_false']),
				question: z.string().min(10).max(1000),
				points: z.number().min(1).max(100)
			})
		)
	})
};

export function validateRequest<T>(
	schema: z.ZodSchema<T>,
	data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
	try {
		const validatedData = schema.parse(data);
		return { success: true, data: validatedData };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
			logger.warn('Validation error', { errors, data });
			return { success: false, errors };
		}

		logger.error('Validation error', { error: error.message, data });
		return { success: false, errors: ['Internal validation error'] };
	}
}
```

---

## Backup & Recovery

### Database Backup

#### Automated Backup Script

```bash
#!/bin/bash
# scripts/backup-db.sh

set -e

# Configuration
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="we_will_shine_prod"
DB_USER="admin"
DB_HOST="prod-db.amazonaws.com"
DB_PORT="5432"

# Create backup directory
mkdir -p ${BACKUP_DIR}

# Create database backup
echo "Creating database backup..."
pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} \
  --format=custom --compress=9 \
  --file=${BACKUP_DIR}/we_will_shine_${DATE}.dump

# Upload to S3
echo "Uploading backup to S3..."
aws s3 cp ${BACKUP_DIR}/we_will_shine_${DATE}.dump \
  s3://we-will-shine-backups/database/we_will_shine_${DATE}.dump

# Clean up local backup (keep last 7 days)
echo "Cleaning up old backups..."
find ${BACKUP_DIR} -name "we_will_shine_*.dump" -mtime +7 -delete

echo "Backup completed successfully!"
```

#### Backup Restoration Script

```bash
#!/bin/bash
# scripts/restore-db.sh

set -e

# Configuration
BACKUP_FILE=${1}
DB_NAME="we_will_shine_prod"
DB_USER="admin"
DB_HOST="prod-db.amazonaws.com"
DB_PORT="5432"

if [ -z "${BACKUP_FILE}" ]; then
    echo "Usage: $0 <backup_file>"
    exit 1
fi

# Download backup from S3 if needed
if [[ ${BACKUP_FILE} == s3://* ]]; then
    echo "Downloading backup from S3..."
    aws s3 cp ${BACKUP_FILE} /tmp/backup.dump
    BACKUP_FILE="/tmp/backup.dump"
fi

# Restore database
echo "Restoring database from ${BACKUP_FILE}..."
pg_restore -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} \
  --clean --if-exists --no-owner --no-privileges \
  ${BACKUP_FILE}

echo "Database restoration completed successfully!"
```

### Application Backup

#### Configuration Backup

```bash
#!/bin/bash
# scripts/backup-config.sh

set -e

# Configuration
BACKUP_DIR="/backups/config"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p ${BACKUP_DIR}

# Backup Kubernetes configurations
echo "Backing up Kubernetes configurations..."
kubectl get all -o yaml > ${BACKUP_DIR}/k8s-resources_${DATE}.yaml
kubectl get secrets -o yaml > ${BACKUP_DIR}/k8s-secrets_${DATE}.yaml
kubectl get configmaps -o yaml > ${BACKUP_DIR}/k8s-configmaps_${DATE}.yaml

# Backup environment files
echo "Backing up environment files..."
cp -r k8s/ ${BACKUP_DIR}/k8s-config_${DATE}/

# Upload to S3
echo "Uploading configuration backup to S3..."
aws s3 cp ${BACKUP_DIR}/k8s-resources_${DATE}.yaml \
  s3://we-will-shine-backups/config/k8s-resources_${DATE}.yaml
aws s3 cp ${BACKUP_DIR}/k8s-secrets_${DATE}.yaml \
  s3://we-will-shine-backups/config/k8s-secrets_${DATE}.yaml
aws s3 cp ${BACKUP_DIR}/k8s-configmaps_${DATE}.yaml \
  s3://we-will-shine-backups/config/k8s-configmaps_${DATE}.yaml
aws s3 cp ${BACKUP_DIR}/k8s-config_${DATE}/ \
  s3://we-will-shine-backups/config/k8s-config_${DATE}/ --recursive

echo "Configuration backup completed successfully!"
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues

```bash
# Check database connectivity
kubectl exec -it deployment/we-will-shine-production -- \
  psql $DATABASE_URL -c "SELECT 1;"

# Check database logs
kubectl logs deployment/we-will-shine-production | grep -i database

# Restart database connection
kubectl rollout restart deployment/we-will-shine-production
```

#### 2. Redis Connection Issues

```bash
# Check Redis connectivity
kubectl exec -it deployment/we-will-shine-production -- \
  redis-cli -u $REDIS_URL ping

# Check Redis logs
kubectl logs deployment/we-will-shine-production | grep -i redis

# Restart Redis connection
kubectl rollout restart deployment/we-will-shine-production
```

#### 3. AI Service Issues

```bash
# Check AI service connectivity
kubectl exec -it deployment/we-will-shine-production -- \
  curl -f $USE_API_URL/health

# Check AI service logs
kubectl logs deployment/we-will-shine-production | grep -i ai

# Check API key validity
kubectl exec -it deployment/we-will-shine-production -- \
  curl -H "Authorization: Bearer $USE_API_KEY" $USE_API_URL/status
```

#### 4. Performance Issues

```bash
# Check resource usage
kubectl top pods -n production

# Check memory usage
kubectl exec -it deployment/we-will-shine-production -- \
  free -h

# Check CPU usage
kubectl exec -it deployment/we-will-shine-production -- \
  top -bn1 | grep "Cpu(s)"
```

### Debugging Commands

#### Application Debugging

```bash
# Get pod logs
kubectl logs -f deployment/we-will-shine-production -n production

# Get pod description
kubectl describe pod -l app=we-will-shine-production -n production

# Execute shell in pod
kubectl exec -it deployment/we-will-shine-production -n production -- /bin/sh

# Check environment variables
kubectl exec -it deployment/we-will-shine-production -n production -- env
```

#### Database Debugging

```bash
# Connect to database
kubectl exec -it deployment/we-will-shine-production -- \
  psql $DATABASE_URL

# Check database size
kubectl exec -it deployment/we-will-shine-production -- \
  psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size(current_database()));"

# Check active connections
kubectl exec -it deployment/we-will-shine-production -- \
  psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"
```

#### Network Debugging

```bash
# Check service endpoints
kubectl get endpoints -n production

# Check ingress
kubectl get ingress -n production

# Test internal connectivity
kubectl exec -it deployment/we-will-shine-production -- \
  curl -f http://we-will-shine-production-service:80/health

# Check DNS resolution
kubectl exec -it deployment/we-will-shine-production -- \
  nslookup we-will-shine-production-service
```

### Monitoring Commands

#### Health Check

```bash
# Check application health
curl -f https://we-will-shine.org/health

# Check readiness
curl -f https://we-will-shine.org/ready

# Check metrics
curl -f https://we-will-shine.org/metrics
```

#### Performance Monitoring

```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://we-will-shine.org/

# Check API response times
curl -w "@curl-format.txt" -o /dev/null -s https://api.we-will-shine.org/v1/health

# Check database performance
kubectl exec -it deployment/we-will-shine-production -- \
  psql $DATABASE_URL -c "SELECT * FROM pg_stat_activity WHERE state = 'active';"
```

---

## Conclusion

This deployment and DevOps guide provides comprehensive instructions for deploying and maintaining We Will Shine in various environments. The guide covers:

1. **Environment Setup**: Development, staging, and production configurations
2. **Docker Configuration**: Containerization and orchestration
3. **CI/CD Pipeline**: Automated testing and deployment
4. **Monitoring & Logging**: Application and infrastructure monitoring
5. **Security Configuration**: Security headers, rate limiting, and validation
6. **Backup & Recovery**: Database and configuration backup strategies
7. **Troubleshooting**: Common issues and debugging techniques

The deployment strategy emphasizes:

- **Scalability**: Horizontal pod autoscaling and load balancing
- **Reliability**: Health checks, monitoring, and automated recovery
- **Security**: Comprehensive security measures and best practices
- **Maintainability**: Clear documentation and troubleshooting guides

For additional support or questions:

- **Documentation**: [docs.we-will-shine.org](https://docs.we-will-shine.org)
- **Support**: [support@we-will-shine.org](mailto:support@we-will-shine.org)
- **Community**: [discord.gg/we-will-shine](https://discord.gg/we-will-shine)

---

_Last Updated: December 2024_  
_Version: 1.0_  
_Next Review: March 2025_

# Ideaoasis.co.kr - Agentic AI Swarm Platform

## Overview

Ideaoasis.co.kr is a premium, automated platform that imports innovative business ideas from global markets and adapts them for Korea, focusing on proven concepts with minimal local competition. Powered by an agentic AI swarm, the platform delivers personalized, actionable insights for Korean entrepreneurs, startups, and enterprises.

## Key Features

- **Agentic AI Swarm Core**: Autonomous agents collaborate on multi-step tasks (sourcing, scoring, simulating, curating)
- **Hands-Off Operation**: 90-95% automated workflows with minimal owner involvement
- **Compounding Moat**: Proprietary data, network effects, agentic workflows, brand momentum, localization
- **Korean Market Focus**: Addresses Korea-specific barriers and cultural preferences

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Node.js with Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **AI/ML**: LangChain, OpenAI API, Reinforcement Learning
- **Deployment**: Vercel
- **Payment**: Stripe
- **Monitoring**: Sentry, LogRocket

## Business Model

- **Free Tier**: 3-5 ideas/week, basic feasibility scores, community forum
- **Pro Tier**: $199/month or $1,999/year - Unlimited ideas, custom reports, AI chat
- **Enterprise Tier**: $999/month or $9,999/year - Bulk scouting, API access, VC insights

## Development Phases

### Phase 1: Preparation and Setup (Week 1)
- [x] Project structure and documentation
- [ ] Swarm AI prototype
- [ ] Basic authentication and database setup
- [ ] Admin dashboard for outlier reviews

### Phase 2: Core Development (Weeks 2-4)
- [ ] Full swarm engine implementation
- [ ] Hands-off automation features
- [ ] Moat features (data, network, workflow)
- [ ] Frontend UI components

### Phase 3: Polish and Beta (Weeks 5-6)
- [ ] Real-time query handling
- [ ] Security and scalability
- [ ] Beta testing and iteration

### Phase 4: Launch and Iteration (Weeks 7+)
- [ ] Production deployment
- [ ] Marketing and growth
- [ ] Continuous optimization

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## Environment Variables

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# AI/ML
OPENAI_API_KEY=your_openai_api_key
LANGCHAIN_API_KEY=your_langchain_api_key

# Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
```

## Swarm Architecture

The platform uses a multi-agent swarm system:

1. **Master Agent**: Orchestrates task decomposition and coordination
2. **Sourcing Agent**: Scans global platforms for innovative ideas
3. **Scoring Agent**: Evaluates Korea feasibility (1-10 scale)
4. **Adaptation Agent**: Generates "Korean Twist" modifications
5. **Moderation Agent**: Handles community content and spam filtering

## Hands-Off Operation

- **Auto-approval threshold**: >90% confidence
- **Outlier flagging**: Low-confidence ideas, edge cases, disputes
- **Notification system**: Email/Slack alerts for review items
- **Dashboard**: Admin interface for flagged content review

## Contributing

This is a proprietary platform. For internal development, follow the established patterns and ensure all changes maintain the hands-off operation principles. 
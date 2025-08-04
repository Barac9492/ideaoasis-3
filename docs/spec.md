# Ideaoasis.co.kr - Technical Specification

## 1. Platform Overview

### Core Concept
Ideaoasis.co.kr is a premium platform that automatically imports and adapts global business ideas for the Korean market. The platform uses an agentic AI swarm to handle 90-95% of operations autonomously, requiring minimal human oversight.

### Target Users
- **Solo Founders**: Seeking validated business ideas with Korean market fit
- **Startups**: Looking for innovation pipelines and market opportunities
- **Enterprises**: Scouting for strategic partnerships and acquisitions
- **Investors**: Identifying promising ventures for funding

## 2. Swarm Architecture

### Master Agent
- **Role**: Task decomposition and coordination
- **Responsibilities**:
  - Decompose user queries into sub-tasks
  - Coordinate between specialized agents
  - Manage confidence scoring and approval workflows
  - Handle error recovery and escalation

### Sourcing Agent
- **Role**: Global idea discovery
- **Data Sources**:
  - Crunchbase, X (Twitter), Product Hunt
  - TechCrunch, VentureBeat, local startup blogs
  - Exclude Korea-based sources to avoid redundancy
- **Output**: Raw idea data with metadata

### Scoring Agent
- **Role**: Korea feasibility evaluation (1-10 scale)
- **Evaluation Criteria**:
  - Cultural fit (group-oriented vs individualistic)
  - Regulatory compliance (Personal Information Protection Act)
  - Market size and competition analysis
  - Economic factors (GDP per capita, tech adoption)
- **Data Sources**: KOSIS, Korean government APIs, local market reports

### Adaptation Agent
- **Role**: Generate "Korean Twist" modifications
- **Adaptations**:
  - KakaoTalk integrations
  - Naver ecosystem compatibility
  - Korean payment systems (Toss, KakaoPay)
  - Cultural localization (group features, social elements)
  - Regulatory compliance modifications

### Moderation Agent
- **Role**: Community content management
- **Functions**:
  - Auto-filter spam and inappropriate content
  - Suggest idea adaptations to users
  - Reward quality contributions
  - Maintain community guidelines

## 3. Hands-Off Operation Rules

### Auto-Approval Thresholds
- **High Confidence (>90%)**: Auto-publish without review
- **Medium Confidence (70-90%)**: Flag for quick review
- **Low Confidence (<70%)**: Require detailed review

### Notification System
- **Email Alerts**: For flagged content requiring review
- **Slack Integration**: Real-time notifications for urgent items
- **Dashboard Alerts**: Admin interface with review queue

### Review Workflow
- **Response Time**: <30 minutes for flagged items
- **Review Interface**: Mobile-optimized dashboard
- **Actions**: Approve, Edit, Reject with comments
- **Escalation**: Rare errors trigger immediate alerts

## 4. Feature Specifications

### 4.1 Idea Database
- **Search**: Full-text search with filters (industry, feasibility score, source country)
- **Categories**: Tech, E-commerce, Fintech, Health, Education, etc.
- **Metadata**: Source, adaptation history, user feedback, success metrics

### 4.2 Feasibility Simulator
- **Interactive Tool**: Users input parameters for idea evaluation
- **Output**: Detailed feasibility report with confidence score
- **Factors**: Market size, competition, regulatory hurdles, cultural fit

### 4.3 AI Chat Interface
- **Purpose**: User queries for custom insights
- **Capabilities**:
  - Idea-specific questions
  - Market analysis requests
  - Adaptation suggestions
  - Launch strategy recommendations

### 4.4 Community Forum
- **Features**:
  - Idea discussions and feedback
  - User-generated adaptations
  - Success story sharing
  - Networking opportunities
- **Moderation**: Swarm handles 95% of moderation automatically

## 5. User Interface Design

### 5.1 Landing Page
```
┌─────────────────────────────────────────────────────────┐
│                    Ideaoasis.co.kr                     │
├─────────────────────────────────────────────────────────┤
│  Discover Global Ideas, Adapted for Korea              │
│                                                        │
│  [Search Ideas] [Browse Categories] [Start Free Trial] │
│                                                        │
│  Featured Ideas:                                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │ Idea 1  │ │ Idea 2  │ │ Idea 3  │ │ Idea 4  │     │
│  │ Score: 9 │ │ Score: 8 │ │ Score: 7 │ │ Score: 9 │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Idea Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  Dashboard | My Ideas | Community | Settings           │
├─────────────────────────────────────────────────────────┤
│  Search: [________________] [Filters ▼] [Sort ▼]      │
│                                                        │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Idea Title                                        │ │
│  │  Feasibility: 8.5/10 | Source: US | Category: Tech│ │
│  │  Korean Adaptation: KakaoTalk integration...       │ │
│  │  [View Details] [Save] [Share] [Discuss]          │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                        │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  AI Chat Assistant                                 │ │
│  │  Ask me anything about this idea...                │ │
│  │  [Type your question...] [Send]                    │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Admin Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  Admin Dashboard | Review Queue | Analytics | Settings │
├─────────────────────────────────────────────────────────┤
│  Pending Reviews: 3                                    │
│                                                        │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  FLAGGED: Low confidence idea                      │ │
│  │  Confidence: 65% | Reason: Ambiguous regulations  │ │
│  │  [Approve] [Edit] [Reject] [Add Comment]          │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                        │
│  Swarm Performance:                                   │
│  - Auto-approval rate: 92%                            │
│  - Average confidence: 8.3/10                         │
│  - Ideas processed today: 47                           │
└─────────────────────────────────────────────────────────┘
```

## 6. Database Schema

### 6.1 Ideas Table
```sql
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  source_url VARCHAR(500),
  source_country VARCHAR(100),
  original_idea TEXT,
  korean_adaptation TEXT,
  feasibility_score DECIMAL(3,2),
  confidence_score DECIMAL(3,2),
  category VARCHAR(100),
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP
);
```

### 6.2 Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
```

### 6.3 User Interactions Table
```sql
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  idea_id UUID REFERENCES ideas(id),
  interaction_type VARCHAR(50), -- 'view', 'save', 'share', 'discuss'
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6.4 Swarm Logs Table
```sql
CREATE TABLE swarm_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_type VARCHAR(50), -- 'master', 'sourcing', 'scoring', 'adaptation', 'moderation'
  task_id UUID,
  input_data JSONB,
  output_data JSONB,
  confidence_score DECIMAL(3,2),
  processing_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 7. API Endpoints

### 7.1 Ideas API
```
GET /api/ideas - List ideas with pagination and filters
GET /api/ideas/:id - Get specific idea details
POST /api/ideas/:id/interact - Record user interaction
GET /api/ideas/search - Search ideas with full-text search
```

### 7.2 Swarm API
```
POST /api/swarm/process - Trigger swarm processing
GET /api/swarm/status - Get swarm performance metrics
POST /api/swarm/query - Submit custom query to swarm
```

### 7.3 Admin API
```
GET /api/admin/review-queue - Get flagged items for review
POST /api/admin/review/:id - Approve/reject flagged item
GET /api/admin/analytics - Get platform analytics
```

## 8. Security & Compliance

### 8.1 Korean Data Privacy
- **Personal Information Protection Act (PIPL)** compliance
- Data localization requirements
- User consent management
- Data retention policies

### 8.2 Authentication & Authorization
- NextAuth.js integration
- Role-based access control
- API rate limiting
- Secure session management

## 9. Performance Requirements

### 9.1 Response Times
- **Page Load**: <2 seconds
- **Search Results**: <1 second
- **AI Chat Response**: <3 seconds
- **Swarm Processing**: <30 seconds per idea

### 9.2 Scalability
- **Concurrent Users**: 1,000+
- **Ideas Database**: 10,000+ ideas
- **Daily Processing**: 100+ new ideas
- **Auto-approval Rate**: >90%

## 10. Monitoring & Analytics

### 10.1 Key Metrics
- **User Engagement**: Daily active users, session duration
- **Swarm Performance**: Auto-approval rate, confidence scores
- **Business Metrics**: Conversion rates, revenue per user
- **Technical Metrics**: Response times, error rates

### 10.2 Alerting
- **Swarm Failures**: Immediate alerts for processing errors
- **Performance Degradation**: Alerts for response time increases
- **Security Incidents**: Unusual access patterns or data breaches

## 11. Deployment Strategy

### 11.1 Environment Setup
- **Development**: Local development with hot reloading
- **Staging**: Vercel preview deployments
- **Production**: Vercel with custom domain

### 11.2 CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Environment Variables**: Secure management via Vercel
- **Database Migrations**: Automated schema updates

## 12. Success Criteria

### 12.1 Phase 1 Success
- [ ] Swarm prototype processes 5 ideas with 80% auto-approval
- [ ] Basic authentication and database setup complete
- [ ] Admin dashboard functional for outlier reviews

### 12.2 Phase 2 Success
- [ ] Full swarm engine processing 50+ ideas
- [ ] 90% automation rate achieved
- [ ] Moat features (data capture, community) implemented

### 12.3 Phase 3 Success
- [ ] Beta testing with 10-20 Korean users
- [ ] Real-time query handling functional
- [ ] Security and scalability requirements met

### 12.4 Phase 4 Success
- [ ] $10K MRR achieved
- [ ] 1,000+ active users
- [ ] 95% hands-off operation maintained 
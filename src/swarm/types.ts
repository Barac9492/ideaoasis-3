export interface SwarmAgent {
  id: string;
  type: 'master' | 'sourcing' | 'scoring' | 'adaptation' | 'moderation';
  name: string;
  description: string;
  capabilities: string[];
  isActive: boolean;
  lastActive: Date;
  performanceMetrics: AgentPerformanceMetrics;
}

export interface AgentPerformanceMetrics {
  totalTasks: number;
  successfulTasks: number;
  averageConfidence: number;
  averageProcessingTime: number;
  errorRate: number;
}

export interface SwarmTask {
  id: string;
  type: 'idea_processing' | 'user_query' | 'content_moderation' | 'market_analysis';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedAgent?: string;
  input: any;
  output?: any;
  confidence?: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface IdeaData {
  id: string;
  title: string;
  description: string;
  sourceUrl: string;
  sourceCountry: string;
  originalIdea: string;
  koreanAdaptation?: string;
  feasibilityScore?: number;
  confidenceScore?: number;
  category: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface KoreaFeasibilityScore {
  overallScore: number; // 1-10
  culturalFit: number; // 1-10
  regulatoryCompliance: number; // 1-10
  marketSize: number; // 1-10
  competitionLevel: number; // 1-10
  economicFactors: number; // 1-10
  reasoning: string;
  risks: string[];
  opportunities: string[];
}

export interface KoreanAdaptation {
  originalIdea: string;
  adaptedIdea: string;
  keyChanges: string[];
  kakaoIntegrations?: string[];
  naverIntegrations?: string[];
  paymentSystems?: string[];
  culturalModifications?: string[];
  regulatoryAdjustments?: string[];
  reasoning: string;
}

export interface SwarmConfig {
  autoApprovalThreshold: number; // 0.9 = 90%
  reviewThreshold: number; // 0.7 = 70%
  maxProcessingTime: number; // milliseconds
  batchSize: number;
  enableReinforcementLearning: boolean;
  enableMemory: boolean;
  notificationChannels: ('email' | 'slack' | 'sms')[];
}

export interface SwarmLog {
  id: string;
  agentType: string;
  taskId: string;
  inputData: any;
  outputData: any;
  confidenceScore?: number;
  processingTimeMs: number;
  createdAt: Date;
  error?: string;
}

export interface UserInteraction {
  id: string;
  userId: string;
  ideaId: string;
  interactionType: 'view' | 'save' | 'share' | 'discuss' | 'rate';
  metadata?: any;
  createdAt: Date;
}

export interface SwarmNotification {
  id: string;
  type: 'review_required' | 'swarm_error' | 'performance_alert' | 'system_update';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  channels: ('email' | 'slack' | 'sms')[];
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
}

export interface SwarmPerformanceMetrics {
  totalIdeasProcessed: number;
  autoApprovalRate: number;
  averageConfidence: number;
  averageProcessingTime: number;
  errorRate: number;
  activeAgents: number;
  queueLength: number;
  lastUpdated: Date;
}

export interface MarketAnalysis {
  marketSize: number; // in millions USD
  growthRate: number; // percentage
  competitionLevel: 'low' | 'medium' | 'high';
  regulatoryEnvironment: 'favorable' | 'neutral' | 'challenging';
  culturalFit: 'high' | 'medium' | 'low';
  keyPlayers: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
}

export interface UserQuery {
  id: string;
  userId: string;
  query: string;
  context?: any;
  response?: string;
  confidence?: number;
  processingTime?: number;
  createdAt: Date;
  respondedAt?: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  ideaId?: string;
  type: 'discussion' | 'adaptation' | 'success_story' | 'question';
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  moderatedBy?: string;
  moderatedAt?: Date;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
} 
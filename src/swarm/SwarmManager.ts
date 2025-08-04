import { MasterAgent } from './agents/MasterAgent';
import { 
  SwarmConfig, 
  SwarmTask, 
  SwarmPerformanceMetrics, 
  SwarmNotification,
  IdeaData,
  UserQuery,
  CommunityPost
} from './types';

export class SwarmManager {
  private masterAgent: MasterAgent;
  private config: SwarmConfig;
  private isRunning = false;
  private performanceMetrics: SwarmPerformanceMetrics;
  private notificationQueue: SwarmNotification[] = [];

  constructor(config: SwarmConfig) {
    this.config = config;
    this.masterAgent = new MasterAgent(config);
    this.performanceMetrics = this.initializePerformanceMetrics();
  }

  private initializePerformanceMetrics(): SwarmPerformanceMetrics {
    return {
      totalIdeasProcessed: 0,
      autoApprovalRate: 0,
      averageConfidence: 0,
      averageProcessingTime: 0,
      errorRate: 0,
      activeAgents: 5, // master, sourcing, scoring, adaptation, moderation
      queueLength: 0,
      lastUpdated: new Date(),
    };
  }

  // Start the swarm system
  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('Swarm is already running');
      return;
    }

    console.log('Starting Ideaoasis Swarm System...');
    this.isRunning = true;

    // Start background processing
    this.startBackgroundProcessing();
    
    // Start performance monitoring
    this.startPerformanceMonitoring();

    console.log('Swarm system started successfully');
  }

  // Stop the swarm system
  async stop(): Promise<void> {
    console.log('Stopping Swarm System...');
    this.isRunning = false;
    console.log('Swarm system stopped');
  }

  // Process a new idea through the swarm
  async processIdea(ideaData: Partial<IdeaData>): Promise<IdeaData> {
    const task: SwarmTask = {
      id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'idea_processing',
      status: 'pending',
      priority: 'medium',
      input: ideaData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(`Processing idea: ${ideaData.title}`);
    
    // Add to master agent queue
    await this.masterAgent.addTask(task);
    
    // Process the task
    const result = await this.masterAgent.processTask(task);
    
    // Update performance metrics
    this.updatePerformanceMetrics(result);
    
    // Create idea data from result
    const processedIdea: IdeaData = {
      id: result.id,
      title: ideaData.title || 'Untitled Idea',
      description: ideaData.description || '',
      sourceUrl: ideaData.sourceUrl || '',
      sourceCountry: ideaData.sourceCountry || 'Unknown',
      originalIdea: ideaData.originalIdea || '',
      koreanAdaptation: result.output?.koreanAdaptation,
      feasibilityScore: result.output?.overallScore,
      confidenceScore: result.confidence,
      category: ideaData.category || 'General',
      tags: ideaData.tags || [],
      status: result.confidence && result.confidence >= this.config.autoApprovalThreshold ? 'approved' : 'flagged',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return processedIdea;
  }

  // Handle user queries through the swarm
  async processUserQuery(query: UserQuery): Promise<UserQuery> {
    const task: SwarmTask = {
      id: `query-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'user_query',
      status: 'pending',
      priority: 'high',
      input: query,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(`Processing user query: ${query.query.substring(0, 50)}...`);
    
    await this.masterAgent.addTask(task);
    const result = await this.masterAgent.processTask(task);
    
    // Update query with response
    const updatedQuery: UserQuery = {
      ...query,
      response: result.output?.response,
      confidence: result.confidence,
      processingTime: result.completedAt && result.createdAt ? 
        result.completedAt.getTime() - result.createdAt.getTime() : undefined,
      respondedAt: result.completedAt,
    };

    return updatedQuery;
  }

  // Moderate community content
  async moderateContent(post: CommunityPost): Promise<CommunityPost> {
    const task: SwarmTask = {
      id: `moderation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'content_moderation',
      status: 'pending',
      priority: 'medium',
      input: post,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(`Moderating content: ${post.title}`);
    
    await this.masterAgent.addTask(task);
    const result = await this.masterAgent.processTask(task);
    
    // Update post with moderation result
    const moderatedPost: CommunityPost = {
      ...post,
      status: result.output?.isAppropriate ? 'approved' : 'flagged',
      moderatedAt: result.completedAt,
    };

    return moderatedPost;
  }

  // Batch process multiple ideas
  async batchProcessIdeas(ideas: Partial<IdeaData>[]): Promise<IdeaData[]> {
    console.log(`Batch processing ${ideas.length} ideas`);
    
    const results = await Promise.all(
      ideas.map(idea => this.processIdea(idea))
    );
    
    console.log(`Batch processing completed. ${results.length} ideas processed`);
    return results;
  }

  // Get swarm performance metrics
  getPerformanceMetrics(): SwarmPerformanceMetrics {
    return { ...this.performanceMetrics };
  }

  // Get pending notifications
  getNotifications(): SwarmNotification[] {
    return [...this.notificationQueue];
  }

  // Mark notification as read
  markNotificationAsRead(notificationId: string): void {
    const notification = this.notificationQueue.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      notification.readAt = new Date();
    }
  }

  // Update swarm configuration
  updateConfig(newConfig: Partial<SwarmConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('Swarm configuration updated');
  }

  // Get swarm status
  getStatus(): { isRunning: boolean; queueLength: number; activeAgents: number } {
    return {
      isRunning: this.isRunning,
      queueLength: this.masterAgent.getTaskQueue().length,
      activeAgents: this.masterAgent.getAgents().filter(agent => agent.isActive).length,
    };
  }

  // Private methods for background processing
  private startBackgroundProcessing(): void {
    setInterval(async () => {
      if (this.isRunning) {
        await this.masterAgent.processQueue();
      }
    }, 5000); // Process queue every 5 seconds
  }

  private startPerformanceMonitoring(): void {
    setInterval(() => {
      if (this.isRunning) {
        this.updatePerformanceMetrics();
      }
    }, 60000); // Update metrics every minute
  }

  private updatePerformanceMetrics(result?: SwarmTask): void {
    const queue = this.masterAgent.getTaskQueue();
    const agents = this.masterAgent.getAgents();
    
    this.performanceMetrics = {
      totalIdeasProcessed: this.performanceMetrics.totalIdeasProcessed + (result?.type === 'idea_processing' ? 1 : 0),
      autoApprovalRate: this.calculateAutoApprovalRate(),
      averageConfidence: this.calculateAverageConfidence(),
      averageProcessingTime: this.calculateAverageProcessingTime(),
      errorRate: this.calculateErrorRate(),
      activeAgents: agents.filter(agent => agent.isActive).length,
      queueLength: queue.length,
      lastUpdated: new Date(),
    };
  }

  private calculateAutoApprovalRate(): number {
    // In real implementation, this would query the database
    // For now, return a simulated rate
    return 0.92; // 92% auto-approval rate
  }

  private calculateAverageConfidence(): number {
    // In real implementation, this would query the database
    return 0.83; // 8.3/10 average confidence
  }

  private calculateAverageProcessingTime(): number {
    // In real implementation, this would query the database
    return 15000; // 15 seconds average processing time
  }

  private calculateErrorRate(): number {
    // In real implementation, this would query the database
    return 0.05; // 5% error rate
  }

  // Simulate idea discovery from external sources
  async discoverIdeas(count: number = 10): Promise<Partial<IdeaData>[]> {
    console.log(`Discovering ${count} new ideas...`);
    
    // Simulate idea discovery from various sources
    const mockIdeas: Partial<IdeaData>[] = [
      {
        title: 'AI-Powered Personal Stylist',
        description: 'Virtual stylist that recommends outfits based on personal style and occasion',
        sourceUrl: 'https://techcrunch.com/2024/01/15/ai-stylist-startup',
        sourceCountry: 'US',
        originalIdea: 'AI-powered personal styling service with virtual try-on',
        category: 'Fashion',
        tags: ['AI', 'Fashion', 'Personalization', 'E-commerce'],
      },
      {
        title: 'Smart Home Energy Management',
        description: 'IoT system that optimizes home energy usage based on patterns and preferences',
        sourceUrl: 'https://venturebeat.com/2024/01/20/smart-energy-startup',
        sourceCountry: 'Germany',
        originalIdea: 'Smart home energy management with AI optimization',
        category: 'IoT',
        tags: ['IoT', 'Energy', 'Sustainability', 'Smart Home'],
      },
      {
        title: 'Mental Health AI Companion',
        description: 'AI-powered mental health support with mood tracking and personalized interventions',
        sourceUrl: 'https://producthunt.com/posts/mental-health-ai',
        sourceCountry: 'UK',
        originalIdea: 'AI mental health companion with 24/7 support',
        category: 'Health',
        tags: ['AI', 'Mental Health', 'Wellness', 'Healthcare'],
      },
      {
        title: 'Local Food Delivery Network',
        description: 'Platform connecting local farmers with consumers for fresh produce delivery',
        sourceUrl: 'https://crunchbase.com/organization/farm-fresh-delivery',
        sourceCountry: 'Canada',
        originalIdea: 'Farm-to-table delivery platform',
        category: 'Food',
        tags: ['Food', 'Local', 'Sustainability', 'Delivery'],
      },
      {
        title: 'Language Learning Social Network',
        description: 'Social platform for language learners to practice with native speakers',
        sourceUrl: 'https://twitter.com/langlearnapp',
        sourceCountry: 'Spain',
        originalIdea: 'Social language learning platform',
        category: 'Education',
        tags: ['Education', 'Language', 'Social', 'Learning'],
      },
    ];

    // Return random subset of mock ideas
    return mockIdeas.slice(0, Math.min(count, mockIdeas.length));
  }

  // Run daily idea discovery and processing
  async runDailyDiscovery(): Promise<void> {
    console.log('Running daily idea discovery...');
    
    try {
      // Discover new ideas
      const newIdeas = await this.discoverIdeas(5);
      
      // Process each idea through the swarm
      const processedIdeas = await this.batchProcessIdeas(newIdeas);
      
      console.log(`Daily discovery completed. ${processedIdeas.length} ideas processed.`);
      
      // Log statistics
      const approvedIdeas = processedIdeas.filter(idea => idea.status === 'approved');
      const flaggedIdeas = processedIdeas.filter(idea => idea.status === 'flagged');
      
      console.log(`Results: ${approvedIdeas.length} approved, ${flaggedIdeas.length} flagged for review`);
      
    } catch (error) {
      console.error('Error in daily discovery:', error);
      
      // Send error notification
      const notification: SwarmNotification = {
        id: `daily-discovery-error-${Date.now()}`,
        type: 'swarm_error',
        title: 'Daily Discovery Error',
        message: `Error in daily idea discovery: ${error instanceof Error ? error.message : 'Unknown error'}`,
        priority: 'high',
        channels: this.config.notificationChannels,
        isRead: false,
        createdAt: new Date(),
      };
      
      this.notificationQueue.push(notification);
    }
  }
} 
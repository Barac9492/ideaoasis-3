import { NextResponse } from 'next/server';
import { SwarmManager } from '@/swarm/SwarmManager';
import { SwarmConfig } from '@/swarm/types';

// Initialize swarm configuration
const swarmConfig: SwarmConfig = {
  autoApprovalThreshold: 0.9,
  reviewThreshold: 0.7,
  maxProcessingTime: 30000,
  batchSize: 10,
  enableReinforcementLearning: true,
  enableMemory: true,
  notificationChannels: ['email', 'slack'],
};

// Initialize swarm manager (in production, this would be a singleton)
let swarmManager: SwarmManager | null = null;

function getSwarmManager(): SwarmManager {
  if (!swarmManager) {
    swarmManager = new SwarmManager(swarmConfig);
  }
  return swarmManager;
}

export async function GET() {
  try {
    const manager = getSwarmManager();
    
    // Get swarm status and performance metrics
    const status = manager.getStatus();
    const metrics = manager.getPerformanceMetrics();
    const notifications = manager.getNotifications();

    return NextResponse.json({
      success: true,
      data: {
        status,
        metrics,
        notifications: notifications.filter(n => !n.isRead),
        config: swarmConfig,
      },
    });
  } catch (error) {
    console.error('Error getting swarm status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get swarm status',
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const manager = getSwarmManager();
    
    // Start the swarm if not already running
    if (!manager.getStatus().isRunning) {
      await manager.start();
    }

    // Run daily discovery
    await manager.runDailyDiscovery();

    return NextResponse.json({
      success: true,
      message: 'Swarm discovery completed',
      data: {
        status: manager.getStatus(),
        metrics: manager.getPerformanceMetrics(),
      },
    });
  } catch (error) {
    console.error('Error running swarm discovery:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to run swarm discovery',
      },
      { status: 500 }
    );
  }
} 
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Activity, Zap, Users, TrendingUp } from 'lucide-react';

interface SwarmStatus {
  isRunning: boolean;
  queueLength: number;
  activeAgents: number;
}

interface SwarmMetrics {
  totalIdeasProcessed: number;
  autoApprovalRate: number;
  averageConfidence: number;
  averageProcessingTime: number;
  errorRate: number;
  activeAgents: number;
  queueLength: number;
  lastUpdated: string;
}

interface SwarmData {
  status: SwarmStatus;
  metrics: SwarmMetrics;
  notifications: any[];
  config: any;
}

export default function TestPage() {
  const [swarmData, setSwarmData] = useState<SwarmData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSwarmStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/swarm/status');
      const data = await response.json();
      
      if (data.success) {
        setSwarmData(data.data);
      } else {
        setError(data.error || 'Failed to fetch swarm status');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const runDiscovery = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/swarm/status', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        setSwarmData(data.data);
        alert('Swarm discovery completed successfully!');
      } else {
        setError(data.error || 'Failed to run discovery');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwarmStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Swarm Test Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Test the Ideaoasis AI Swarm functionality
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Swarm Controls
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={fetchSwarmStatus}
              disabled={loading}
              className="btn btn-primary btn-md"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Status
            </button>
            <button
              onClick={runDiscovery}
              disabled={loading}
              className="btn btn-secondary btn-md"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Discovery
            </button>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <p className="text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Status Cards */}
        {swarmData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {swarmData.status.isRunning ? 'Running' : 'Stopped'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center">
                <Users className="w-8 h-8 text-secondary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {swarmData.status.activeAgents}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center">
                <Zap className="w-8 h-8 text-accent-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Queue Length</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {swarmData.status.queueLength}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-success-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Auto-Approval Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(swarmData.metrics.autoApprovalRate * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Detailed Metrics */}
        {swarmData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Ideas Processed</span>
                  <span className="font-semibold">{swarmData.metrics.totalIdeasProcessed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Confidence</span>
                  <span className="font-semibold">{(swarmData.metrics.averageConfidence * 10).toFixed(1)}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Processing Time</span>
                  <span className="font-semibold">{(swarmData.metrics.averageProcessingTime / 1000).toFixed(1)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Error Rate</span>
                  <span className="font-semibold">{(swarmData.metrics.errorRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Swarm Configuration
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Auto-Approval Threshold</span>
                  <span className="font-semibold">{(swarmData.config.autoApprovalThreshold * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Review Threshold</span>
                  <span className="font-semibold">{(swarmData.config.reviewThreshold * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Processing Time</span>
                  <span className="font-semibold">{(swarmData.config.maxProcessingTime / 1000).toFixed(0)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Batch Size</span>
                  <span className="font-semibold">{swarmData.config.batchSize}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications */}
        {swarmData && swarmData.notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-6 mt-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Notifications
            </h3>
            <div className="space-y-3">
              {swarmData.notifications.map((notification, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      notification.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {notification.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
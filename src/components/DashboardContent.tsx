'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  MessageSquare, 
  TrendingUp, 
  Star, 
  Search,
  Send,
  Heart,
  Share2,
  Eye
} from 'lucide-react';
import { Idea } from '@/lib/supabase';

interface DashboardContentProps {
  t: (key: string, options?: any) => string;
}

export default function DashboardContent({ t }: DashboardContentProps) {
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('saved');

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading saved ideas
    const mockSavedIdeas: Idea[] = [
      {
        id: '1',
        title: 'AI-Powered Personal Stylist',
        description: 'Virtual fashion consultant using AI to recommend outfits based on personal style and occasion',
        source_url: 'https://example.com',
        source_country: 'United States',
        original_idea: 'AI fashion recommendation app',
        korean_adaptation: '카카오톡 연동 AI 스타일리스트 - 한국인 패션 취향 분석 및 추천',
        feasibility_score: 8.5,
        confidence_score: 0.92,
        category: 'technology',
        tags: ['AI', 'fashion', 'personalization'],
        status: 'approved',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        title: 'Subscription Pet Food Service',
        description: 'Personalized pet food delivery with health monitoring and vet consultation',
        source_url: 'https://example.com',
        source_country: 'United Kingdom',
        original_idea: 'Pet food subscription service',
        korean_adaptation: '네이버페이 연동 반려동물 맞춤 사료 구독 서비스 - 수의사 상담 포함',
        feasibility_score: 7.8,
        confidence_score: 0.88,
        category: 'food',
        tags: ['pets', 'subscription', 'health'],
        status: 'approved',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    setSavedIdeas(mockSavedIdeas);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = { type: 'user' as const, content: newMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai' as const,
        content: t('dashboard.aiResponse', { 
          defaultValue: 'I found 3 similar ideas that might interest you. Would you like me to show you the details?' 
        })
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const tabs = [
    { id: 'saved', label: t('dashboard.tabs.saved', { defaultValue: 'Saved Ideas' }), icon: Bookmark },
    { id: 'chat', label: t('dashboard.tabs.chat', { defaultValue: 'AI Chat' }), icon: MessageSquare },
    { id: 'stats', label: t('dashboard.tabs.stats', { defaultValue: 'Analytics' }), icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === 'saved' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('dashboard.savedIdeas.title', { defaultValue: 'Your Saved Ideas' })}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedIdeas.map((idea) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">{idea.title}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600">
                        {idea.feasibility_score}/10
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{idea.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{idea.source_country}</span>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <Heart className="w-3 h-3" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <Share2 className="w-3 h-3" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('dashboard.chat.title', { defaultValue: 'AI Swarm Chat' })}
            </h3>
            <div className="h-96 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                        <span className="text-sm">{t('dashboard.chat.typing', { defaultValue: 'AI is thinking...' })}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('dashboard.chat.placeholder', { defaultValue: 'Ask the AI swarm about ideas...' })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('dashboard.stats.title', { defaultValue: 'Your Analytics' })}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{t('dashboard.stats.savedIdeas', { defaultValue: 'Saved Ideas' })}</p>
                    <p className="text-2xl font-bold">{savedIdeas.length}</p>
                  </div>
                  <Bookmark className="w-8 h-8 opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{t('dashboard.stats.views', { defaultValue: 'Total Views' })}</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <Eye className="w-8 h-8 opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{t('dashboard.stats.avgScore', { defaultValue: 'Avg Score' })}</p>
                    <p className="text-2xl font-bold">8.2</p>
                  </div>
                  <Star className="w-8 h-8 opacity-80" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                {t('dashboard.stats.recentActivity', { defaultValue: 'Recent Activity' })}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {t('dashboard.stats.savedIdea', { defaultValue: 'Saved "AI-Powered Personal Stylist"' })}
                  </span>
                  <span className="text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {t('dashboard.stats.chatQuery', { defaultValue: 'Asked AI about fintech ideas' })}
                  </span>
                  <span className="text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {t('dashboard.stats.sharedIdea', { defaultValue: 'Shared idea with team' })}
                  </span>
                  <span className="text-gray-400">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
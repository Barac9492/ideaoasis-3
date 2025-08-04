'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe,
  Zap,
  Database,
  Network
} from 'lucide-react';

export default function AboutPageClient() {
  const t = useTranslations();

  const features = [
    {
      icon: Target,
      title: t('about.features.mission.title', { defaultValue: 'Our Mission' }),
      description: t('about.features.mission.description', { 
        defaultValue: 'Bridge global innovation to Korea\'s dynamic market through AI-powered adaptation and localization.' 
      })
    },
    {
      icon: Users,
      title: t('about.features.team.title', { defaultValue: 'VC Expertise' }),
      description: t('about.features.team.description', { 
        defaultValue: 'Founded by experienced venture capitalists with deep understanding of Korean market dynamics and global startup ecosystems.' 
      })
    },
    {
      icon: TrendingUp,
      title: t('about.features.moat.title', { defaultValue: 'Compounding Moat' }),
      description: t('about.features.moat.description', { 
        defaultValue: 'Proprietary data, network effects, and agentic workflows create sustainable competitive advantages.' 
      })
    },
    {
      icon: Shield,
      title: t('about.features.quality.title', { defaultValue: 'Quality Assurance' }),
      description: t('about.features.quality.description', { 
        defaultValue: 'AI swarm with human oversight ensures only high-confidence, culturally-adapted ideas reach our community.' 
      })
    }
  ];

  const moatElements = [
    {
      icon: Database,
      title: t('about.moat.data.title', { defaultValue: 'Proprietary Data' }),
      description: t('about.moat.data.description', { 
        defaultValue: 'User interactions, feedback, and outcomes create a data flywheel that continuously improves our AI models.' 
      })
    },
    {
      icon: Network,
      title: t('about.moat.network.title', { defaultValue: 'Network Effects' }),
      description: t('about.moat.network.description', { 
        defaultValue: 'Community contributions and discussions enhance idea quality and create valuable network effects.' 
      })
    },
    {
      icon: Zap,
      title: t('about.moat.workflow.title', { defaultValue: 'Agentic Workflows' }),
      description: t('about.moat.workflow.description', { 
        defaultValue: 'AI agents handle sourcing, scoring, adaptation, and moderation with minimal human intervention.' 
      })
    },
    {
      icon: Globe,
      title: t('about.moat.localization.title', { defaultValue: 'Deep Localization' }),
      description: t('about.moat.localization.description', { 
        defaultValue: 'Korea-specific cultural, regulatory, and market adaptations that go beyond simple translation.' 
      })
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('about.title', { defaultValue: 'About Ideaoasis' })}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle', { 
              defaultValue: 'We\'re building the future of global innovation adaptation for the Korean market through AI-powered intelligence and deep localization.' 
            })}
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('about.mission.title', { defaultValue: 'Our Mission' })}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t('about.mission.description', { 
                    defaultValue: 'Korea represents one of the most dynamic and innovative markets in the world, yet many global business ideas fail to reach their potential due to cultural and market barriers. We believe that with the right adaptation and localization, these ideas can thrive in Korea.' 
                  })}
                </p>
                <p className="text-lg text-gray-600">
                  {t('about.mission.vision', { 
                    defaultValue: 'Our AI swarm technology identifies, evaluates, and adapts proven global concepts for the Korean market, creating opportunities for entrepreneurs and businesses to succeed with validated ideas.' 
                  })}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  {t('about.mission.stats.title', { defaultValue: 'By the Numbers' })}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t('about.mission.stats.ideas', { defaultValue: 'Ideas Processed' })}</span>
                    <span className="font-bold">1,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('about.mission.stats.countries', { defaultValue: 'Source Countries' })}</span>
                    <span className="font-bold">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('about.mission.stats.automation', { defaultValue: 'Automation Rate' })}</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('about.mission.stats.community', { defaultValue: 'Community Members' })}</span>
                    <span className="font-bold">10,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('about.features.title', { defaultValue: 'What Makes Us Different' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compounding Moat Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t('about.moat.title', { defaultValue: 'Our Compounding Moat' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {moatElements.map((element, index) => {
                const Icon = element.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{element.title}</h3>
                      <p className="text-white/90">{element.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {t('about.team.title', { defaultValue: 'Our Team' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">VC</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('about.team.founder.title', { defaultValue: 'Founder & CEO' })}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('about.team.founder.description', { 
                    defaultValue: 'Experienced venture capitalist with 10+ years in Korean startup ecosystem. Previously led investments in 50+ companies across Asia.' 
                  })}
                </p>
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <span>• {t('about.team.founder.experience', { defaultValue: '10+ Years VC' })}</span>
                  <span>• {t('about.team.founder.investments', { defaultValue: '50+ Investments' })}</span>
                  <span>• {t('about.team.founder.expertise', { defaultValue: 'Asia Focus' })}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AI</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('about.team.ai.title', { defaultValue: 'AI Swarm Team' })}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('about.team.ai.description', { 
                    defaultValue: 'Advanced AI agents working 24/7 to source, evaluate, and adapt global ideas for the Korean market with minimal human intervention.' 
                  })}
                </p>
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <span>• {t('about.team.ai.agents', { defaultValue: '5 AI Agents' })}</span>
                  <span>• {t('about.team.ai.automation', { defaultValue: '95% Automated' })}</span>
                  <span>• {t('about.team.ai.uptime', { defaultValue: '24/7 Operation' })}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('about.cta.title', { defaultValue: 'Join the Future of Innovation' })}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {t('about.cta.description', { 
                defaultValue: 'Be part of the community that\'s transforming global ideas into Korean market success stories.' 
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                {t('about.cta.startTrial', { defaultValue: 'Start Free Trial' })}
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600">
                {t('about.cta.learnMore', { defaultValue: 'Learn More' })}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
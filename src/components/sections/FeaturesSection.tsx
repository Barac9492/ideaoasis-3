'use client';

import { motion } from 'framer-motion';
import { Brain, Globe, Zap, Shield, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Swarm Technology',
    description: 'Autonomous agents collaborate to source, score, and adapt ideas with 95% automation rate.',
    color: 'primary',
  },
  {
    icon: Globe,
    title: 'Global Idea Discovery',
    description: 'Scan 50+ countries for innovative business concepts, excluding Korea to avoid redundancy.',
    color: 'secondary',
  },
  {
    icon: Zap,
    title: 'Korean Market Adaptation',
    description: 'AI generates "Korean Twist" modifications with KakaoTalk, Naver, and local payment integrations.',
    color: 'accent',
  },
  {
    icon: Shield,
    title: 'Hands-Off Operation',
    description: '90-95% automated workflows with minimal human oversight. Only review flagged outliers.',
    color: 'success',
  },
  {
    icon: Users,
    title: 'Community & Network Effects',
    description: 'Swarm-moderated forum with user contributions, adaptations, and success stories.',
    color: 'warning',
  },
  {
    icon: TrendingUp,
    title: 'Compounding Moat',
    description: 'Proprietary data, network effects, and brand momentum create defensible advantages.',
    color: 'error',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powered by AI Swarm Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our autonomous agent system handles the entire workflow from idea discovery to Korean market adaptation, 
            requiring minimal human intervention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
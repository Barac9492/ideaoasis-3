'use client';

import { motion } from 'framer-motion';
import { Search, Brain, CheckCircle, Users } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Global Discovery',
    description: 'AI agents scan global platforms (Crunchbase, X, Product Hunt) for innovative ideas, excluding Korea.',
    color: 'primary',
  },
  {
    icon: Brain,
    title: 'AI Scoring & Adaptation',
    description: 'Evaluate Korea feasibility (1-10) and generate "Korean Twist" modifications with local integrations.',
    color: 'secondary',
  },
  {
    icon: CheckCircle,
    title: 'Auto-Approval',
    description: 'High-confidence ideas (>90%) are auto-approved. Low-confidence ideas are flagged for human review.',
    color: 'success',
  },
  {
    icon: Users,
    title: 'Community & Growth',
    description: 'Users interact, contribute adaptations, and build network effects that strengthen our moat.',
    color: 'accent',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How the Swarm Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI swarm autonomously handles the entire process from idea discovery to Korean market adaptation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className={`w-16 h-16 rounded-full bg-${step.color}-100 flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform translate-x-4" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
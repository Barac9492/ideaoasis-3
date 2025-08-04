'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Discover Your Next Big Idea?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of Korean entrepreneurs who are using AI swarm technology to discover and adapt global business ideas. 
            Start your free trial today and see the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn btn-lg px-8 py-4 text-lg font-semibold bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn btn-lg px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
          
          <p className="text-primary-200 mt-6 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
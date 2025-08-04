'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: '김민수',
    role: 'Founder, TechStart Korea',
    content: 'Ideaoasis helped us discover a game-changing idea from the US market. The Korean adaptation suggestions were spot-on and saved us months of research.',
    rating: 5,
    avatar: '/avatars/1.jpg',
  },
  {
    name: 'Sarah Johnson',
    role: 'VC Partner, Seoul Ventures',
    content: 'The AI swarm technology is impressive. We use Ideaoasis to scout for portfolio companies and the quality of insights is consistently high.',
    rating: 5,
    avatar: '/avatars/2.jpg',
  },
  {
    name: '박지영',
    role: 'Product Manager, Samsung',
    content: 'Our innovation team uses Ideaoasis weekly. The hands-off operation means we get curated ideas without the overhead of manual research.',
    rating: 5,
    avatar: '/avatars/3.jpg',
  },
];

export function TestimonialsSection() {
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
            Trusted by Korean Entrepreneurs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Ideaoasis is helping founders, VCs, and enterprises discover and adapt global ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-gray-300 mb-4" />
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
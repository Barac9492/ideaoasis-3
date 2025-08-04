import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Ideaoasis.co.kr - Global Ideas, Korean Market',
  description: 'Discover and adapt innovative business ideas from global markets for the Korean market. Powered by AI swarm technology.',
  keywords: 'business ideas, Korean market, startup, innovation, AI, entrepreneurship',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
} 
'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

// Fallback Korean content
const fallbackKoreanContent = {
  hero: {
    title: "글로벌 아이디어, 한국 시장",
    subtitle: "전 세계에서 검증된 비즈니스 아이디어를 한국의 독특한 시장 환경에 맞게 전문적으로 적응시켜 발견하세요",
    ctaPrimary: "탐색 시작하기",
    ctaSecondary: "작동 방식 알아보기"
  },
  features: {
    title: "아이디어오아시스를 선택하는 이유",
    subtitle: "지능형 시장 적응을 위한 AI 스웜 기술로 구동"
  },
  pricing: {
    title: "플랜 선택",
    subtitle: "무료로 시작하고 성장에 따라 확장"
  }
};

interface HomePageClientProps {
  locale: string;
}

export default function HomePageClient({ locale }: HomePageClientProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [translationsFailed, setTranslationsFailed] = useState(false);

  console.log('🏠 HomePageClient - received locale:', locale);

  let t;
  try {
    t = useTranslations();
    console.log('📝 Translations loaded:', t ? Object.keys(t).length : 'Failed');
    console.log('🇰🇷 Hero title:', t ? t('hero.title') : 'Translation failed');
  } catch (error) {
    console.error('❌ Translation hook failed:', error);
    setTranslationsFailed(true);
    t = null;
  }

  useEffect(() => {
    console.log('🏠 HomePageClient component mounted');
    console.log('🌐 Current locale detected:', locale);
    console.log('📝 Hero title:', t ? t('hero.title') : 'Translation failed');
    setIsHydrated(true);
  }, [t, locale]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('🚨 Global error caught:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            페이지 로딩 중 오류가 발생했습니다
          </h2>
          <p className="text-gray-600 mb-4">
            페이지를 새로고침해 주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">페이지 로딩 중...</p>
          <p className="mt-2 text-sm text-gray-500">Hydration in progress...</p>
        </div>
      </div>
    );
  }

  // If translations failed, show fallback Korean content
  if (translationsFailed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {fallbackKoreanContent.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {fallbackKoreanContent.hero.subtitle}
            </p>
            <div className="space-y-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                {fallbackKoreanContent.hero.ctaPrimary}
              </button>
              <div className="text-sm text-gray-500">
                <p>번역 로딩 실패 - 기본 콘텐츠 표시</p>
                <p>Translation failed - showing fallback content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
} 
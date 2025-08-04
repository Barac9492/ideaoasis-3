import AboutPageClient from './AboutPageClient';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function AboutPage() {
  return <AboutPageClient />;
} 
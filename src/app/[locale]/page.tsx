import HomePageClient from './HomePageClient';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function HomePage() {
  return <HomePageClient />;
} 
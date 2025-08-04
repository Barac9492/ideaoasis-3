import HomePageClient from './HomePageClient';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function HomePage() {
  return <HomePageClient />;
} 
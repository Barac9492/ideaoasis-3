import HomePageClient from './HomePageClient';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  console.log('🏠 HomePage server component - locale:', resolvedParams.locale);
  return <HomePageClient locale={resolvedParams.locale} />;
} 
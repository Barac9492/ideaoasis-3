import HomePageClient from './HomePageClient';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function HomePage({ params }: { params: { locale: string } }) {
  console.log('🏠 HomePage server component - locale:', params.locale);
  return <HomePageClient locale={params.locale} />;
} 
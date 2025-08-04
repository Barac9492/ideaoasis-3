import KoreanFallbackPage from './page-fallback';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function HomePage() {
  return <KoreanFallbackPage />;
} 
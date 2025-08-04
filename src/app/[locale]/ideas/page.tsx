import { useTranslations } from 'next-intl';
import IdeasBrowser from '@/components/IdeasBrowser';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function IdeasPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('ideas.title', { defaultValue: 'Discover Global Ideas' })}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('ideas.subtitle', { defaultValue: 'Explore proven business concepts from around the world, adapted for the Korean market' })}
          </p>
        </div>

        {/* Ideas Browser Component */}
        <IdeasBrowser t={t} />
      </div>
    </div>
  );
} 
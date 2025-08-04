import { useTranslations } from 'next-intl';
import DashboardContent from '@/components/DashboardContent';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.title', { defaultValue: 'Dashboard' })}
          </h1>
          <p className="text-gray-600">
            {t('dashboard.subtitle', { defaultValue: 'Manage your saved ideas and track your progress' })}
          </p>
        </div>

        {/* Dashboard Content */}
        <DashboardContent t={t} />
      </div>
    </div>
  );
} 
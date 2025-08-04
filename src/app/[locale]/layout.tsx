import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log('🔍 Layout loading for locale:', locale);
  
  let messages;
  try {
    messages = await getMessages();
    console.log('📦 Messages loaded:', Object.keys(messages).length, 'keys');
    console.log('🇰🇷 Korean messages available:', 'hero' in messages);
  } catch (error) {
    console.error('❌ Failed to load messages:', error);
    messages = {};
  }
  
  return (
    <html lang={locale}>
      <body>
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">로딩 중...</p>
                        <p className="mt-2 text-sm text-gray-500">Loading...</p>
                      </div>
                    </div>
                  }>
                    {children}
                  </Suspense>
                </main>
                <Footer />
              </div>
            </Providers>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
} 
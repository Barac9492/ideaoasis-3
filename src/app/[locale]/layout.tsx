import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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
  
  const messages = await getMessages();
  console.log('📦 Messages loaded:', Object.keys(messages).length, 'keys');
  console.log('🇰🇷 Korean messages available:', 'hero' in messages);
  
  return (
    <html lang={locale}>
      <body>
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  {children}
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
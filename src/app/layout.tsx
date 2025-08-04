import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ideaoasis.co.kr - Global Ideas, Korean Market',
  description: 'Discover and adapt innovative business ideas from global markets for the Korean market. Powered by AI swarm technology.',
  keywords: 'business ideas, Korean market, startup, innovation, AI, entrepreneurship',
  authors: [{ name: 'Ideaoasis Team' }],
  creator: 'Ideaoasis',
  publisher: 'Ideaoasis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ideaoasis.co.kr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ideaoasis.co.kr - Global Ideas, Korean Market',
    description: 'Discover and adapt innovative business ideas from global markets for the Korean market.',
    url: 'https://ideaoasis.co.kr',
    siteName: 'Ideaoasis',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ideaoasis - Global Ideas, Korean Market',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideaoasis.co.kr - Global Ideas, Korean Market',
    description: 'Discover and adapt innovative business ideas from global markets for the Korean market.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 
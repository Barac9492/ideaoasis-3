import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Pre-load messages for server-side compatibility
const loadMessages = async (locale: string) => {
  try {
    const messages = await import(`../messages/${locale}.json`);
    console.log(`📦 Loaded messages for ${locale}:`, Object.keys(messages.default).length, 'keys');
    return messages.default;
  } catch (error) {
    console.error(`❌ Failed to load messages for ${locale}:`, error);
    // Fallback to English messages
    try {
      const fallbackMessages = await import(`../messages/en.json`);
      console.log(`🔄 Using fallback messages for ${locale}`);
      return fallbackMessages.default;
    } catch (fallbackError) {
      console.error(`❌ Failed to load fallback messages:`, fallbackError);
      return {};
    }
  }
};

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ko', 'en'],

  // Used when no locale matches
  defaultLocale: 'ko',

  // Always show the locale in the URL
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ko|en)/:path*']
}; 
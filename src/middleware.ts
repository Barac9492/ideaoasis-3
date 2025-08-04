import createMiddleware from 'next-intl/middleware';

// Pre-load messages for serverless compatibility
const messages = {
  ko: require('../messages/ko.json'),
  en: require('../messages/en.json')
};

console.log('🔧 Middleware loading - Available messages:', Object.keys(messages));

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
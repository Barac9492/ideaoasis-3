import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['ko', 'en'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    console.log(`📦 Loaded messages for ${locale}:`, Object.keys(messages).length, 'keys');
    return {
      locale: locale!,
      messages
    };
  } catch (error) {
    console.error(`❌ Failed to load messages for ${locale}:`, error);
    // Return empty messages object as fallback
    return {
      locale: locale!,
      messages: {}
    };
  }
}); 
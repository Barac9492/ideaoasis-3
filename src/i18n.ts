import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['ko', 'en'];

export default getRequestConfig(async ({locale}) => {
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
    
    // Try fallback to English
    try {
      const fallbackMessages = (await import(`../messages/en.json`)).default;
      console.log(`🔄 Using fallback messages for ${locale}`);
      return {
        locale: locale!,
        messages: fallbackMessages
      };
    } catch (fallbackError) {
      console.error(`❌ Failed to load fallback messages:`, fallbackError);
      // Return empty messages object as final fallback
      return {
        locale: locale!,
        messages: {}
      };
    }
  }
}); 
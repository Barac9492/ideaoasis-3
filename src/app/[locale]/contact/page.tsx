import ContactPageClient from './ContactPageClient';

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default function ContactPage() {
  return <ContactPageClient />;
} 
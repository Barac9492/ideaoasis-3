'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Debug logs for troubleshooting
    console.log('🔍 Root page loaded');
    console.log('🌐 Browser language:', navigator.language);
    
    // Detect user's preferred language
    const userLanguage = navigator.language.startsWith('ko') ? 'ko' : 'en';
    console.log('🎯 Detected language:', userLanguage);
    console.log('🔄 Redirecting to:', `/${userLanguage}`);
    
    router.push(`/${userLanguage}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
        <p className="mt-2 text-sm text-gray-500">Detecting language...</p>
      </div>
    </div>
  );
} 
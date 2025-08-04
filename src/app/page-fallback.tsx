'use client';

import { useRouter } from 'next/navigation';

export default function RootPageFallback() {
  const router = useRouter();

  const handleLanguageSelect = (locale: string) => {
    console.log('🎯 Manual language selection:', locale);
    router.push(`/${locale}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ideaoasis</h1>
          <p className="text-lg text-gray-600">Global Ideas, Korean Market</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLanguageSelect('ko')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            한국어로 시작하기
          </button>
          
          <button
            onClick={() => handleLanguageSelect('en')}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Start in English
          </button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          Choose your preferred language to continue
        </p>
      </div>
    </div>
  );
} 
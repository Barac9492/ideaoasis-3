'use client';

export default function KoreanFallbackPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            글로벌 아이디어, 한국 시장
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            전 세계에서 검증된 비즈니스 아이디어를 한국의 독특한 시장 환경에 맞게 전문적으로 적응시켜 발견하세요
          </p>
          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              탐색 시작하기
            </button>
            <div className="text-sm text-gray-500">
              <p>이 페이지는 기본 한국어 콘텐츠입니다.</p>
              <p>Console: {typeof window !== 'undefined' ? 'Client-side' : 'Server-side'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
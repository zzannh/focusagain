interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-sm text-gray-600">AI 기반 행동 인식 집중 보조 시스템</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-medium text-gray-900">집중해YOU</h1>
          </div>

          {/* Main Message */}
          <h2 className="text-4xl text-gray-800 mb-4">
            AI 파트너와 함께 효율적인 공부를 하세요.
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            노트북 공부를 더 즐겁게, 원활하게.
          </p>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            지금 시작하기
          </button>
        </div>

        {/* Hero Image */}
        <div className="mt-20 rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1598870783724-2ecf2e0653b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdmlkZW8lMjBjYWxsJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzY3OTUzOTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="화상통화 예시"
            className="w-full h-auto"
          />
        </div>
      </main>
    </div>
  );
}
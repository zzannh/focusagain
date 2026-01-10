import { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('password');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      {/* Logo and Title */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl text-gray-900">집중해YOU</h1>
        </div>
        <p className="text-lg text-gray-600">학습 보조 시스템</p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <h2 className="text-3xl text-center mb-8 text-gray-900">
          {step === 'email' ? '로그인' : '비밀번호 입력'}
        </h2>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 또는 전화번호"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              다음
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-blue-600 text-sm hover:underline"
            >
              ← 이메일로 돌아가기
            </button>
          </form>
        )}

        {/* Alternative Login Options */}
        {step === 'email' && (
          <div className="mt-8">
            <div className="text-center text-gray-500 mb-6">또는 다음으로 로그인</div>
            <div className="flex justify-center gap-6">
              <button className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors">
                <span className="text-2xl">🔑</span>
              </button>
              <button className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors">
                <span className="text-2xl">🍎</span>
              </button>
              <button className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors">
                <span className="text-2xl">G</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
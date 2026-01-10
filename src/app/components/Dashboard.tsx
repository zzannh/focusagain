import { useState } from 'react';
import { VideoCallTab } from './VideoCallTab';
import { PlannerTab } from './PlannerTab';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'video' | 'planner'>('video');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl text-gray-900">집중해YOU</span>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'video'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              화상통화
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'planner'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              계획 설정
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === 'video' ? <VideoCallTab /> : <PlannerTab />}
      </main>
    </div>
  );
}

import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

type Screen = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  return (
    <div className="size-full">
      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentScreen('login')} />
      )}
      {currentScreen === 'login' && (
        <LoginPage onLogin={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'dashboard' && <Dashboard />}
    </div>
  );
}

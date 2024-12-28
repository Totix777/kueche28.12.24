import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { TasksByFrequency } from './components/TasksByFrequency';
import { CoolerTemperatures } from './components/coolers/CoolerTemperatures';
import { FoodTemperatures } from './components/food/FoodTemperatures';
import { Orders } from './components/orders/Orders';
import { HACCPDashboard } from './features/haccp/components/HACCPDashboard';
import { UserManual } from './features/manual/components/UserManual';
import { LoginForm } from './components/LoginForm';
import { ThemeProvider } from './contexts/ThemeContext';
import { initializeAreasIfNeeded } from './lib/tasks/initialization';
import { areas as initialAreas } from './data/cleaningTasks';
import { login } from './lib/auth';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username);
    initializeAreasIfNeeded(initialAreas).catch(console.error);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    await login(username, password);
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Home />;
      case 'tasks':
        return <TasksByFrequency />;
      case 'coolers':
        return <CoolerTemperatures />;
      case 'food':
        return <FoodTemperatures />;
      case 'orders':
        return <Orders />;
      case 'haccp':
        return <HACCPDashboard />;
      case 'manual':
        return <UserManual />;
      default:
        return <Home />;
    }
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <LoginForm onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navigation
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
        />
        <main className="container mx-auto px-4 py-6">
          {renderContent()}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
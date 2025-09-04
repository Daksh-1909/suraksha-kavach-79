import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ModulesPage from './components/ModulesPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import AIChat from './components/AIChat';
import EvacuationMap from './components/EvacuationMap';
import SOSPage from './components/SOSPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

const SurakshaKavach = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState('login'); // 'login', 'register', 'forgot-password'
  const [currentPage, setCurrentPage] = useState('home');
  const [profile, setProfile] = useState({
    name: 'Arjun Sharma',
    email: 'arjun.sharma@school.edu',
    school: 'Delhi Public School'
  });

  // Load saved state on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('suraksha_auth');
    const savedProfile = localStorage.getItem('suraksha_profile');
    const savedPage = localStorage.getItem('suraksha_current_page');
    
    if (savedAuth === 'true' && savedProfile) {
      setIsAuthenticated(true);
      setProfile(JSON.parse(savedProfile));
      if (savedPage) {
        setCurrentPage(savedPage);
      }
    }
  }, []);

  // Save state whenever authentication or profile changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('suraksha_auth', 'true');
      localStorage.setItem('suraksha_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('suraksha_auth');
      localStorage.removeItem('suraksha_profile');
      localStorage.removeItem('suraksha_current_page');
    }
  }, [isAuthenticated, profile]);

  // Save current page
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('suraksha_current_page', currentPage);
    }
  }, [currentPage, isAuthenticated]);


  const handleLogin = (credentials) => {
    // Simulate login - in real app, this would validate with backend
    setProfile({
      name: 'Arjun Sharma',
      email: credentials.email,
      school: 'Delhi Public School'
    });
    setIsAuthenticated(true);
  };

  const handleRegister = (userData) => {
    // Simulate registration - in real app, this would create account in backend
    setProfile({
      name: userData.name,
      email: userData.email,
      school: userData.school
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    localStorage.removeItem('suraksha_auth');
    localStorage.removeItem('suraksha_profile');
    localStorage.removeItem('suraksha_current_page');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': 
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'dashboard': 
        return <Dashboard />;
      case 'modules': 
        return <ModulesPage />;
      case 'profile':
        return <ProfilePage profile={profile} setProfile={setProfile} />;
      case 'settings':
        return <SettingsPage />;
      case 'ai-chat': 
        return <AIChat />;
      case 'evacuation-map': 
        return <EvacuationMap />;
      case 'sos': 
        return <SOSPage />;
      default: 
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  // Show authentication pages if not logged in
  if (!isAuthenticated) {
    switch (authPage) {
      case 'register':
        return <RegisterPage onRegister={handleRegister} onGoToLogin={() => setAuthPage('login')} />;
      case 'forgot-password':
        return <ForgotPasswordPage onGoToLogin={() => setAuthPage('login')} />;
      default:
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onGoToRegister={() => setAuthPage('register')}
            onGoToForgotPassword={() => setAuthPage('forgot-password')}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        profile={profile}
        onLogout={handleLogout}
        setCurrentPage={setCurrentPage}
      />
      
      <div className="flex h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)]">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 lg:ml-0">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default SurakshaKavach;
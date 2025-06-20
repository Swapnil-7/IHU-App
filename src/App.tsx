import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import NetworkSettings from './components/NetworkSettings';
import DeviceStatus from './components/DeviceStatus';
import LoginScreen from './components/LoginScreen';
import GeneralSettings from './components/GeneralSettings';
import ServerSettings from './components/ServerSettings';
import DeviceConfiguration from './components/DeviceConfiguration';
import SerialCommand from './components/Serialcommand';

function App() {
  // Initialize isAuthenticated from localStorage, default to false if not found
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  // Initialize activeSection from localStorage, default to 'cmd' if not found
  const [activeSection, setActiveSection] = useState(() => {
    const storedActiveSection = localStorage.getItem('activeSection');
    return storedActiveSection || 'cmd'; // Default to 'cmd' if nothing is stored
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use useEffect to update localStorage whenever isAuthenticated changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Use useEffect to update localStorage whenever activeSection changes
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  // Function to handle login, which also updates localStorage
  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    // When logging in, set the active section from storage or default to 'cmd'
    if (status) {
      const storedActiveSection = localStorage.getItem('activeSection');
      setActiveSection(storedActiveSection || 'cmd'); 
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear authentication from local storage
    localStorage.removeItem('activeSection'); // Clear active section from local storage
    setActiveSection('cmd'); // Reset to default view after logout
  };

  // If not authenticated, always show the LoginScreen
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'cmd':
        return <SerialCommand />;
      case 'status':
        return <DeviceStatus />;
      case 'general':
        return <GeneralSettings />;
      case 'network':
        return <NetworkSettings />;
      case 'server':
        return <ServerSettings />;
      case 'dev':
        return <DeviceConfiguration />;
      case 'admin':
        return <AdminDashboard />;
      default:
        // Fallback to 'cmd' or a default if activeSection somehow gets a bad value
        // Also update the state so localStorage is consistent
        setActiveSection('cmd'); 
        return <SerialCommand />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={setSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src="/src/assets/images/logo.png" alt="Logo" className="h-6 object-contain mix-blend-darken mb-2" />
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-hidden">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default App;
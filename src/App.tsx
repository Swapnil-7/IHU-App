import React, { useState, useEffect } from 'react'; // Import useEffect
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import NetworkSettings from './components/NetworkSettings';
import DeviceStatus from './components/DeviceStatus';
import LoginScreen from './components/LoginScreen';

function App() {
  // Initialize isAuthenticated from localStorage, default to false if not found
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [activeSection, setActiveSection] = useState('status');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use useEffect to update localStorage whenever isAuthenticated changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Function to handle login, which also updates localStorage
  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    // You might also want to set the initial active section after login
    if (status) {
      setActiveSection('status');
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear authentication from local storage
    // Optionally, reset activeSection or redirect to login (already handled by !isAuthenticated)
    setActiveSection('status'); // Reset to default view
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'status':
        return <DeviceStatus />;
      case 'network':
        return <NetworkSettings />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <DeviceStatus />;
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
            <h1 className="text-lg font-semibold text-gray-900">NetworkPro</h1>
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
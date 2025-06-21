import React from 'react';
import { Activity, Network, Shield, LogOut, X, Settings2Icon, ServerIcon, Cpu, Home } from 'lucide-react'; // Removed unused imports

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onLogout: () => void; // New prop for logout function
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, isOpen, onToggle, onLogout }) => {
  const navItems = [
     { id: 'cmd', label: 'Home', icon: Home, description: 'Device Command' },
     { id: 'status', label: 'Device Status', icon: Activity, description: 'Hardware & system info' },
     { id: 'general', label: 'General', icon: Settings2Icon, description: 'General Configuraion' },
     { id: 'network', label: 'Network Settings', icon: Network, description: 'WiFi & connection config' },
     { id: 'server', label: 'Server Settings', icon: ServerIcon, description: 'Server Configuraion' },
      { id: 'dev', label: 'Device Configuration', icon: Cpu, description: 'Device Configuraion Values' },
     { id: 'admin', label: 'Administration', icon: Shield, description: 'System control & monitoring' },
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onToggle(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-80 bg-white shadow-xl border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-around p-4 border-b border-gray-200">
            {/* <div className="flex items-center ">
              <div>
               
                <img src="/src/assets/images/logo.png" alt="Logo" className="h-6 object-contain mix-blend-darken mb-2" />
                <p className="text-xs text-gray-500 pl-8">Device Management</p>
              </div>
            </div> */}

            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 ">
                <img src="/src/assets/images/FountLab_Logo1.png" alt="Logo" className="h-8 object-contain mix-blend-darken " />
              </div>
              <div>
                <h1 className="text-2xl font-semibold font-mono text-gray-900">FountLab</h1>
                <p className="text-xs text-gray-500">Device Management</p>
              </div>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={() => onToggle(false)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`w-full flex items-center p-2 rounded-xl font-medium transition-all duration-200 group ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className={`flex items-center justify-center w-7 h-7 rounded-lg mr-4 transition-colors duration-200 ${
                  activeSection === id
                    ? 'bg-white bg-opacity-20'
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <Icon className={`h-3 w-3 ${
                    activeSection === id ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{label}</div>
                  <div className={`text-xs ${
                    activeSection === id ? 'text-white text-opacity-80' : 'text-gray-500'
                  }`}>
                    {description}
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {/* Status indicator */}
          {/* <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-green-800">System Online</p>
                  <p className="text-xs text-green-600">All services running</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Footer - Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout} 
              className="w-full flex items-center p-3 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 group"
            >
              <LogOut className="h-5 w-5 mr-3 group-hover:text-red-600" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import React from 'react';
import {  Network, Activity, Shield, Settings2Icon, ServerIcon, Cpu, Home } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
     { id: 'cmd', label: 'Home', icon: Home },
     { id: 'status', label: 'Device Status', icon: Activity },
     { id: 'general', label: 'General', icon: Settings2Icon },
     { id: 'network', label: 'Network Settings', icon: Network },
     { id: 'server', label: 'Server Settings', icon: ServerIcon },
     { id: 'dev', label: 'Device Configuration', icon:Cpu },
     { id: 'admin', label: 'Administration', icon: Shield },
   
    
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src="/src/assets/images/FntLb_Logo.png" alt="Logo" className="h-6 object-contain mix-blend-darken mb-2" />
          </div>
          
          
          <div className="flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === id
                    ? 'bg-teal-100 text-teal-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
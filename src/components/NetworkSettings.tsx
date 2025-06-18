import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Wifi, Globe, Save, RefreshCw, Router, Signal } from 'lucide-react';

const NetworkSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    networkSSID: 'FountLab',
    password: '********',
    dhcp: true,
    staticIP: '192.168.0.1',
    gatewayIP: '192.168.0.1',
    subnetMask: '255.255.255.0',
    primaryDNS: '8.8.8.8',
    secondaryDNS: '8.8.4.4',
    autoAPN: true,
    sim1APN: 'ASD',
    connectionType: 'wifi'
  });

  const [activeTab, setActiveTab] = useState<'wifi' | 'network'>('network'); // New state for active tab

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // In a real application, you'd send these settings to a backend or apply them
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Network Settings</h1>
            <p className="text-gray-600">Configure your network connection and preferences</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 text-lg font-medium ${
              activeTab === 'wifi'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-200 focus:outline-none`}
            onClick={() => setActiveTab('wifi')}
          >
            <div className="flex items-center">
              <Wifi className="h-5 w-5 mr-2" />
              WiFi Configuration
            </div>
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium ${
              activeTab === 'network'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-200 focus:outline-none`}
            onClick={() => setActiveTab('network')}
          >
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              4G Configuration
            </div>
          </button>
        </div>

        {/* Conditional Rendering based on activeTab */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {activeTab === 'wifi' && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg mr-3">
                  <Wifi className="h-6 w-6 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">WiFi Configuration</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Network SSID</label>
                    <input
                      type="text"
                      value={settings.networkSSID}
                      onChange={(e) => handleInputChange('networkSSID', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={settings.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* DHCP Label and Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DHCP</label>
                    <label htmlFor="dhcp-toggle" className="relative inline-flex items-center cursor-pointer p-2 bg-gray-50 rounded-lg"> {/* Added padding and background for visual consistency */}
                      <input
                        type="checkbox"
                        id="dhcp-toggle"
                        className="sr-only peer"
                        checked={settings.dhcp}
                        onChange={(e) => handleInputChange('dhcp', e.target.checked)}
                      />
                      <div
                        className={`w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.9 after:left-[2.5px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
                          settings.dhcp ? 'peer-checked:bg-teal-600' : ''
                        }`}
                      ></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subnet Mask</label>
                    <input
                      type="text"
                      value={settings.subnetMask}
                      onChange={(e) => handleInputChange('subnetMask', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      disabled={settings.dhcp}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Static IP</label>
                    <input
                      type="text"
                      value={settings.staticIP}
                      onChange={(e) => handleInputChange('staticIP', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      disabled={settings.dhcp}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gateway IP</label>
                    <input
                      type="text"
                      value={settings.gatewayIP}
                      onChange={(e) => handleInputChange('gatewayIP', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      disabled={settings.dhcp}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary DNS</label>
                    <input
                      type="text"
                      value={settings.primaryDNS}
                      onChange={(e) => handleInputChange('primaryDNS', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      disabled={settings.dhcp}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary DNS</label>
                    <input
                      type="text"
                      value={settings.secondaryDNS}
                      onChange={(e) => handleInputChange('secondaryDNS', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      disabled={settings.dhcp}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Network Configuration</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto APN</label>
                  <select
                    value={settings.autoAPN ? 'Auto' : 'Manual'}
                    onChange={(e) => handleInputChange('autoAPN', e.target.value === 'Auto')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Auto">Auto</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sim1 APN</label>
                  <input
                    type="text"
                    value={settings.sim1APN}
                    onChange={(e) => handleInputChange('sim1APN', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
          <button
            onClick={handleSave}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkSettings;
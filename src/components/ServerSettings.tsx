import React, { useEffect, useState } from "react";
import { ServerConfig } from "../types/device";
import deviceService from '../services/deviceService';
import { Save, Server, HardDrive, Link, Key } from "lucide-react"; // NEW: Import additional icons
import toast, { Toaster } from 'react-hot-toast';

const ServerSettings: React.FC = () => {
  const [serverData, setServerData] = useState<ServerConfig>({
    serverIP: '',
    port: 0,
    serverURL: '',
    token: ''
  });

  const [loading, setLoading] = useState<boolean>(true);

  const handleInputChange = <T extends keyof ServerConfig>(
    field: T,
    value: ServerConfig[T]
  ) => {
    setServerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log('Attempting to save settings:', serverData);
    setLoading(true);

    const dataToSend = { ...serverData };

    try {
      const response = await deviceService.setServerSettings(dataToSend);
      if (response && response.sts === true) {
        toast.success('Server settings saved successfully!');
        console.log('Server settings saved successfully!');
      } else {
        const errorMessage = response?.message || 'Failed to save settings: API returned an error.';
        toast.error(errorMessage);
        console.error('Failed to save Server settings:', errorMessage);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to save Server settings:", err);
      const errorMessage = err.message || "An unknown error occurred while saving.";
      toast.error(`Failed to save settings: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchServerSettings = async () => {
      try {
        const data = await deviceService.getServerSettings();
        setServerData(data);
        toast.success('Server settings loaded successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch Server setting:", err);
        const errorMessage = err.message || "An unknown error occurred while fetching.";
        toast.error(`Failed to load settings: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchServerSettings();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 relative">
      
      {loading && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <img src="/src/assets/images/FountLab_Logo1.png" alt="Loading..." className=" logo-loader object-contain mix-blend-darken " />
        </div>
      )}

       <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 1000,
            style: {
              background: '#22C55E', // Tailwind green-500
              color: '#fff',
            },
          },
          error: {
            duration: 1000,
            style: {
              background: '#EF4444', // Tailwind red-500
              color: '#fff',
            },
          },
        }}
      />

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100 overflow-y-auto max-h-[calc(100vh-5rem)] custom-scrollbar">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Server Settings</h1>
            <p className="text-gray-600">Configure Device Server Settings</p>
          </div>
        </div>

        {/* Server Configuration Fields */}
        <div className="space-y-6 opacity-100 transition-opacity duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Server IP */}
            <div>
              <label htmlFor="serverIP" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Server className="h-5 w-5 mr-2 text-gray-500" /> Server IP
              </label>
              <input
                id="serverIP"
                type="text"
                value={serverData.serverIP}
                onChange={(e) => handleInputChange('serverIP', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>
            {/* Port */}
            <div>
              <label htmlFor="port" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <HardDrive className="h-5 w-5 mr-2 text-gray-500" /> Port
              </label>
              <input
                id="port"
                type="number"
                value={serverData.port}
                onChange={(e) => handleInputChange('port', e.target.valueAsNumber)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Server URL */}
            <div>
              <label htmlFor="serverURL" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Link className="h-5 w-5 mr-2 text-gray-500" /> Server URL
              </label>
              <input
                id="serverURL"
                type="text"
                value={serverData.serverURL}
                onChange={(e) => handleInputChange('serverURL', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>
            {/* Token */}
            <div>
              <label htmlFor="token" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Key className="h-5 w-5 mr-2 text-gray-500" /> Token
              </label>
              <input
                id="token"
                type="text"
                value={serverData.token}
                onChange={(e) => handleInputChange('token', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <Save className="h-5 w-5 mr-2" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerSettings;
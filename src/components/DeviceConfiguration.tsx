import React, { useEffect, useState } from "react";
import { DevConfig } from "../types/device";
import deviceService from '../services/deviceService';
import { Save, Clock, Cpu, Repeat } from "lucide-react"; // NEW: Import additional icons
import toast, { Toaster } from 'react-hot-toast';

const DeviceConfiguration: React.FC = () => {
  const [devData, setDevData] = useState<DevConfig>({
    urate: 0,
    modaddr: 0,
    stinterval: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const handleInputChange = <T extends keyof DevConfig>(
    field: T,
    value: DevConfig[T]
  ) => {
    setDevData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log('Device configuration:', devData);
    setLoading(true);

    const dataToSend = { ...devData };

    try {
      const response = await deviceService.setDeviceConfig(dataToSend);
      if (response && response.sts === true) {
        toast.success('Device configuration saved successfully!');
        console.log('Device configuration saved successfully!');
      } else {
        const errorMessage = response?.message || 'Failed to save configuration: API returned an error.';
        toast.error(errorMessage);
        console.error('Failed to save Device configuration:', errorMessage);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to save Device configuration:", err);
      const errorMessage = err.message || "An unknown error occurred while saving.";
      toast.error(`Failed to save configuration: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchDeviceConfig = async () => {
      try {
        const data = await deviceService.getDeviceConfig();
        setDevData(data);
        toast.success('Device configuration loaded successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch Device Configuration:", err);
        const errorMessage = err.message || "An unknown error occurred while fetching.";
        toast.error(`Failed to load configuration: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchDeviceConfig();
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

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Device Configuration</h1>
            <p className="text-gray-600">Configure Device Settings</p>
          </div>
        </div>

        {/* Device Configuration Fields */}
        <div className="space-y-6 opacity-100 transition-opacity duration-300 overflow-y-auto max-h-[calc(100vh-5rem)] custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Update Rate */}
            <div>
              <label htmlFor="urate" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-5 w-5 mr-2 text-gray-500" /> Update Rate
              </label>
              <input
                id="urate"
                type='number'
                value={devData.urate}
                onChange={(e) => handleInputChange('urate', e.target.valueAsNumber)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>
            {/* Mod Address */}
            <div>
              <label htmlFor="modaddr" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Cpu className="h-5 w-5 mr-2 text-gray-500" /> Mod Address
              </label>
              <input
                id="modaddr"
                type="number"
                value={devData.modaddr}
                onChange={(e) => handleInputChange('modaddr', e.target.valueAsNumber)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sync Interval */}
            <div>
              <label htmlFor="stinterval" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Repeat className="h-5 w-5 mr-2 text-gray-500" /> Log Interval
              </label>
              <input
                id="stinterval"
                type="number"
                value={devData.stinterval}
                onChange={(e) => handleInputChange('stinterval', e.target.valueAsNumber)}
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

export default DeviceConfiguration;
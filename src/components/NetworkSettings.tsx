
import React, { useEffect, useState } from "react";
import { Wifi, Save, Globe } from "lucide-react";
import { NetworkConfig } from "../types/device"; // Ensure this import is correct
import deviceService from "../services/deviceService";

const NetworkSettings: React.FC = () => {
  // Initial state should align with what the API sends, or safe defaults
  const [settings, setSettings] = useState<NetworkConfig>({
    conn: 0, // Default to WiFi
    ssid: '',
    password: '',
    dhcp: 0, // Initialize as number
    staticIP: '',
    gatewayIP: '',
    subnetMask: '',
    pdns: '', // Use pdns
    sdns: '', // Use sdns
    autoApn: 0, // Initialize as number
    sim1Apn: '', // Use sim1Apn
    
  });

  // activeTab state for UI display
  
  const [activeTab, setActiveTab] = useState<"wifi" | "4g">(
    settings.conn === 0 ? "wifi" : "4g"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync activeTab with conn in settings
  useEffect(() => {
    setSettings(prevSettings => ({
      ...prevSettings,
      conn: activeTab === 'wifi' ? 0 : 1, // Convert 'wifi'/'4g' to 0/1
    }));
  }, [activeTab]);


  // Generic input handler. Types are now NetworkConfig's types (e.g., number for dhcp/autoApn)
  const handleInputChange = <T extends keyof NetworkConfig>(
    field: T,
    value: NetworkConfig[T]
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log('Attempting to save settings:', settings);
    setLoading(true);

    try {
      await deviceService.setConn(settings); // Send settings directly
      alert('Network settings saved successfully!');
      console.log('Network settings saved successfully!');
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to save Network settings:", err);
      setError(err.message || "An unknown error occurred while saving.");
      alert(`Failed to save settings: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     setLoading(true);
     setTimeout(() => {
      
     
    const fetchNetworkSettings = async () => {
      setLoading(true);
      try {
        setError(null);
        const data = await deviceService.getConn();
        setSettings(data); // Set the fetched data directly (now matches NetworkConfig)
        setActiveTab(data.conn === 0 ? 'wifi' : '4g');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch Network settings:", err);
        setError(err.message || "An unknown error occurred while fetching.");
      } finally {
        setLoading(false);
      }
    };
    fetchNetworkSettings();
    }, 2000);
  }, []);

  return (
    <div className="space-y-6 relative">
       {loading && (
                <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <img src="/src/assets/images/FountLab_Logo.png" alt="Loading..." className=" logo-loader  object-contain mix-blend-darken " />
                </div>
            )}

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Network Settings
            </h1>
            <p className="text-gray-600">
              Configure your network connection and preferences
            </p>
          </div>
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 text-lg font-medium ${
              activeTab === "wifi"
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-500 hover:text-gray-700"
            } transition-colors duration-200 focus:outline-none`}
            onClick={() => setActiveTab("wifi")}
            disabled={loading}
          >
            <div className="flex items-center whitespace-nowrap">
              <Wifi className="h-5 w-5 mr-2" />
              WiFi Configuration
            </div>
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium ${
              activeTab === "4g"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } transition-colors duration-200 focus:outline-none`}
            onClick={() => setActiveTab("4g")}
            disabled={loading}
          >
            <div className="flex items-center whitespace-nowrap">
              <Globe className="h-5 w-5 mr-2" />
              4G Configuration
            </div>
          </button>
        </div>

        {/* WiFi Configuration */}
        {activeTab === "wifi" && (
          <div className="space-y-6 opacity-100 transition-opacity duration-300">
            {/* Note: wifiEnabled is not in your API's current getConn response.
                If you need a toggle for it, your API must provide this state.
                For now, I'm removing the UI element for it to match the API.
                If the API does handle enabling/disabling WiFi, you'll need to
                add that field to your API response and NetworkConfig.
            */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ssid" className="block text-sm font-medium text-gray-700 mb-2">
                  Network SSID
                </label>
                <input
                  id="ssid"
                  type="text"
                  value={settings.ssid}
                  onChange={(e) => handleInputChange("ssid", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={settings.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dhcp-toggle" className="block text-sm font-medium text-gray-700 mb-2">
                  DHCP
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="dhcp-toggle"
                    checked={settings.dhcp === 1} // Convert 0/1 to boolean for UI
                    onChange={(e) => handleInputChange("dhcp", e.target.checked ? 1 : 0)} // Convert boolean to 0/1 for state
                    className="sr-only peer"
                    disabled={loading}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:left-1 after:top-0.5 after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {settings.dhcp === 1 ? 'On' : 'Off'}
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="subnetMask" className="block text-sm font-medium text-gray-700 mb-2">
                  Subnet Mask
                </label>
                <input
                  id="subnetMask"
                  type="text"
                  value={settings.subnetMask}
                  onChange={(e) => handleInputChange("subnetMask", e.target.value)}
                  disabled={settings.dhcp === 1 || loading} // Disable if DHCP is on (1)
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="staticIP" className="block text-sm font-medium text-gray-700 mb-2">
                  Static IP
                </label>
                <input
                  id="staticIP"
                  type="text"
                  value={settings.staticIP}
                  onChange={(e) => handleInputChange("staticIP", e.target.value)}
                  disabled={settings.dhcp === 1 || loading}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label htmlFor="gatewayIP" className="block text-sm font-medium text-gray-700 mb-2">
                  Gateway IP
                </label>
                <input
                  id="gatewayIP"
                  type="text"
                  value={settings.gatewayIP}
                  onChange={(e) => handleInputChange("gatewayIP", e.target.value)}
                  disabled={settings.dhcp === 1 || loading}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pdns" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary DNS
                </label>
                <input
                  id="pdns" // Use pdns
                  type="text"
                  value={settings.pdns} // Use pdns
                  onChange={(e) => handleInputChange("pdns", e.target.value)} // Use pdns
                  disabled={settings.dhcp === 1 || loading}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label htmlFor="sdns" className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary DNS
                </label>
                <input
                  id="sdns" // Use sdns
                  type="text"
                  value={settings.sdns} // Use sdns
                  onChange={(e) => handleInputChange("sdns", e.target.value)} // Use sdns
                  disabled={settings.dhcp === 1 || loading}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4G Configuration */}
        {activeTab === "4g" && (
          <div className="space-y-6 opacity-100 transition-opacity duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="autoApn-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Auto APN
                </label>
                <select
                  id="autoApn-select" // Use autoApn
                  value={settings.autoApn === 1 ? "Auto" : "Manual"} // Convert 0/1 to string for select
                  onChange={(e) => handleInputChange("autoApn", e.target.value === "Auto" ? 1 : 0)} // Convert string to 0/1 for state
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  disabled={loading}
                >
                  <option value="Auto">Auto</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label htmlFor="sim1Apn" className="block text-sm font-medium text-gray-700 mb-2">
                  Sim1 APN
                </label>
                <input
                  id="sim1Apn" // Use sim1Apn
                  type="text"
                  value={settings.sim1Apn} // Use sim1Apn
                  onChange={(e) => handleInputChange("sim1Apn", e.target.value)} // Use sim1Apn
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  disabled={loading || settings.autoApn === 1} // Disable if Auto APN is enabled (1)
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
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

export default NetworkSettings;
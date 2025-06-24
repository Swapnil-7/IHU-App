import React, { useEffect, useState } from "react";
// Corrected imports: Removed unused and fixed 'Dns'
import { Wifi, Save, Globe, Lock, Server, Network, CheckCircle2 } from "lucide-react";
import { NetworkConfig } from "../types/device";
import deviceService from "../services/deviceService";
import toast, { Toaster } from 'react-hot-toast';

const NetworkSettings: React.FC = () => {
  const [settings, setSettings] = useState<NetworkConfig>({
    conn: 0, // Default to WiFi (0 for WiFi, 1 for 4G)
    ssid: '',
    password: '',
    dhcp: 0, // Initialize as number (0 for off, 1 for on)
    staticIP: '',
    gatewayIP: '',
    subnetMask: '',
    pdns: '',
    sdns: '',
    autoApn: 0, // Initialize as number (0 for manual, 1 for auto)
    sim1Apn: '',
  });

  const [activeTab, setActiveTab] = useState<"wifi" | "4g">(
    settings.conn === 0 ? "wifi" : "4g"
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Sync activeTab with conn in settings
  useEffect(() => {
    setSettings(prevSettings => ({
      ...prevSettings,
      conn: activeTab === 'wifi' ? 0 : 1, // Convert 'wifi'/'4g' to 0/1 for the API
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
      const response = await deviceService.setConn(settings);
      if (response && response.sts === true) {
        toast.success('Network settings saved successfully!');
        console.log('Network settings saved successfully!');
      } else {
        const errorMessage = response?.message || 'Failed to save settings: API returned an error.';
        toast.error(errorMessage);
        console.error('Failed to save Network settings:', errorMessage);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to save Network settings:", err);
      const errorMessage = err.message || "An unknown error occurred while saving.";
      toast.error(`Failed to save settings: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchNetworkSettings = async () => {
      try {
        const data = await deviceService.getConn();
        setSettings(data);
        setActiveTab(data.conn === 0 ? 'wifi' : '4g');
        toast.success('Network settings loaded successfully!');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch Network settings:", err);
        const errorMessage = err.message || "An unknown error occurred while fetching.";
        toast.error(`Failed to load settings: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchNetworkSettings();
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
              background: '#22C55E',
              color: '#fff',
            },
          },
          error: {
            duration: 1000,
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }}
      />

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100 overflow-y-auto max-h-[calc(100vh-5rem)] custom-scrollbar">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Network SSID */}
              <div>
                <label htmlFor="ssid" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Wifi className="h-5 w-5 mr-2 text-gray-500" /> Network SSID
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
              {/* Password */}
              <div>
                <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Lock className="h-5 w-5 mr-2 text-gray-500" /> Password
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
              {/* DHCP Toggle */}
              <div>
                <label htmlFor="dhcp-toggle" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Network className="h-5 w-5 mr-2 text-gray-500" /> DHCP
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="dhcp-toggle"
                    checked={settings.dhcp === 1}
                    onChange={(e) => handleInputChange("dhcp", e.target.checked ? 1 : 0)}
                    className="sr-only peer"
                    disabled={loading}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:left-1 after:top-0.5 after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {settings.dhcp === 1 ? 'On' : 'Off'}
                  </span>
                </label>
              </div>
              {/* Subnet Mask */}
              <div>
                <label htmlFor="subnetMask" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Network className="h-5 w-5 mr-2 text-gray-500" /> Subnet Mask
                </label>
                <input
                  id="subnetMask"
                  type="text"
                  value={settings.subnetMask}
                  onChange={(e) => handleInputChange("subnetMask", e.target.value)}
                  disabled={settings.dhcp === 1 || loading}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Static IP */}
              <div>
                <label htmlFor="staticIP" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Server className="h-5 w-5 mr-2 text-gray-500" /> Static IP
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
              {/* Gateway IP */}
              <div>
                <label htmlFor="gatewayIP" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Network className="h-5 w-5 mr-2 text-gray-500" /> Gateway IP
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
              {/* Primary DNS */}
              <div>
                {/* Using 'Server' for DNS, as 'Dns' is not directly exported */}
                <label htmlFor="pdns" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Server className="h-5 w-5 mr-2 text-gray-500" /> Primary DNS
                </label>
                <input
                  id="pdns"
                  type="text"
                  value={settings.pdns}
                  onChange={(e) => handleInputChange("pdns", e.target.value)}
                  disabled={settings.dhcp === 1 || loading}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              {/* Secondary DNS */}
              <div>
                {/* Using 'Server' for DNS, as 'Dns' is not directly exported */}
                <label htmlFor="sdns" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Server className="h-5 w-5 mr-2 text-gray-500" /> Secondary DNS
                </label>
                <input
                  id="sdns"
                  type="text"
                  value={settings.sdns}
                  onChange={(e) => handleInputChange("sdns", e.target.value)}
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
              {/* Auto APN Select */}
              <div>
                <label htmlFor="autoApn-select" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-gray-500" /> Auto APN
                </label>
                <select
                  id="autoApn-select"
                  value={settings.autoApn === 1 ? "Auto" : "Manual"}
                  onChange={(e) => handleInputChange("autoApn", e.target.value === "Auto" ? 1 : 0)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  disabled={loading}
                >
                  <option value="Auto">Auto</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              {/* Sim1 APN */}
              <div>
                <label htmlFor="sim1Apn" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Globe className="h-5 w-5 mr-2 text-gray-500" /> Sim1 APN
                </label>
                <input
                  id="sim1Apn"
                  type="text"
                  value={settings.sim1Apn}
                  onChange={(e) => handleInputChange("sim1Apn", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  disabled={loading || settings.autoApn === 1}
                />
              </div>
            </div>
          </div>
        )}

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

export default NetworkSettings;
import React, { useState, useEffect } from 'react';
import {
  Cpu, HardDrive, Wifi, Calendar, MapPin, Hash, Settings, Activity,
  Building2,
} from 'lucide-react';
import deviceService from '../services/deviceService';
import { DeviceStatusData } from '../types/device';
import toast, { Toaster } from 'react-hot-toast'; // <--- Import toast and Toaster

const DeviceStatus: React.FC = () => {
  const [deviceData, setDeviceData] = useState<DeviceStatusData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null); // <--- Removed this state

  useEffect(() => {
    setLoading(true);
    // Removed the outer setTimeout. The inner async logic can directly use the useEffect cleanup for unmounting.
    const fetchDeviceStatus = async () => {
      try {
        // setError(null); // <--- No longer needed
        const data = await deviceService.getStatus();
        setDeviceData(data);
        if (data) { // Check if data was actually received
          toast.success('Device status fetched successfully!'); // <--- Success toast
        } else {
          toast.error('No device status data received.'); // <--- Error if no data
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch device status:", err);
        const errorMessage = err.message || "An unknown error occurred while fetching device status.";
        toast.error(`Error: ${errorMessage}`); // <--- Error toast
        // setError(errorMessage); // <--- No longer needed for display, toast handles it
      } finally {
        setLoading(false);
      }
    };

    // Add a slight delay for the loader to be visible, if desired, otherwise call directly
    const delay = setTimeout(() => {
      fetchDeviceStatus();
    }, 2000); // 2-second delay for loader

    // Cleanup function for useEffect to clear the timeout if component unmounts
    return () => clearTimeout(delay);
  }, []);

  const deviceInfo = [
    { label: 'Manufacturer', value: deviceData?.Manufacturer, icon: Building2 },
    { label: 'Device', value: deviceData?.Device, icon: Cpu },
    { label: 'Device ID', value: deviceData?.DeviceID, icon: Hash },
    { label: 'IMEI', value: deviceData?.IMEI, icon: Hash },
    { label: 'WiFi MAC', value: deviceData?.WiFiMac, icon: Wifi },
    { label: 'SDK Version', value: deviceData?.SDKVersion, icon: HardDrive },
    { label: 'Firmware Name', value: deviceData?.FirmwareName, icon: Settings },
    { label: 'Firmware Version', value: deviceData?.FirmwareVersion, icon: HardDrive },
    { label: 'Firmware Build Date', value: deviceData?.FirmwareBuildDate, icon: Calendar },
    { label: 'Network', value: deviceData?.Network, icon: Wifi },
    { label: 'WiFi IP', value: deviceData?.WiFiIP, icon: MapPin },
  ];

  // <--- Removed the conditional render for 'error' state, toasts handle it ---
  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center h-48 text-red-600">
  //       <p>Error fetching device status: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6 relative">
      {/* Toaster component - essential for displaying toasts */}
      

      {loading && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <img src="/src/assets/images/FountLab_Logo1.png" alt="Loading..." className="logo-loader object-contain mix-blend-darken" />
        </div>
      )}

      <Toaster
        position="top-center" // You can adjust the position as needed
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 1000,
            style: {
              background: '#22C55E', // Green-500
              color: '#fff',
            },
          },
          error: {
            duration: 1000,
            style: {
              background: '#EF4444', // Red-500
              color: '#fff',
            },
          },
        }}
      />

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100 overflow-y-auto max-h-[calc(100vh-5rem)] custom-scrollbar">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
          <div className="mb-6 border-b border-gray-200 pb-2">
            <h1 className="text-2xl lg:text-2xl font-bold text-gray-900 mb-2">Device Status</h1>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-3">
            <Activity className="h-6 w-6 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Device Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {deviceInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                  <info.icon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1">{info.label}</p>
                {loading ? (
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                ) : (
                  <p className="text-base lg:text-lg font-semibold text-gray-900 truncate">
                    {info.value || '-'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;